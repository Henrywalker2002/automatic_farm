import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes, Link} from "react-router-dom";
import MyNav from './MyNav';
//////

// import 'bootstrap/dist/css/bootstrap.min.css';
// import React from 'react';
import Tabs from './Tabs';
// import Title from './Title';
// import InfoTable from './Components/InfoTable';
// import Chart from './Components/Chart';
// import Condition from './condition';
import Title from './Lightening/Title';
import SetupLight from './Lightening/Setup';
import Setup from './setup';
import Info from './Lightening/Info';
import Infor from "./Infor"
import './App.css';
import Lightening from './Lightening/Lightening';
// import { Route, Routes } from 'react-router-dom';
// // import navM from './MyNav'
// import MyNav from './MyNav';
function App() {
  return (
        <div className = "app">
          <MyNav />
          <Router>
            <Routes>
              <Route exact path='water/infor' element={ <Infor/>} />
              <Route exact path='water/setup' element={< Setup/>} />
              <Route path='/setup' element={< Setup/>} />
              <Route path = '/lighting/' element = {< Lightening/>} />
              <Route path = '/light/infor' element = {<Info />} />
              <Route path = '/light/setup' element = {<SetupLight />} />
              <Route path='/water' element = {<Tabs />} />
            </Routes>
          </Router>
        </div>

  );
}

export default App;