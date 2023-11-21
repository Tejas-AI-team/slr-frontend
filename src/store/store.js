import { configureStore } from '@reduxjs/toolkit';
import thunkMiddleware from 'redux-thunk';
import questionAbstractReducer from '../slices/questionAbstractSlice';
import rowReducer from '../slices/rowSlice';
import projectReducer from '../slices/projectSlice';
import dataExtractionReducer from '../slices/dataExtractionSlice';
import userManagementReducer from '../slices/userManagementSlice';

const store = configureStore({
  reducer: {
    questionAbstractData: questionAbstractReducer,
    rows: rowReducer,
    project: projectReducer,
    dataExtraction: dataExtractionReducer,
    userManagement: userManagementReducer
  },
  middleware: [thunkMiddleware],
});

export default store;
