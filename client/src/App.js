import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Landing from "./components/layout/Landing";
import { Auth } from "./views/Auth";
import AuthContextProvider from "./components/context/AuthContext";
import { Dashboard } from "./views/Dashboard";
import { ProtectedRoute } from "./components/routing/ProtectedRoute";
import { About } from "./views/About";
import PostContextProvider from "./components/context/PostContext";

function App() {
  return (
    <AuthContextProvider>
      <PostContextProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Auth authRoute="login" />} />
            <Route path="/register" element={<Auth authRoute="register" />} />
            <Route
              path="/dashboard"
              element={<ProtectedRoute Component={Dashboard} />}
            />
            <Route
              path="/about"
              element={<ProtectedRoute Component={About} />}
            />
          </Routes>
        </Router>
      </PostContextProvider>
    </AuthContextProvider>
  );
}

export default App;
