import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../style/User/Login.css";

export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
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
        "https://congenial-succotash-93s5.onrender.com/login",
        form,
      );
      const data = await res.data;
      setStatus(data.message);

      if (res.status === 200) {
        setStatus(data.message);
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        navi("/home");
      }
    } catch (error: any) {
      setStatus(error?.response?.data.message);
    }
  };
  return (
    <>
      <div className="loginWorld">
        <div className="loginContainerb">
          <h1 className="loginTitle">Welcome Back</h1>
          <h2 className="loginSubtitle">Access your health dashboard</h2>
          <p className="loginDes">
            Login to manage your appointments, view doctor details, and stay
            updated with your health schedule. Fast, secure, and easy access to
            all your bookings in one place.
          </p>
        </div>
        <div className="loginContainera">
          <h1>Login</h1>
          <form onSubmit={handleForm} className="loginForm">
            <div className="formBox">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                className="inputLoginField"
                name="email"
                placeholder="Email"
                onChange={handleChange}
                value={form.email}
                required
              />
            </div>
            <div className="formBox">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="inputLoginField"
                name="password"
                placeholder="Password"
                onChange={handleChange}
                value={form.password}
                required
              />
            </div>
            <Link
              to="/forgetpassword"
              style={{ color: "royalblue", fontSize: "16px" }}
            >
              forgot password
            </Link>
            <button type="submit" className="loginBut">
              Login
            </button>
          </form>
          <p className="linkP">
            create a account?
            <Link to="/signup" style={{ color: "royalblue", fontSize: "16px" }}>
              signup
            </Link>
          </p>

          <p>{status}</p>
        </div>
      </div>
    </>
  );
}

// user@gmail.com
// user
