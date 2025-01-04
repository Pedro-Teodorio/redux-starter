import axios from "axios";
import store from "./redux-toolkit/store/config_store";
import {
  addNewTask,
  getTasks,
  loadTask,
  updateTask,
  deleteTask,
} from "./redux-toolkit/store/tasks";
import { apiCallBegan } from "./redux-toolkit/store/api";

// const gettingTasks = async () => {
//   try {
//     const response = await axios.get("http://localhost:5000/api/tasks");
//     store.dispatch(getTask({ tasks: response.data }));
//   } catch (error) {
//     store.dispatch({ type: "SHOW_ERROR", payload: { erro: error.message } });
//   }
// };
// gettingTasks();
// store.dispatch(addNewTask({task: "New Task"}))
store.dispatch(loadTask());
// store.dispatch(updateTask({ id: 7, completed: true }));
// store.dispatch(deleteTask({ id: 7 }));
