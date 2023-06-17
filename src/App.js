import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import DataState from './context/data/DataState';
import Login from './components/Login';
import Signup from './components/Signup';
import Showuser from './components/Showuser';
import Admin from './components/Admin';
import Alluser from './components/Alluser';
import { useState } from 'react';
import Alert from './components/Alert';
function App() {
  const [alert, setAlert] = useState(null);
  const showalert = (message, type) => {
    setAlert({
      message: message,
      type: type
    })
  }
  return (
    <DataState>
      <Router>
        <Navbar showalert={showalert} />
        <Alert alert={alert} />
        <Routes>
          <Route exact path='/' element={<Home showalert={showalert} />} />
          <Route exact path='/admin' element={<Admin showalert={showalert} />} />
          <Route exact path='/login' element={<Login showalert={showalert} />} />
          <Route exact path='/signup' element={<Signup showalert={showalert} />} />
          <Route exact path='/showuser' element={<Showuser showalert={showalert} />} />
          <Route exact path='/alluser' element={<Alluser />} />
        </Routes>
      </Router>
    </DataState>
  );
}

export default App;
