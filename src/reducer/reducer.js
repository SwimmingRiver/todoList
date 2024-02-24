import { createSlice } from "@reduxjs/toolkit";
const localData = JSON.parse(localStorage.getItem("todolist"));

export const todoSlice = createSlice({
  name: "todos",
  initialState: { todo: [], doing: [], done: [] },
  reducers: {
    ADD_TODO: (state, action) => {
      state.todo.unshift(action.payload);
      const copied = JSON.parse(localStorage.getItem("todolist")) || {
        todo: [],
        doing: [],
        done: [],
      };
      copied.todo.unshift(action.payload);
      localStorage.setItem("todolist", JSON.stringify(copied));
    },
    EDIT_TODO: (state, action) => {
      state.todo.splice(action.payload.index, 1, action.payload.editedTodo);
      const copied = JSON.parse(localStorage.getItem("todolist")) || {
        todo: [],
        doing: [],
        done: [],
      };
      copied.todo.splice(action.payload.index, 1, action.payload.editedTodo);
      localStorage.setItem("todolist", JSON.stringify(copied));
    },
    DELETE_TODO: (state, action) => {
      state.todo.splice(action.payload.index, 1);
      const copied = JSON.parse(localStorage.getItem("todolist")) || {
        todo: [],
        doing: [],
        done: [],
      };
      copied.todo.splice(action.payload.index, 1);
      localStorage.setItem("todolist", JSON.stringify(copied));
    },
    ADD_DOING: (state, action) => {
      state.doing.unshift(state.todo[action.payload]);
      state.todo.splice(action.payload, 1);
      const copied = JSON.parse(localStorage.getItem("todolist")) || {
        todo: [],
        doing: [],
        done: [],
      };
      copied.doing.unshift(copied.todo[action.payload]);
      copied.todo.splice(action.payload, 1);
      localStorage.setItem("todolist", JSON.stringify(copied));
    },
    ADD_DONE: (state, action) => {
      state.done.unshift(state.doing[action.payload]);
      state.doing.splice(action.payload, 1);
      const copied = JSON.parse(localStorage.getItem("todolist")) || {
        todo: [],
        doing: [],
        done: [],
      };
      copied.done.unshift(copied.todo[action.payload]);
      copied.doing.splice(action.payload, 1);
      localStorage.setItem("todolist", JSON.stringify(copied));
    },
  },
});
