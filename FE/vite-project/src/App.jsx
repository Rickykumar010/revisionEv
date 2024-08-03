import { Routes, Route, Link } from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import Show from "./Show";
import ProtectedRoute from "./ProtectedRoute"; 
import './relo.css';

function App() {
  return (
    <>
      <nav>
        <Link to="/show">Home</Link>
        <div>
          <Link to="/register">Register / </Link>
          <Link to="/login">Log-in</Link>
        </div>
      </nav>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/show" element={ <ProtectedRoute><Show /></ProtectedRoute>} />
      </Routes>
    </>
  );
}
export default App;
