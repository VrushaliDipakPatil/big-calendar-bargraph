import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedDate: null,
  data: {},
};

const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    setSelectedDate: (state, action) => {
      state.selectedDate = action.payload;
    },
    setData: (state, action) => {
      state.data = action.payload;
    }
  },
});

export const { setSelectedDate, setData } = calendarSlice.actions;
export default calendarSlice.reducer;
