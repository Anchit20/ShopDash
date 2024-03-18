// import logo from "./logo.svg";
import "./App.css";
import Nav from "./components/Nav";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import SignUp from "./components/SignUp";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        {/* <h1>E-Dashboard</h1> */}
        <Routes>
          <Route path="/" element={<h1>Product listing</h1>} />
          <Route path="/add" element={<h1>add Product </h1>} />
          <Route path="/update" element={<h1>update Product</h1>} />
          <Route path="/logout" element={<h1>logout</h1>} />
          <Route path="/profile" element={<h1>profile</h1>} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
