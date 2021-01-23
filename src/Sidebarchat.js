import React, { useEffect, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import "./Sidebarchat.css";
import { Link } from "react-router-dom";

function Sidebarchat({ id, name }) {
      // this was initially used to generate random number
      // const [seed_for_avatar, setseed_for_avatar] = useState('')

      // useEffect(() => {
      //    setseed_for_avatar(Math.random())
      // }, [])

      console.log(id, name);
      return (
            <Link to={`/rooms/${id}`}>
                  <div className="start_chat">
                        <div className="Avatar">
                              <Avatar
                                    className="avatarHover"
                                    src={`https://avatars.dicebear.com/api/human/${id}.svg`}
                              />
                        </div>
                        <div className="start_chat_name_last_message">
                              <p className="Name">{name}</p>
                              <p>Last Message....</p>
                        </div>
                  </div>
            </Link>
      );
}

export default Sidebarchat;
