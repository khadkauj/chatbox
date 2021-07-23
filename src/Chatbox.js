import React, { useEffect, useState, useRef } from "react";
import Avatar from "@material-ui/core/Avatar";
import CreateIcon from "@material-ui/icons/Create";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { Button } from "@material-ui/core";
import { useHistory, useParams } from "react-router-dom";
import db from "./firebase";
import { useDispatch, useSelector } from "react-redux";
import firebase from "firebase";
import { logout, selectChatWithPersonEmail, selectChatWithPersonPhotoUrl, selectEmail, selectUid, selectUser, userWithWhomToChat } from "./features/user/userSlice";
import SendIcon from '@material-ui/icons/Send';
import SendOutlinedIcon from '@material-ui/icons/SendOutlined';

import "./Chatbox.css";

function Chatbox() {
      const [message, setmessage] = useState("");
      const [roomName, setroomName] = useState([]);
      const [photoURLForHeader, setPhotoURLForHeader] = useState("")
      const [messages_from_store, setmessages_from_store] = useState([]);
      const userEmail = useSelector(selectEmail);
      const uid = useSelector(selectUid)
      const email = useSelector(selectChatWithPersonEmail)
      const photoURl = useSelector(selectChatWithPersonPhotoUrl)
      const { id } = useParams();
      const history = useHistory()
      const dispatch = useDispatch()
      useEffect(() => {
            setPhotoURLForHeader(photoURl)
            setroomName(email)
      }, [id, email]);

      const [state, setState] = useState(false)

      const [test, setTest] = useState([])
      useEffect(() => {
            const list = []
            db.collection("messages").doc(id).collection("messages").orderBy("timestamp", "asc").onSnapshot((doc) => {
                  console.log("Current data: ", doc.docs);
                  setmessages_from_store(doc.docs.map(dat => dat.data()))
            });


      }, [id]);

      console.log("msgs", test);

      const sendMessage = (event) => {
            event.preventDefault();
            if (message !== "") {
                  db.collection("messages").doc(id).collection("messages").add({
                        message: message,
                        name: userEmail,
                        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                  }, { merge: true })
                        .then(nothing => {
                              setmessage("");
                              setState(!state)
                        })
                        .catch(error => console.log(error))
            }
      };

      const log_out = (e) => {
            e.preventDefault();
            dispatch(logout());
            firebase.auth().signOut().then(nothning => {
                  history.push("/")
            }).catch(error => {
                  console.log(error);
            })
      };

      useEffect(() => {
            var div = document.querySelector("#scrollDiv")
            div.scrollTop = div?.scrollHeight - div?.clientHeight

      }, [messages_from_store])

      return (
            <div className="chatbox">
                  {
                        roomName ?
                              <div className="chatbox_header">
                                    <div style={{ display: "flex", alignItems: 'center' }}>
                                          <div className="chatbox_header_avatar">
                                                <Avatar src={photoURLForHeader} />

                                          </div>
                                          <div className="chatbox_header_details">
                                                <h3>{roomName}</h3>
                                                <p>Last Seen At...</p>
                                          </div>
                                    </div>

                                    <div className="exit_icon" style={{ marginRight: "15px", cursor: "pointer" }} onClick={log_out}>
                                          <div className="">
                                                <ExitToAppIcon onClick={log_out} />
                                          </div>
                                          <p>LogOut</p>
                                    </div>
                              </div> :
                              <div style={{ height: "10%" }}>
                              </div>
                  }


                  <div id="scrollDiv" className="message_scroll">
                        {messages_from_store.map((a_message) => (
                              <p key={a_message.message} className={`chatbox_message_sender ${userEmail === a_message.name && `chatbox_message_receiver`}`}>
                                    {a_message.message}
                              </p>
                        ))}
                  </div>

                  <div className="chatbox_footer">
                        <form className="chatbox_footer_form" style={{ fontSize: "22px" }}  >
                              <textarea style={{ border: "none", outline: "none", flex: "1" }}
                                    value={message}
                                    onChange={(e) => setmessage(e.target.value)}
                                    type="submit"
                                    placeholder="Type a message"
                                    autoFocus="true"
                              />
                              <SendOutlinedIcon fontSize="large" onClick={sendMessage} className="form_button" type="submit" style={{ cursor: "pointer" }} />
                        </form>
                  </div>
            </div>
      );
}

export default Chatbox;
