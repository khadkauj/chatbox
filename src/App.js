import React, { useEffect } from "react";
import "./App.css";
import Sidebar from "./Sidebar";
import Chatbox from "./Chatbox";
import { BrowserRouter as Router, Switch, Route, Link, HashRouter } from "react-router-dom";
import { logout, selectUser, setUsername } from "./features/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import Login from "./features/user/userLogin";
import db, { auth } from "./firebase";

function App() {
      const user = useSelector(selectUser);
      const dispatch = useDispatch();

      useEffect(() => {
            auth.onAuthStateChanged((authUser) => {
                  if (authUser) {
                        db.collection("rooms").doc(authUser.email).set({
                              personName: authUser.email,
                              timestamp: new Date(),
                              photoURL: authUser.photoURL,
                              uid: authUser.uid
                        }, { merge: true }).then().catch(error => {
                              console.log("Error in setting user, ", error);
                        })

                        dispatch(
                              setUsername({
                                    userdetails: authUser.displayName,
                                    photourl: authUser.photoURL,
                                    email: authUser.email,
                                    uid: authUser.uid,
                              })
                        );
                  } else {
                        dispatch(logout());
                  }
            });
      }, []);

      return (
            <div className="App">
                  {!user ? (
                        <Login />
                  ) : (
                        <div className="app_body">
                              <Router>
                                    <HashRouter>
                                          {/* <Route path='/home'>
                            <h1>Welcome to home page</h1>
                        </Route> */}

                                          <Route path="/rooms/:id">
                                                <Sidebar />
                                                <Chatbox />
                                                {/* the Router below is ver necessary to keep
                        because this is what makes the router keep working
                         when we dont have full address with id */}
                                          </Route>
                                          <Route exact path="/chatbox">
                                                <Sidebar />
                                                <Chatbox />
                                          </Route>
                                          <Route exact path="/">
                                                <Sidebar />
                                                <Chatbox />
                                          </Route>
                                    </HashRouter>
                              </Router>
                        </div>
                  )}
            </div>
      );
}

export default App;
