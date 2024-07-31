import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/login";
import PasswordRecovery from "./pages/passwordRecovery";

export default function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/password-recovery" element={<PasswordRecovery />} />
        </Routes>
      </div>
    </Router>
  );
}
