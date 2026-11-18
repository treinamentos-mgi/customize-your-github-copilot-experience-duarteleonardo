#!/usr/bin/env node
"use strict";

const fs = require("node:fs");
const path = require("node:path");

const projectRoot = path.resolve(__dirname, "../../../..");
const configPath = path.join(projectRoot, "config.json");

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
  const [id, title, description, ...extraArguments] = process.argv.slice(2);

  if (!id || !title || !description || extraArguments.length > 0) {
    throw new Error(
      'Uso: node .github/skills/new-assignment/scripts/update-config.js <id> "<title>" "<description>"',
    );
  }

  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(id)) {
    throw new Error("O id deve usar kebab-case com letras minúsculas, números e hífens.");
  }

  const assignmentDirectory = path.join(projectRoot, "assignments", id);
  if (!fs.statSync(assignmentDirectory, { throwIfNoEntry: false })?.isDirectory()) {
    throw new Error(`A pasta assignments/${id} não existe.`);
  }
  if (!fs.statSync(path.join(assignmentDirectory, "README.md"), { throwIfNoEntry: false })?.isFile()) {
    throw new Error(`O arquivo assignments/${id}/README.md não existe.`);
  }

  const config = JSON.parse(fs.readFileSync(configPath, "utf8"));
  if (!Array.isArray(config.assignments)) {
    throw new Error("config.json precisa conter um array assignments.");
  }
  if (config.assignments.some((assignment) => assignment.id === id)) {
    throw new Error(`A assignment '${id}' já está registrada em config.json.`);
  }

  config.assignments.push({
    id,
    title: title.trim(),
    description: description.trim(),
    path: `assignments/${id}`,
  });
  saveConfig(config);
  console.log(`Assignment '${id}' registrada em config.json.`);
}

try {
  main();
} catch (error) {
  console.error(`Erro: ${error.message}`);
  process.exitCode = 1;
}