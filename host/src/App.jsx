import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import ButtonBooks from "./ButtonBooks";
import LoginUser from "./LoginUser";
import RegisterUser from "./Register";
import ListUser from "./ListUser";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <div className="card">
        <div>
          <Navbar />
        </div>
        <div>
          <h1 className="host">Host Application</h1>
        </div>
        <Routes>
          <Route path="/books" element={<ButtonBooks />} />
          <Route path="/login" element={<LoginUser />} />
          <Route path="/register" element={<RegisterUser />} />
          <Route path="/users" element={<ListUser />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
