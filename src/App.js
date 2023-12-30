import Login from './Account/login';
import SignUp from './Account/signUp';
import './App.css';
import {BrowserRouter as Router, Routes,Route} from 'react-router-dom'
import { auth } from './config/config';
import {useAuthState} from 'react-firebase-hooks/auth'
import {createContext, useState} from 'react'
import Private from './component/private';
import Create from './component/content/create';
export const Appcontext = createContext();
function App() {
  let user;
  const [userDetails] = useAuthState(auth);

  if(userDetails){
    user = userDetails
  
  }
else if (localStorage.getItem('users')){
user = JSON.parse(localStorage.getItem('users'))
}


  return (
    <div className="App">
      <Appcontext.Provider value={{user}}>
      <Router >
        <Routes>
          <Route element={<Private/>}>
         <Route path='Post' element={<Create/>}/>
          </Route>
          <Route path='/' element={<Login/> }/>
          <Route path='/signUP' element={<SignUp/> }/>
        </Routes>
      </Router>
      </Appcontext.Provider>

    </div>
  );
}

export default App;
