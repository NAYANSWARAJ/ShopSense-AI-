import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Predict from "./pages/Predict";
import About from "./pages/About";
import Dashboard from "./pages/Dashboard";

function App() {

  return (
    <BrowserRouter>

      <div className="flex min-h-screen flex-col">

        <Navbar />

        <div className="flex-1">

          <Routes>

            <Route
              path="/"
              element={<Home />}
            />

            <Route
              path="/predict"
              element={<Predict />}
            />

            <Route
              path="/dashboard"
              element={<Dashboard />}
            />

            <Route
              path="/about"
              element={<About />}
            />

          </Routes>

        </div>

        <Footer />

      </div>

    </BrowserRouter>
  );
}


export default App;