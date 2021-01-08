import { configureStore } from '@reduxjs/toolkit';
// import counterReducer from '../features/counter/counterSlice';
import userReducer from '../features/user/userSlice';


// here configureStore is configuring store for us
export default configureStore({
  // and we are passing it a reducer
  // and which as a layer called counter that has a reducer counterReducer
  // you can have many layer
  // and each layer and has a reducer
  // such layer are called Slice of the Store
  // you can have many layer here and all of them are independent to each other
  reducer: {
    // counter: counterReducer,
    user: userReducer,
  },
});
