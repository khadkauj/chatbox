import React, { useEffect, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userWithWhomToChat } from "./features/user/userSlice"

import "./Sidebarchat.css";
function Sidebarchat({ id, name, photoURL, uidConcatenation, email }) {

      const dispatch = useDispatch()


      const sendEmailDispacth = () => {
            console.log("photo,dis, ", photoURL);
            dispatch(
                  userWithWhomToChat({
                        chatWithPersonEmail: email,
                        chatWithPersonPhotoUrl: photoURL
                  })
            )
      }




      return (
            <div onClick={sendEmailDispacth}>
                  <Link to={`/rooms/${uidConcatenation}`}>
                        <div className="start_chat">
                              <div className="Avatar">
                                    <Avatar
                                          className="avatarHover"
                                          src={photoURL ? photoURL : `https://avatars.dicebear.com/api/human/${id}.svg`}
                                    />
                              </div>
                              <div className="start_chat_name_last_message">
                                    <p className="Name">{name}</p>
                                    <p>Last Message....</p>
                              </div>
                        </div>
                  </Link>
            </div>

      );
}

export default Sidebarchat;
