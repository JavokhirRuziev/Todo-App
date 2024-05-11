import { createSlice } from "@reduxjs/toolkit";

const todosSlice = createSlice({
  name: "todos",
  initialState: {
    todos: [],
  },
  reducers: {
    create(state, action) {
      state.todos.push({ ...action.payload, id: Date.now() });
    },
    edit(state, action) {
      state.todos = state.todos.map((todo) => {
        return todo.id === action.payload.id ? action.payload : todo;
      });
    },
    complete(state, action) {
      state.todos = state.todos.map((todo) => {
        if (todo.id === action.payload.id) {
          return { ...todo, completed: !todo.completed };
        } else {
          return todo;
        }
      });
    },
    remove(state, action) {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload.id);
    },
  },
});

export const { create, edit, remove, complete } = todosSlice.actions;
export const todos = todosSlice.reducer;
