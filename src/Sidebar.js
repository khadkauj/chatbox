import React, { useEffect, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import SearchIcon from "@material-ui/icons/Search";
import Sidebarchat from "./Sidebarchat";
import db from "./firebase";
import firebase from "firebase";
import { useSelector } from "react-redux";
import { selectEmail, selectPhotourl, selectUid, selectUser } from "./features/user/userSlice";


import "./Sidebar.css";

function Sidebar() {
      const [rooms, setrooms] = useState([]);

      // var db_store = db.collection('rooms')

      const user = useSelector(selectUser);
      const useremail = useSelector(selectEmail);
      const userphotourl = useSelector(selectPhotourl);
      const uid = useSelector(selectUid)

      useEffect(() => {
            db.collection("rooms")
                  .orderBy("timestamp", "desc")
                  .onSnapshot((snapshot) =>
                        setrooms(
                              snapshot.docs.map((doc) => ({
                                    id: doc.id,
                                    data: doc.data(),
                              }))
                        )
                  );
      }, []);


      const Add = () => {
            var newRoom = prompt("New room name?");
            if (newRoom) {
                  db.collection("rooms").add({
                        personName: newRoom,
                        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                  });
            }
      };
      console.log("rooms,", rooms);
      return (

            <div className="sidebar">
                  <div className="sidebar_header ">
                        <Avatar src={userphotourl} />
                        <div className="sidebar_header_middle">
                              <h3>{user}</h3>
                              <p>
                                    Signed in as <strong> {useremail}</strong>
                              </p>
                        </div>
                  </div>

                  <div className="sidebar_search">
                        <SearchIcon />
                        <input className="input" type="text" placeholder="Search or start new chat" />
                  </div>

                  <div onClick={Add} className="new_chat">
                        <h3 style={{ fontSize: "14px", cursor: "pointer" }} className="addChat" >Add New Chat</h3>
                  </div>
                  <div className="sidebar_scroll">
                        <div className="sidebar_chat">
                              {rooms.map((a_room) => (
                                    <div className="classRoom" key={a_room.id} >
                                          <Sidebarchat id={a_room.id} key={a_room.id} name={a_room.data.personName} photoURL={a_room.data.photoURL}
                                                uidConcatenation={a_room?.data?.uid < uid ? a_room?.data?.uid + uid : uid + a_room?.data?.uid}
                                                email={a_room.data.personName}
                                          />
                                          <p className="personNameInSmallGroup"> {a_room.data.personName}</p>
                                          <hr className="hrGroup" />
                                    </div>
                              ))}
                        </div>
                  </div>
            </div>
      );
}

export default Sidebar;
