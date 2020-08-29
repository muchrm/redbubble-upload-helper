import { createSlice } from '@reduxjs/toolkit';

// eslint-disable-next-line import/no-cycle
import { AppThunk, RootState } from '../store';

export interface ImageOption {
  image: string;
  title: string;
  tags: string;
  description: string;
  imageToCpy: string;
}

type CSVState = { rows: ImageOption[] }

const initialState: CSVState = { rows: [] }

const csvSlice = createSlice({
  name: 'csv',
  initialState,
  reducers: {
    setRows: (state, { payload }) => {
      state.rows = payload;
    },
  },
});

export const { setRows } = csvSlice.actions;

export default csvSlice.reducer;

export const selectRows = (state: RootState) => state.csv.rows;
