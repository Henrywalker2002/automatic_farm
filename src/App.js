import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route} from "react-router-dom";
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
    <Router>
    <div className="App">
        
        {/* <MyNav />
        <Title/>
        <Tabs/> */}
      
        <Route path="/" exact component={Setup} />
        <Route path="/setup" exact component={Setup} />
        <Route path="/infor" component={Infor} />
        
    </div>
    </Router>
  );
}

export default App;
