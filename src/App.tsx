import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/User/Login";
import Signup from "./components/User/Signup";
import Home from "./components/User/Home";
import Dlogin from "./components/Doctor/Dlogin";
import Dsignup from "./components/Doctor/Dsignup";
import Dhome from "./components/Doctor/Dhome";
import Forgetpassword from "./components/User/Forgetpassword";
import Resetpassword from "./components/User/Resetpassword";
import Dforgetpassword from "./components/Doctor/Dforgetpassword";
import Dresetpassword from "./components/Doctor/Dresetpassword";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/forgetpassword" element={<Forgetpassword />}></Route>
          <Route
            path="/resetpassword/:tokenb"
            element={<Resetpassword />}
          ></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/dlogin" element={<Dlogin />}></Route>
          <Route path="/dsignup" element={<Dsignup />}></Route>
          <Route path="/dhome" element={<Dhome />}></Route>
          <Route path="/dforgetpassword" element={<Dforgetpassword />}></Route>
          <Route
            path="/dresetpassword/:tokenc"
            element={<Dresetpassword />}
          ></Route>
        </Routes>
      </BrowserRouter>
      {/* literate-engine */}
    </>
  );
}

export default App;
