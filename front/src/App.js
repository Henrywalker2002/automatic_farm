import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
//////

// import 'bootstrap/dist/css/bootstrap.min.css';
// import React from 'react';

// import Title from './Title';
// import InfoTable from './Components/InfoTable';
// import Chart from './Components/Chart';
// import Condition from './condition';
import SetupLight from './Lightening/Setup';
import InfoLight from './Lightening/Info';
import Lightening from './Lightening/Lightening';
import Watering from './Watering/Watering';
import InfoWater from "./Watering/Info";
import SetupWater from './Watering/Setup';
import './App.css';

import Login from './Login/Login';
import Home from './Home/Home';
import { redirect } from 'react-router-dom';

// import { Route, Routes } from 'react-router-dom';
// // import navM from './MyNav'
// import MyNav from './MyNav';
function App() {
  return (
        <div className = "app">
          <Router>
            <Routes>
              <Route exact path='/water/infor' element={ <InfoWater/>} />
              <Route exact path='/water/setup' element={< SetupWater/>} />
              <Route path='/login' element={< Login/>} />
              <Route path = '/light' element = {< Lightening/>} />
              <Route path = '/light/infor' element = {<InfoLight />} />
              <Route path = '/light/setup' element = {<SetupLight />} />
              <Route path='/water' element = {<Watering />} />
              <Route exact path='/' element={ <Home/>} />
            </Routes>
          </Router>
        </div>

  );
}

export default App;