import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Course from "./pages/Course.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

function App() {
  return (
    <BrowserRouter basename="/class-attendance-system">
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route
          path="/"
          element={
            <ProtectedRoute allowedRoles={['instructor']}>
              <Home />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/course"
          element={
            <ProtectedRoute allowedRoles={['student']}>
              <Course />
            </ProtectedRoute>
          }
        ></Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
