import React, { useEffect } from 'react';
// import logo from './logo.svg';
// import { Counter } from './features/counter/Counter';
import './App.css';
import Sidebar from './Sidebar'
import Chatbox from './Chatbox'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { selectUser } from './features/user/userSlice';
import { useSelector } from 'react-redux';
import Login from './features/user/userLogin';




function App() {

    const user = useSelector(selectUser)


    console.log('app_page',user)

  return (
    <div className='app'>

      {!user ?  <Login /> :
                <div className='app_body'>
                    <Router>
                      <Switch>
                    
                        {/* <Route path='/home'>
                            <h1>Welcome to home page</h1>
                        </Route> */}

                        <Route path='/rooms/:id'>
                            
                              <Sidebar />
                              <Chatbox />
                        {/* the Router below is ver necessary to keep
                        because this is what makes the router keep working
                         when we dont have full address with id */}
                        </Route>
                            <Sidebar />
                            <Chatbox />
                        <Route>

                        </Route>
                      </Switch>
                    </Router>
                  </div>

      }

       
    </div>
  );
}

export default App;
