import { combineReducers } from '@reduxjs/toolkit';
import AuthReducer from './slices/authSlice';
import ProgramReducer from './slices/programSlice';

const rootReducer = combineReducers({
  // Put reducers here
  auth: AuthReducer,
  program: ProgramReducer,
});

export default rootReducer;
