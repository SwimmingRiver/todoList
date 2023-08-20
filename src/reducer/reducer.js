import { createSlice } from "@reduxjs/toolkit";
const initialState = {  
    todo:[],
    doing:[],
    done:[]
};
export const todoSlice = createSlice({
    name:"todos",
    initialState,
    reducers:{
        ADD_TODO : (state,action)=>{
            state.todo.unshift(action.payload);
        },
        EDIT_TODO:(state,action)=>{
            state.todo.splice(action.payload.index,1,action.payload.editedTodo)
        },
        DELETE_TODO:(state,action)=>{
            state.todo.splice(action.payload.index,1);
        },
        ADD_DOING:(state,action)=>{
            state.doing.unshift(state.todo[action.payload.index]);
            state.todo.splice(action.payload.index,1);
        },
        ADD_DONE:(state,action)=>{
            state.done.unshift(state.doing[action.payload.index]);
            state.doing.splice(action.payload.index,1);
        },
    }
})