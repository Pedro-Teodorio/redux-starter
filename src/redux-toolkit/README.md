# Redux Toolkit

Nesta seção, aprendemos a melhor e mais moderna maneira de escrever código redux usando redux-toolkit.

Redux-toolkit é uma biblioteca muito popular e poderosa para simplificar o código redux e é oficialmente recomendada pelo Redux.

Redux-toolkit tem vários métodos configureStore, createAction, createReducer e createSlice.

## 1. configureStore

O método configureStore é usado para criar um armazenamento redux e irá configurar automaticamente redux-devTools com ele. Portanto, não precisamos usar a função devtoolsEnhancer.

### Exemplo:

```js
import { configureStore } from "@reduxjs/toolkit";
import reducer from "../../redux-default/store/task";

const store = configureStore({
  reducer: reducer,
});

export default store;
```

## 2. createAction

Então vemos o método createAction, que é usado para criar um objeto de ação com propriedade de carga útil

### Exemplo:

```js
import { createAction } from "@reduxjs/toolkit";

export const addTask = createAction("ADD_TASK");
export const removeTask = createAction("REMOVE_TASK");
export const completedTask = createAction("TASK_COMPLETED");
```

## 3. createReducer

Então vemos a função createReducer, que é usada para criar a função reducer sem escrever switch case ou If..else.

### Exemplo:

```js
import { createAction } from "@reduxjs/toolkit";

export const addTask = createAction("ADD_TASK");
export const removeTask = createAction("REMOVE_TASK");
export const completedTask = createAction("TASK_COMPLETED");

export default createReducer([], {
  [addTask.type]: (state, action) => {
    state.push({
      id: ++id,
      task: action.payload.task,
      completed: false,
    });
  },
  [removeTask.type]: (state, action) => {
    const index = state.findIndex((task) => task.id === action.payload.id);
    state.splice(index, 1);
  },
  [completedTask.type]: (state, action) => {
    const index = state.findIndex((task) => task.id === action.payload.id);
    state[index].completed = true;
  },
});
```

# Middleware

Middleware é uma função que é executada após nossa ação ser despachada e antes de atingir o redutor.

Middleware às vezes é muito útil se quisermos fazer algo após a ação ser despachada, como:

- Registrar as ações

- Mostrar os erros

- Chamar uma API

### Exemplo:

```js
const log = (store) => (next) => (action) => {
  console.log(action);
  next(action);
};

export default log;
```

Depois de criar o middleware, temos que adicionar esse middleware na função configureStore.

```js
const store = configureStore({
  reducer: {
    task: tasksReducer,
    employee: employeeReducer,
  },
  middleware: (gDM) => gDM().concat(logger, erro),
});

export default store;
```
