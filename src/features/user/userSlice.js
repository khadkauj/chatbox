import { createSlice } from "@reduxjs/toolkit";

// here counter is a layer
// such layer are called Slice of the Store
// such slices are created using createSlice
export const userSlice = createSlice({
      // and the slice has a name called counter
      name: "user",
      // who has a initial state
      initialState: {
            // and initial value
            username: null,
            photourl: "",
            email: "",
            uid: "",
            chatWithPersonEmail: "",
            chatWithPersonPhotoUrl: ""
      },
      // and here we describe the reducer
      // Reducers are functions that take the current state
      //  and an action as arguments, and return a new state
      // result. In other words, (state, action) => newState.
      // here, increment, decrement and incerementByAmount
      // are reducer functions
      reducers: {
            setUsername: (state, action) => {
                  // The below are defualt comments you get at creation:
                  // Redux Toolkit allows us to write "mutating" logic in reducers. It
                  // doesn't actually mutate the state because it uses the Immer library,
                  // which detects changes to a "draft state" and produces a brand new
                  // immutable state based off those changes
                  state.username = action.payload.userdetails;
                  state.photourl = action.payload.photourl;
                  state.email = action.payload.email;
                  state.uid = action.payload.uid
            },
            logout: (state) => {
                  state.username = null;
                  state.photourl = null;
                  state.email = null;
                  state.uid = null
            },
            userWithWhomToChat: (state, action) => {
                  state.chatWithPersonEmail = action.payload.chatWithPersonEmail
                  state.chatWithPersonPhotoUrl = action.payload.chatWithPersonPhotoUrl
            }
      },
});

// and we basically export this to counterSlice.actions
export const { setUsername, logout, userWithWhomToChat } = userSlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
// export const incrementAsync = amount => dispatch => {
//   setTimeout(() => {
//     dispatch(incrementByAmount(amount));
//   }, 1000);
// };

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectUser = (state) => state.user.username;
export const selectPhotourl = (state) => state.user.photourl;
export const selectEmail = (state) => state.user.email;
export const selectUid = (state) => state.user.uid;
export const selectChatWithPersonEmail = (state) => state.user.chatWithPersonEmail;
export const selectChatWithPersonPhotoUrl = (state) => state.user.chatWithPersonPhotoUrl;



export default userSlice.reducer;
