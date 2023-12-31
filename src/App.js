import Login from './Account/login';
import SignUp from './Account/signUp';
import './App.css';
import {BrowserRouter as Router, Routes,Route} from 'react-router-dom'
import {createContext, useState} from 'react'
import Private from './component/private';
import Create from './component/content/create';
import { useCurrent } from './Account/currentUser/useCurrent';
import Home from './component/content/home';
export const Appcontext = createContext();
function App() {
 const [user] = useCurrent()

  return (
    <div className="App">
      <Appcontext.Provider value={{user}}>
      <Router >
        <Routes>
          <Route element={<Private/>}>
         <Route path='Post' element={<Create/>}/>
         <Route path='Home' element={<Home/>}/>

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
