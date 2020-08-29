import { combineReducers } from 'redux';
// eslint-disable-next-line import/no-cycle
import csvReducer from './upload-csv/importcsvSlice';

export default function createRootReducer() {
  return combineReducers({
    csv: csvReducer,
  });
}
