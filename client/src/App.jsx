import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx"
import Login from "./pages/Login.jsx"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="class-attendance-system/" element={<Home />}></Route>
        <Route path="class-attendance-system/login" element={<Login />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
