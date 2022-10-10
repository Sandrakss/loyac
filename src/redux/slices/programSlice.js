import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import programAPI from '../../services/programAPI';

const initialState = {
  programsRequestStatus: 'idle',
  enrollmentsRequestStatus: 'idle',
  programs: [],
  enrollments: [],
};

const getProgramsAsync = createAsyncThunk('program/getPrograms', programAPI.getPrograms);
const getEnrollmentsAsync = createAsyncThunk('program/getEnrollments', programAPI.getEnrollments);

export const programSlice = createSlice({
  name: 'program',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProgramsAsync.pending, (state) => {
        state.programsRequestStatus = 'pending';
      })
      .addCase(getProgramsAsync.rejected, (state) => {
        state.programsRequestStatus = 'rejected';
      })
      .addCase(getProgramsAsync.fulfilled, (state, action) => {
        state.programsRequestStatus = 'fulfilled';
        if (action.payload) {
          state.programs = action.payload;
        }
      })
      .addCase(getEnrollmentsAsync.pending, (state) => {
        state.enrollmentsRequestStatus = 'pending';
      })
      .addCase(getEnrollmentsAsync.rejected, (state) => {
        state.enrollmentsRequestStatus = 'rejected';
      })
      .addCase(getEnrollmentsAsync.fulfilled, (state, action) => {
        state.enrollmentsRequestStatus = 'fulfilled';
        if (action.payload) {
          state.enrollments = action.payload;
        }
      });
  },
});

export { getProgramsAsync, getEnrollmentsAsync };

export default programSlice.reducer;
