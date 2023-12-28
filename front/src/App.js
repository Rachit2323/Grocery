import './App.css';
import Dash from './Component/Dash.js';


import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>

        <Routes>
     
          <Route path="/" element={<Dash />} />

        </Routes>

    </Router>
  );
}

export default App;