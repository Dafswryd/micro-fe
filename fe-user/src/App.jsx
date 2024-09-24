import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Login } from "./Login";
import { Register } from "./Register";
import { UserList } from "./UserList";
import { LoginTest } from "./LoginTest";

const App = () => (
  <Router>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/users" element={<UserList />} />
      <Route path="/logintest" element={<LoginTest />} />
    </Routes>
  </Router>
);

export default App;
