import './App.css';
import Dash from './Component/Dash.js';


import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>

        <Routes>
          {/* Public Route - Sign Up */}
          {/* <Route path="/" element={<Signup />} /> */}

          {/* Public Route - Dashboard */}
          <Route path="/" element={<Dash />} />

          {/* Public Route - Add Recipe */}
          {/* <Route path="/add/:id" element={<RecipeDetail edit={false} />} /> */}

          {/* Public Route - Edit Recipe */}
          {/* <Route path="/edit/:id" element={<RecipeDetail edit={true} />} /> */}
        </Routes>

    </Router>
  );
}

export default App;