import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import Navbar from './components/Navbar';
import { Home } from './components/Home';
import About from './components/About';
import TaskState from './context/tasks/TaskState';
import { Alert } from './components/Alert';
import Signup from './components/Signup';
import Login from './components/Login';
import {useState} from 'react';
function App() {
  const [alert,setAlert]=useState(null);
  const showAlert=(message,type)=>{
    setAlert({
      msg:message,
      type:type
    })
    setTimeout(()=>{
      setAlert(null);
    },1500)
  }
  return (
    <div>
      <TaskState>
        <Router>
          <Navbar />
          <Alert alert={alert}/>
          <div className="container">
            <Routes>
            <Route exact path="/" element={<Home showAlert={showAlert}/>}/>
            <Route exact path="/About" element={<About />}/>
            <Route exact path="/login" element={<Login showAlert={showAlert}/>}/>
            <Route exact path="/signup" element={<Signup showAlert={showAlert}/>}/>
            </Routes>
          </div>
        </Router>
      </TaskState>
    </div>
  );
}

export default App;
