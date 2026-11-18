#!/usr/bin/env node
"use strict";

const fs = require("node:fs");
const path = require("node:path");

const projectRoot = path.resolve(__dirname, "../../../..");
const configPath = path.join(projectRoot, "config.json");
const assignmentsRoot = path.resolve(projectRoot, "assignments");

function saveConfig(config) {
  const temporaryPath = `${configPath}.${process.pid}.tmp`;
  try {
    fs.writeFileSync(temporaryPath, `${JSON.stringify(config, null, 2)}\n`);
    fs.renameSync(temporaryPath, configPath);
  } catch (error) {
    if (fs.existsSync(temporaryPath)) {
      fs.unlinkSync(temporaryPath);
    }
    throw error;
  }
}

function main() {
  const [id, name, filename, type, ...extraArguments] = process.argv.slice(2);

  if (!id || !name || !filename || !type || extraArguments.length > 0) {
    throw new Error(
      'Uso: node .github/skills/new-assignment/scripts/add-attachment.js <id> "<display-name>" <filename> <type>',
    );
  }

  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(id)) {
    throw new Error("O id deve usar kebab-case com letras minúsculas, números e hífens.");
  }
  if (!/^[a-z0-9][a-z0-9-]*$/i.test(type)) {
    throw new Error("O tipo do anexo deve conter somente letras, números e hífens.");
  }
  if (path.basename(filename) !== filename || filename.includes("\\")) {
    throw new Error("Informe somente o nome do arquivo, sem caminhos de diretório.");
  }

  const config = JSON.parse(fs.readFileSync(configPath, "utf8"));
  if (!Array.isArray(config.assignments)) {
    throw new Error("config.json precisa conter um array assignments.");
  }

  const assignment = config.assignments.find((entry) => entry.id === id);
  if (!assignment) {
    const availableIds = config.assignments.map((entry) => entry.id).join(", ");
    throw new Error(
      `Assignment "${id}" not found in config.json. Available IDs: ${availableIds}`,
    );
  }

  const expectedDirectory = path.resolve(assignmentsRoot, id);
  const configuredDirectory = path.resolve(projectRoot, assignment.path);
  if (configuredDirectory !== expectedDirectory) {
    throw new Error(`O caminho configurado para '${id}' deve ser assignments/${id}.`);
  }

  const assignmentDirectory = fs.realpathSync(configuredDirectory);
  const filePath = path.resolve(assignmentDirectory, filename);
  if (!filePath.startsWith(`${assignmentDirectory}${path.sep}`)) {
    throw new Error("O arquivo precisa estar dentro da pasta da assignment.");
  }
  if (!fs.existsSync(filePath)) {
    throw new Error(`File not found: assignments/${id}/${filename}`);
  }
  const realFilePath = fs.realpathSync(filePath);
  if (!realFilePath.startsWith(`${assignmentDirectory}${path.sep}`)) {
    throw new Error("O arquivo precisa estar dentro da pasta da assignment.");
  }
  if (!fs.statSync(realFilePath).isFile()) {
    throw new Error(`O anexo '${filename}' não é um arquivo.`);
  }

  assignment.attachments ??= [];
  if (!Array.isArray(assignment.attachments)) {
    throw new Error(`A lista de anexos da assignment '${id}' não é válida.`);
  }
  if (assignment.attachments.some((attachment) => attachment.file === filename)) {
    console.log(`Skipped: "${filename}" is already attached to "${id}"`);
    return;
  }

  assignment.attachments.push({
    name: name.trim(),
    file: filename,
    type: type.toLowerCase(),
  });
  saveConfig(config);
  console.log(`Added "${name}" (${filename}) to assignment "${id}"`);
}

try {
  main();
} catch (error) {
  console.error(`Erro: ${error.message}`);
  process.exitCode = 1;
}