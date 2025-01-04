import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "./api";

let id = 0;
const initialState = {
  tasks: [],
  loading: false,
  error: null,
};

// export const fetchTask = createAsyncThunk(
//   "fetchTask",
//   async (a, { rejectWithValue }) => {
//     try {
//       const response = await axios.get("/tasks");
//       return { tasks: response.data };
//     } catch (error) {
//       return rejectWithValue({ error: error.message });
//     }
//   }
// );

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    apiRequested: (state, action) => {
      state.loading = true;
    },
    apiRequestFailed: (state, action) => {
      state.loading = false;
    },
    getTasks: (state, action) => {
      state.tasks = action.payload;
      state.loading = false;
    },
    addTask: (state, action) => {
      state.tasks.push(action.payload);
      state.loading = false;
    },
    removeTask: (state, action) => {
      const index = state.tasks.findIndex(
        (task) => task.id === action.payload.id
      );
      state.tasks.splice(index, 1);
      state.loading = false;
    },
    completedTask: (state, action) => {
      const index = state.tasks.findIndex(
        (task) => task.id === action.payload.id
      );
      state.tasks[index].completed = action.payload.completed;
      state.loading = false;
    },
  },
  // extraReducers: (builder) => {
  //   builder.addCase(fetchTask.pending, (state, action) => {
  //     state.loading = true;
  //   });

  //   builder.addCase(fetchTask.fulfilled, (state, action) => {
  //     state.tasks = action.payload.tasks;
  //     state.loading = false;
  //   });

  //   builder.addCase(fetchTask.rejected, (state, action) => {
  //     state.error = action.payload.error;
  //     state.loading = false;
  //   });
  // },
});

export const {
  apiRequested,
  apiRequestFailed,
  getTasks,
  addTask,
  removeTask,
  completedTask,
} = taskSlice.actions;

export default taskSlice.reducer;

const url = "/tasks";
export const loadTask = () =>
  apiCallBegan({
    url,
    onStart: apiRequested.type,
    onSuccess: getTasks.type,
    onError: apiRequestFailed.type,
  });

export const addNewTask = (task) =>
  apiCallBegan({
    url,
    method: "POST",
    data: task,
    onStart: apiRequested.type,
    onSuccess: addTask.type,
    onError: apiRequestFailed.type,
  });

export const updateTask = (task) =>
  apiCallBegan({
    url: `${url}/${task.id}`,
    method: "PATCH",
    data: task,
    onStart: apiRequested.type,
    onSuccess: completedTask.type,
    onError: apiRequestFailed.type,
  });

export const deleteTask = (task) =>
  apiCallBegan({
    url: `${url}/${task.id}`,
    method: "DELETE",
    onStart: apiRequested.type,
    onSuccess: removeTask.type,
    onError: apiRequestFailed.type,
  });
