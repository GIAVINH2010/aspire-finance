import { configureStore } from "@reduxjs/toolkit";

import debitReducer from "../screens/DebitCardScreen/reducer";

export const store = configureStore({
  reducer: {
    debit: debitReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
