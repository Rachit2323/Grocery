import { configureStore } from '@reduxjs/toolkit';

import grocery from './Reducers/grocery.js';

const store = configureStore({
  reducer: {
    grocery:grocery

  },
});

export default store;