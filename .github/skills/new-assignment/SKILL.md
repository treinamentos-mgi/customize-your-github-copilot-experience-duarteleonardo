---
name: new-assignment
description: "Use ao criar uma nova tarefa de programação para o portal, incluindo README, código inicial e materiais de apoio seguindo os padrões do projeto."
---

# Criar uma nova tarefa

## Quando usar

Use esta skill para planejar ou adicionar uma atividade de programação ao portal educacional.

## Procedimento

1. Leia `templates/assignment-template.md`, `.github/instructions/assignments.instructions.md` e uma ou mais tarefas existentes para seguir a estrutura e o nível de detalhe do projeto.
2. Defina um nome curto para a atividade e use-o como slug da pasta em `assignments/<slug>/`.
3. Crie `assignments/<slug>/README.md` com os títulos do template, sem traduzir ou omitir cabeçalhos:
   - `# 📘 Atividade: [Título da Atividade]`
   - `## 🎯 Objetivo`
   - `## 📝 Tarefas`
   - Para cada tarefa, `### 🛠️ [Título da Tarefa]`, `#### Descrição` e `#### Requisitos`.
4. Escreva objetivos de aprendizagem claros e requisitos concretos, verificáveis e apropriados ao nível dos alunos. Use linguagem simples e encorajadora.
5. Adicione `starter-code.py` quando a atividade precisar de código inicial e `data.csv` quando precisar de um conjunto de dados. Em `assignments/`, use somente `README.md`, `starter-code.py` e `data.csv`.
6. Atualize `config.json` para que a atividade apareça no portal. Inclua título, descrição, caminho, prazo quando aplicável e metadados dos anexos existentes.
7. Confira os caminhos, os nomes dos arquivos e a consistência entre o README, os anexos e `config.json`.

Não inclua seções extras no README nem crie arquivos de solução, a menos que o usuário peça explicitamente.