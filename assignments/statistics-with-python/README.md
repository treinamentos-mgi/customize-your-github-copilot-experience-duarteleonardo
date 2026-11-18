# 📘 Atividade: Statistics with Python

## 🎯 Objetivo

Compare média e mediana para entender como um valor extremo afeta medidas de centro e represente a distribuição de notas em um histograma. A atividade foi planejada para iniciantes e pode ser concluída em até 30 minutos.

## 📝 Tarefas

### 🛠️ Compare a média e a mediana

#### Descrição

Use as notas do arquivo `data.csv` e as funções `mean` e `median` do módulo `statistics` para calcular as duas medidas. Observe o valor extremo presente nos dados.

#### Requisitos
O programa concluído deve:

- Ler as notas do arquivo `data.csv` usando o módulo `csv` da biblioteca padrão.
- Calcular e exibir a média e a mediana das notas.
- Explicar em um comentário no código por que a mediana é menos afetada pelo valor extremo.

### 🛠️ Visualize a distribuição das notas

#### Descrição

Instale o Matplotlib com `python -m pip install matplotlib` e crie um histograma para visualizar como as notas se distribuem, incluindo o efeito do valor extremo.

#### Requisitos
O programa concluído deve:

- Criar um histograma com as notas carregadas do arquivo `data.csv`.
- Adicionar um título e rótulos aos eixos para identificar a distribuição e a frequência.
- Exibir o gráfico e identificar qual intervalo contém o valor extremo.