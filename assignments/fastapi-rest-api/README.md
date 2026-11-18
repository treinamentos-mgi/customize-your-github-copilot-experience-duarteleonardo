# 📘 Atividade: Building REST APIs with FastAPI

## 🎯 Objetivo

Construa uma API REST para um catálogo de livros usando FastAPI. Você praticará rotas HTTP, validação de dados com modelos Pydantic e respostas de sucesso e erro.

## 📝 Tarefas

### 🛠️ Implemente uma rota de verificação da API

#### Descrição

Instale as dependências com `python -m pip install fastapi uvicorn` e complete a rota `GET /health` no arquivo `starter-code.py`. Para executar a API, use `python starter-code.py`.

#### Requisitos
O programa concluído deve:

- Iniciar a API em `http://127.0.0.1:8000` sem erros.
- Responder a `GET /health` com status HTTP `200` e o JSON `{"status":"ok"}`.
- Exibir a rota de verificação na documentação interativa disponível em `/docs`.

### 🛠️ Consulte a coleção de livros

#### Descrição

Implemente rotas para consultar todos os livros iniciais e buscar um livro pelo identificador. Use a lista em memória fornecida no código inicial.

#### Requisitos
O programa concluído deve:

- Responder a `GET /books` com a lista de livros em formato JSON.
- Responder a `GET /books/{book_id}` com o livro correspondente ao identificador.
- Retornar status HTTP `404` quando o identificador não corresponder a um livro.

### 🛠️ Adicione livros à coleção

#### Descrição

Implemente `POST /books` usando o modelo `BookCreate` para validar os dados enviados. Cada livro criado deve receber um identificador único e ser adicionado à lista em memória.

#### Requisitos
O programa concluído deve:

- Aceitar um objeto JSON com `title` e `author`.
- Retornar status HTTP `201` e o livro criado, incluindo seu identificador.
- Incluir o novo livro nas respostas subsequentes de `GET /books`.
- Deixar a validação de campos obrigatórios para o FastAPI e o Pydantic.