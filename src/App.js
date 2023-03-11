import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes, Link} from "react-router-dom";
import MyNav from './MyNav';
//////

// import 'bootstrap/dist/css/bootstrap.min.css';
// import React from 'react';
import Tabs from './Tabs';
import Title from './Title';
// import InfoTable from './Components/InfoTable';
// import Chart from './Components/Chart';
// import Condition from './condition';
import Setup from './setup';
import Infor from './Infor';
import './App.css';
// import { Route, Routes } from 'react-router-dom';
// // import navM from './MyNav'
// import MyNav from './MyNav';
function App() {
  return (
        <div className = "app">
          <MyNav />
          <Title />
          <Tabs />
          {/* <MyNav />
          <Title/>
          <Tabs/>
          <Setup/> */}
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
