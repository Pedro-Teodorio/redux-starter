## Aula 01 - Funções Básicas

Vimos como passar uma função por parâmetro e como podemos retorná-la

```Javascript
function greeting() {
  return () => {
    return "Good Morning!";
  };
}

function printMessage(anFunc) {
  console.log(anFunc);
}
```

## Aula 02 - Funções de Ordem Maior

São aquelas funções que recebem uma função como parâmetro,retornam ou ambos

### Exemplo:

```Javascript
let numbers = [1, 2, 3, 4];
numbers.map((number) => number * 10);
```

## Aula 03 - Funções de composição

São aquelas funções que são compostas por mais de uma função assim separando as responsabilidades e deixando mais legível nosso código.

```javascript
const username = "  Pedro   ";

const trim = (name) => name.trim();
const convertToUpper = (name) => name.toUpperCase();
const generateMessage = (name) => `Olá ${name} good morning!`;

const result = generateMessage(convertToUpper(trim(username)));

console.log(result);
```

O grande problema dessas funções são a complexidade e difícil leitura **(direita para esquerda fora da ordem de execução)**.

## Aula 04 - Simplificando código da Aula 03 com pipe e compose

### Exemplo de compose:

O compose simplifica a função de composição criando uma função nova e atribuindo outras funções a ela mas ainda com difícil leitura **(direita para esquerda fora da ordem de execução)**.

```javascript
import { compose } from "lodash/fp";
const username = "  Pedro   ";

const trim = (name) => name.trim();
const convertToUpper = (name) => name.toUpperCase();
const generateMessage = (name) => (message) => `Olá ${name} good morning!`;

const newFunc = compose(generateMessage, convertToUpper, trim);
const result = newFunc(username);
console.log(result);
```

### Exemplo de pipe:

O pipe simplifica a função de composição criando uma função nova e atribuindo outras funções a ela.O pipe diferente do compose tem fácil leitura **(esquerda para direita na ordem de execução)**

```javascript
import { pipe } from "lodash/fp";

const username = "  Pedro   ";

const trim = (name) => name.trim();
const convertToUpper = (name) => name.toUpperCase();
const generateMessage = (name) => `Olá ${name} good morning!`;

const newFunc = pipe(trim, convertToUpper, generateMessage);
const result = newFunc(username);

console.log(result);
```

## Aula 05 - Pontuação

É uma técnica bem popular na programação funcional que consiste em pegar vários parâmetros de uma função e converte-os em um único parâmetro

### Exemplo:

```javascript
import { pipe } from "lodash/fp";

const username = "  Pedro   ";

const trim = (name) => name.trim();
const convertToUpper = (name) => name.toUpperCase();
const generateMessage = (message) => (name) => `Olá ${name} ${message}`;

const newFunc = pipe(trim, convertToUpper, generateMessage("Good morning"));
const result = newFunc(username);

console.log(result);
```

## Aula 06 - função Pura

Função pura é uma função que sempre fornece a mesma saída se fornecermos a mesma entrada.

### Uma função pura não contem:

- Data e horas
- Valores aleatórios
- Estados globais
- Chamadas para o banco de dados

### Exemplo:

```javascript
function addition(a) {
  return a + 2;
}
```

## Aula 07 - Imutabilidade

Imutabilidade basicamente significa que uma fez criada a variável,a string, o objeto ou matriz eles não podem ser alterados.

Se quisermos atualizar esse objeto criamos uma copia dele e ai sim podemos atualizar

### Pontos positivos:

- Aumenta previsibilidade do nosso aplicativo
- Detecção rápida de alterações em objetos mais complexos.

## Aula 08 - Objetos Imutáveis

Existem duas formas atualizar um objeto imutável

### 1. Atribuição de objeto:

```javascript
const employee = { name: "Pedro", age: 22 };

const newEmployee = Object.assign({}, employee, { name: "Lucas José" });

console.log(employee);
console.log(newEmployee);
```

### 2. Spreed operator

```javascript
const employee = {
  name: "Pedro",
  age: 22,
  company: { country: "São Paulo", city: "São Paulo" },
};

const newEmployee = {
  ...employee,
  name: "Heloiza da Silva",
  company: {
    ...employee.company,
    city: "Embu Guaçu",
  },
};

console.log(employee);
console.log(newEmployee);
```

## Aula 09 - Atualizando Objetos Imutáveis com Immer

A Immer é uma biblioteca JavaScript pequena e poderosa que facilita a criação de cópias imutáveis de dados, tornando a manipulação de estados em aplicações JavaScript mais segura e previsível. Ela é especialmente útil em contextos onde a imutabilidade é um princípio fundamental, como em aplicações React, Vue e outras que utilizam fluxos de dados unidirecionais.É usada bastante no Redux.

```javascript
import { produce } from "immer";

const employee = {
  name: "Pedro",
  age: 22,
  company: { country: "São Paulo", city: "São Paulo" },
};

const newEmployee = produce(employee, (draftState) => {
  draftState.name = "Mario";
  draftState.company.city = "Diadema";
});

console.log(employee);
console.log(newEmployee);
```

## Aula 10 - Imutabilidade em Arrays

### Existem 3 operações principais para lidar o array

### 1. Adicionar item

Na forma normal a adição de itens e feita com os métodos `pop`, `push`, `shift` mas com array imutável ela é feita por meio de `spread operator`

### Exemplo:

```javascript
const numbers = [10, 20, 30, 40];

const addNumbersStart = [0, ...numbers]; // Adicionando ao inicio
const addNumbersEnd = [...numbers, 50]; // Adicionando no final

const index = numbers.indexOf(30);
const addNumbersSpecific = [
  ...numbers.slice(0, index),
  50,
  ...numbers.slice(index),
]; // Adicionando em uma posição especifica

console.log(addNumbersStart, "Adicionando ao inicio");
console.log(addNumbersEnd, "Adicionando ao fim ");
console.log(addNumbersSpecific, "Adicionando em uma posição especifica");
```

### 2. Remover item

Para remover-mos item de um array imutável usamos o método `filter`

### Exemplo:

```javascript
const numbers = [10, 20, 30, 40];

const removedNumber = numbers.filter((number) => number !== 30);

console.log(removedNumber);
```

### 3. Editar item

Para atualizar-mos um item em um array imutável usamos o método `map`

### Exemplo:

```javascript
const numbers = [10, 20, 30, 40];

const updatedNumber = numbers.map((number) => (number === 40 ? 80 : number));

console.log(updatedNumber);
```

# Introdução ao Redux

### Passos para implementação do Redux:

### 1. Estrutura da Redux Store:

```js
[
  {
    id: 1,
    task: "Create Design Store",
    completed: false,
  },
];
```

### 2. Listagem das ações **(o que fazer ?)**

#### - ADD_TASK

#### - REMOVE_TASK

#### - TASK_COMPLETED

```js
const addTaskAction = {
  type: "ADD_TASK",
  payload: {
    task: "Essa é uma nova tarefa",
  },
};

const removeTaskAction = {
  type: "REMOVE_TASK",
  payload: {
    id: 1,
  },
};
```

### 3. Criar a função reducer **(como fazer ?)**

```js
let id = 0;

function reducer(state = [], action) {
  switch (action.type) {
    case "ADD_TASK":
      return [
        ...state,
        {
          id: ++id,
          task: action.payload.task,
          completed: false,
        },
      ];
    case "REMOVE_TASK":
      state.filter((task) => task.id !== action.payload.id);

    default:
      return state;
  }
}
```

### 4. Criar a Redux Store

```js
import { legacy_createStore as createStore } from "redux";
import reducer from "./reducer";

const store = createStore(reducer);

export default store;
```

## Usando dispatch para executar as actions da store

```js
import store from "./store";
import { addTask, removeTask } from "./actions";

store.dispatch(addTask("Task 1"));
console.log(store.getState());

store.dispatch(removeTask(1));
console.log(store.getState());
```

## Criando ActionTypes

São tipos criados para centralizar os nomes das actions

```js
export const ADD_TASK = "ADD_TASK";
export const REMOVE_TASK = "REMOVE_TASK";
```

### Entendendo o função subscribe e unsubscribe

Ela é uma função de monitoramento sempre que algo é atualizado ela é ativada

```js
import store from "./store";
import { addTask, removeTask } from "./actions";

const unsubscribe = store.subscribe(() => {
  console.log("Updated", store.getState());
});
store.dispatch(addTask("Task 1"));
console.log(store.getState());
unsubscribe();

store.dispatch(removeTask(1));
console.log(store.getState());
```

## Introdução ao Redux Thunk

Em termos de programação, thunk é "um pedaço de código que atrasa".
Em vez de executar a lógica agora, podemos escrever código que poderá ser usado para realizar o trabalho posteriormente.

- Por exemplo buscar dados de uma API depois armazenados no Redux
