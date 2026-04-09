import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phonenumber: "",
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
      const res = await fetch(
        "https://congenial-succotash-93s5.onrender.com/signup",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        },
      );
      const data = await res.json();
      setStatus(data.message);

      if (res.ok) {
        setStatus(data.message);
        navi("/");
      }
    } catch (error: any) {
      setStatus(error.message);
    }
  };
  return (
    <>
      <div className="loginWorld">
        <div className="signupContainerb">
          <h1 className="loginTitle">Join the Restaurant Family!</h1>
          <h2 className="loginSubtitle">
            Create your account and start your culinary journey with us.
          </h2>
          <p className="loginDes">
            Sign up today to savor exclusive offers, personalized
            recommendations, and sneak peeks of our newest dishes. Your next
            delicious experience is just a few clicks away!
          </p>
        </div>
        <div className="loginContainera">
          <h1>Signup</h1>
          <form onSubmit={handleForm} className="loginForm">
            <div className="formBox">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="inputLoginField"
                name="name"
                placeholder="Name"
                onChange={handleChange}
                value={form.name}
                required
              />
            </div>
            <div className="formBox">
              <label htmlFor="phonenumber">Phone Number</label>
              <input
                type="number"
                className="inputLoginField"
                name="phonenumber"
                placeholder="Phone Number"
                onChange={handleChange}
                value={form.phonenumber}
                required
              />
            </div>
            <div className="formBox">
              <label htmlFor="email">Email</label>
              <input
                type="email"
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
            <button type="submit" className="loginBut">
              Signup
            </button>
          </form>
          <p className="linkP">
            have a account?
            <Link to="/" style={{ color: "royalblue" }}>
              login
            </Link>
          </p>
          <p>{status}</p>
        </div>
      </div>
    </>
  );
}
