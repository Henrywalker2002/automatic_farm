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
import Setup from './Lightening/Setup';
import Info from './Lightening/Info';
import './App.css';
import Lightening from './Lightening/Lightening';
// import { Route, Routes } from 'react-router-dom';
// // import navM from './MyNav'
// import MyNav from './MyNav';
function App() {
  return (
        <div className = "app">
          {/* { <Router>
          <MyNav />
          <Routes>
            <Route exact path='/lightening' element= {<Lightening/>}/>
              
              
          </Routes>
          </Router> } */}
          <Lightening />

          {/* <Title /> */}
          {/* { <Tabs /> } */}
          {/* {/* <MyNav /> */}
          */
            {/* <ul className="App-header">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/setup">About Us</Link>
              </li>
              <li>
                <Link to="/infor">Contact Us</Link>
              </li>
            </ul>
           <Routes>
                 <Route exact path='/' element={< Setup />}></Route>
                 <Route exact path='/setup' element={< Setup />}></Route>
                 <Route exact path='/infor' element={< Infor />}></Route>
          </Routes> */}

        {/* <Route exact path="/" element = {<Setup/>} /> 
        <Route exact path="/setup" element={<Setup />} />
        <Route exact path="/infor" element={<Infor />} /> */}

        </div>
  );
}

export default App;
