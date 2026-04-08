import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../style/User/Login.css";

export default function Dlogin() {
  const [form, setForm] = useState({
    demail: "",
    dpassword: "",
  });
  const [status, setStatus] = useState("");
  const navi = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://hospibackend.netlify.app/dlogin",
        form,
      );
      const data = await res.data;
      setStatus(data.message);

      if (res.status === 200) {
        setStatus(data.message);
        localStorage.setItem("token", data.token);
        localStorage.setItem("doctor", JSON.stringify(data.doctor));
        navi("/dhome");
      }
    } catch (error: any) {
      setStatus(error.message);
      if (error.response) {
        setStatus(error.response.data.message);
      }
    }
  };
  return (
    <>
      <div className="loginWorld">
        <div className="loginContainera">
          <h1>Doctor-Login</h1>
          <form onSubmit={handleForm} className="loginForm">
            <div className="formBox">
              <label htmlFor="demail">Email</label>
              <input
                type="text"
                className="inputLoginField"
                name="demail"
                placeholder="Email"
                onChange={handleChange}
                value={form.demail}
                required
              />
            </div>
            <div className="formBox">
              <label htmlFor="dpassword">Password</label>
              <input
                type="password"
                className="inputLoginField"
                name="dpassword"
                placeholder="Password"
                onChange={handleChange}
                value={form.dpassword}
                required
              />
            </div>
            <Link to="/dforgetpassword">forgot password</Link>
            <button type="submit" className="loginBut">
              Login
            </button>
          </form>
          <p className="linkP">
            create a account?
            <Link to="/dsignup" style={{ color: "royalblue" }}>
              signup
            </Link>
          </p>

          <p>{status}</p>
        </div>
        <div className="loginContainerb">
          <h1 className="loginTitle">Welcome to Restaurant!</h1>
          <h2>
            Your culinary journey begins here—let’s make every meal memorable!
          </h2>
          <p className="loginDes">
            Experience the taste of freshness and tradition. Log in to explore
            our menu, place your orders, and enjoy exclusive offers crafted just
            for you.
          </p>
        </div>
      </div>
    </>
  );
}
