import React, { useEffect, useState } from 'react'
import './Sidebar.css'
import Avatar from '@material-ui/core/Avatar';
import SearchIcon from '@material-ui/icons/Search';
import Sidebarchat from './Sidebarchat'
import db from './firebase'
import firebase from 'firebase'
import { useSelector } from 'react-redux';
import {  selectEmail, selectPhotourl, selectUser } from './features/user/userSlice';

function Sidebar() {

    const [rooms, setrooms] = useState([])

    // var db_store = db.collection('rooms')

    const user = useSelector(selectUser)
    const useremail = useSelector(selectEmail)
    const userphotourl = useSelector(selectPhotourl)
    

    useEffect(() => {
        db.collection('rooms').orderBy('timestamp', 'desc').onSnapshot(snapshot => setrooms(snapshot.docs.map(doc =>({
            id: doc.id,
            data: doc.data()
        }))))
        console.log(rooms)
    }, [''])



   
    console.log(rooms)
        
        const Add =() => {
            var newRoom = prompt('New room name?') 
            if (newRoom) {
                db.collection('rooms').add({personName: newRoom, timestamp : firebase.firestore.FieldValue.serverTimestamp()})
            }
        
    }

    console.log('sidbar page', user, useremail, userphotourl)
    console.log('rooms',rooms)
    console.log('for avatar icon', user.photourl)

    
    return (
        <div className='sidebar'>
            
            <div className="sidebar_header ">
                < Avatar src={userphotourl} />
                <div className="sidebar_header_middle">
                    <h3>{user}</h3>
                    <p>Singnd in as <span> {useremail}</span></p>
                </div>
                
                <div className='sidebar_header_right'>
                   
                </div>
            </div>

            <div className='sidebar_search_outside'>
                <div className='sidebar_search'>
                    <SearchIcon/>
                    <input type='text' placeholder='Search or start new chat'/>
                </div>

            </div>
            <div onClick={Add} className='new_chat'>
                <h3 >Add  New Chat</h3>
            </div>
            <div className='sidebar_chat'>
                
                {rooms.map(a_room => (
                     <Sidebarchat id={a_room.id} key={a_room.id} name={a_room.data.personName}   />
                ))}




               
                
            </div>
        </div>
    )
}

export default Sidebar
