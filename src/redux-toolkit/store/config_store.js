import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "./tasks";
import employeeReducer from "./employee";
import erro from "./middleware/error";
import api from "./middleware/api";

const store = configureStore({
  reducer: {
    task: tasksReducer,
    employee: employeeReducer,
  },
  middleware: (gDM) => gDM().concat(api, erro),
});

export default store;
