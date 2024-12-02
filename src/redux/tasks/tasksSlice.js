import { createSlice } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid';

const initialState = {
  value: [],
}

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    isTaskCompleted: (state, obj) => {
      let index = state.value.findIndex((item) => {
        return item.id === obj.payload.id;
      });
      state.value[index] = obj.payload;
    },

    edit: (state, obj) => {
      let index = state.value.findIndex((item) => {
        return item.id === obj.payload.id;
      });

      state.value[index] = obj.payload;
    },

    taskDelete: (state, id) => {
      let newList = state.value.filter((item) => {
        if(item.id === id.payload){
          return false;
        }
        else{
          return true;
        }
      });

      state.value = [...newList];
    },

    add: (state, payload) => {
      state.value = [...state.value, {id : uuidv4(), title : payload.payload.title, desc : payload.payload.desc, dueDate : payload.payload.dueDate, isCompleted : false}]
    },
  },
})

// Action creators are generated for each case reducer function
export const { edit, taskDelete, add, isTaskCompleted } = tasksSlice.actions

export default tasksSlice.reducer