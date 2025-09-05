import React, {useState} from 'react'
import './App.css';
import NavBar from './Components/NavBar';
import News from './Components/News';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import LoadingBar from "react-top-loading-bar";


const App = ()=> {
  const pageSize = 8;
  const apiKey = process.env.REACT_APP_API_KEY //store your api key here
  const [progress, setProgress] = useState(0);
    return (
      <div>
        <Router>
          <NavBar />
          <LoadingBar
            color="#f11946"
            progress={progress}
          />
          <Routes>
            <Route exact path="/" element={<News setProgress={setProgress} key="general" pageSize={pageSize} apiKey={apiKey} country="us" category="general" />}></Route>
            <Route exact path="/business" element={<News setProgress={setProgress} key="business" pageSize={pageSize} apiKey={apiKey} country="us" category="business" />}></Route>
            <Route exact path="/entertainment" element={<News setProgress={setProgress} key="entertainment" pageSize={pageSize} apiKey={apiKey} country="us" category="entertainment" />}></Route>
            <Route exact path="/general" element={<News setProgress={setProgress} key="general" pageSize={pageSize} apiKey={apiKey} country="us" category="general" />}></Route>
            <Route exact path="/health" element={<News setProgress={setProgress} key="health" pageSize={pageSize} apiKey={apiKey} country="us" category="health" />}></Route>
            <Route exact path="/science" element={<News setProgress={setProgress} key="science" pageSize={pageSize} apiKey={apiKey} country="us" category="science" />}></Route>
            <Route exact path="/sports" element={<News setProgress={setProgress} key="sports" pageSize={pageSize} apiKey={apiKey} country="us" category="sports" />}></Route>
            <Route exact path="/technology" element={<News setProgress={setProgress} key="technology" pageSize={pageSize} apiKey={apiKey} country="us" category="technology" />}></Route>
          </Routes>
        </Router>
      </div>

    )
}
export default App;