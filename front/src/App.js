import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes, Link} from "react-router-dom";
import MyNav from './MyNav';
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
import { useCookies } from 'react-cookie';
import Report from './Report/Report';

// import { Route, Routes } from 'react-router-dom';
// // import navM from './MyNav'
// import MyNav from './MyNav';
function App() {
  const [cookies, setCookie, removeCookie] = useCookies(['name']);
  if (cookies.name) {
    console.log(123)
  }
  return (
        <div className = "app">
          <MyNav />
          <Router>
            <Routes>
              <Route exact path='water/infor' element={ <InfoWater/>} />
              <Route exact path='water/setup' element={< SetupWater/>} />
              {/* <Route path='/setup' element={< Setup/>} /> */}
              <Route path = '/light' element = {< Lightening/>} />
              <Route path = '/light/infor' element = {<InfoLight />} />
              <Route path = '/light/setup' element = {<SetupLight />} />
              <Route path='/water' element = {<Watering />} />
              <Route path='/report' element = {<Report />} />
            </Routes>
          </Router>
        </div>

  );
}

export default App;