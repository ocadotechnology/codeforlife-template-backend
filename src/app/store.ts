import {
  configureStore,
  ThunkDispatch,
  ThunkAction,
  Action,
  AnyAction
} from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import counterReducer from 'features/counter/counterSlice';
import jokeListReducer from 'features/jokeList/jokeListSlice';
import jokeListApi from 'features/jokeList/jokeListAPI';

const store = configureStore({
  reducer: {
    counter: counterReducer,
    jokeList: jokeListReducer,
    [jokeListApi.reducerPath]: jokeListApi.reducer
  },
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware(),
    jokeListApi.middleware
  ]
});

setupListeners(store.dispatch);

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = ThunkDispatch<RootState, any, AnyAction>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
