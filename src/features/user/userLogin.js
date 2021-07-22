import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUsername, logout, selectUser } from "./userSlice";
import "tachyons";
import { Button } from "@material-ui/core";
import "./userLogin.css";
import db, { auth, provider } from "../../firebase";

function Login() {
      const disptach = useDispatch();
      const [name, setname] = useState([""]);

      const LogInFunc = (e) => {
            e.preventDefault();

            auth.signInWithRedirect(provider)
                  .then((result_we_get) => {
                        disptach(
                              setUsername({
                                    userdetails: result_we_get.user.displayName,
                                    photourl: result_we_get.user.photoURL,
                                    email: result_we_get.user.email,
                              })
                        );
                  })
                  .catch((error) => alert(error));
            //    console.log(result_we_get.user.username)
            //{disptach(setUsername({userdetails : result_we_get.user.displayName}))}
            setname("");
      };

      const LogOutFunc = () => {
            disptach(
                  logout({
                        userdetails: null,
                        photourl: null,
                        email: null,
                  })
            );
      };

      // through this now we can also use the value
      // like printing, comparing it
      const user_by_selector = useSelector(selectUser);

      return (
            <div>
                  {/* <h2>React and Redux-Login Page</h2> */}
                  {/* {user_by_selector ? <p> {user_by_selector} is logged in</p>: <p>No one logged in</p> } */}
                  <div className="buttons">
                        {/* <input className="input-reset ba b--black-20 pa2 mb2 db w-100"  value={name} onChange={(e) => setname(e.target.value)} placeholder="Your Name" type="text"  /> */}
                        <Button
                              className="f6 grow no-underline br-pill ph3 pv2 mb2 dib white bg-black"
                              disabled={!name}
                              variant="contained"
                              color="primary"
                              type="submit"
                              onClick={LogInFunc}
                        >
                              LogMeIn
                        </Button>
                        {/* <Button className="f6 grow no-underline br-pill ph3 pv2 mb2 dib white bg-black"   variant="contained" color="secondary" onClick={(e) => LogOutFunc()}>LogMeOut</Button> */}
                  </div>
            </div>
      );
}

export default Login;
