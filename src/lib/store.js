import { configureStore, createAsyncThunk } from "@reduxjs/toolkit";

import { createSlice } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

export const defaultTask = Array.from({ length: 6 }, (_, i) => ({
  id: `${i + 1}`,
  title: `something${i + 1}`,
  state: "TASK_INBOX",
}));

// state全体
const TaskBoxData = {
  tasks: defaultTask,
  status: "idle",
  error: null,
};

export const fetchTasks = createAsyncThunk("todos/fetchTodos", async () => {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/todos?userId=1"
  );
  const data = await response.json();

  const result = data.map((task) => ({
    id: `${task.id}`,
    title: task.title,
    state: task.complete ? "TASK_ARCHIVED" : "TASK_INBOX",
  }));

  // action.payload
  return result;
});

// 初期値とそれを操作するアクション
export const TasksSlice = createSlice({
  name: "taskBox",
  initialState: TaskBoxData,
  reducers: {
    updateTaskState: (state, action) => {
      const { id, newTaskState } = action.payload;
      state.tasks = state.tasks.map((task) =>
        task.id === id ? { ...task, state: newTaskState } : task
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTasks.pending, (state) => {
      state.status = "loading";
      state.error = null;
      state.tasks = [];
    });
    builder.addCase(fetchTasks.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.error = null;
      state.tasks = action.payload;
    });
    builder.addCase(fetchTasks.rejected, (state) => {
      state.status = "failed";
      state.error = "something went wrong";
      state.tasks = [];
    });
  },
});

export const { updateTaskState } = TasksSlice.actions;

// store
const store = configureStore({
  reducer: {
    taskBox: TasksSlice.reducer,
  },
});

export default store;

// updateTaskState: (state, action) => {
//   const { id, newTaskState } = action.payload;
//   const task = state.tasks.find((task) => task.id === id);
//   if (task) {
//     task.state = newTaskState; // 状態を更新
//   }
// },
