import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Dsignup() {
  const [form, setForm] = useState({
    dname: "",
    demail: "",
    dphonenumber: "",
    dspecialty: "",
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
      const res = await fetch("http://127.0.0.1:5000/dsignup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
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
        <div className="loginContainera">
          <h1>Doctor-Signup</h1>
          <form onSubmit={handleForm} className="loginForm">
            <div className="formBox">
              <label htmlFor="dname">Name</label>
              <input
                type="text"
                className="inputLoginField"
                name="dname"
                placeholder="Name"
                onChange={handleChange}
                value={form.dname}
                required
              />
            </div>
            <div className="formBox">
              <label htmlFor="dphonenumber">Phone Number</label>
              <input
                type="number"
                className="inputLoginField"
                name="dphonenumber"
                placeholder="Phone Number"
                onChange={handleChange}
                value={form.dphonenumber}
                required
              />
            </div>
            <div className="formBox">
              <label htmlFor="demail">Email</label>
              <input
                type="email"
                className="inputLoginField"
                name="demail"
                placeholder="Email"
                onChange={handleChange}
                value={form.demail}
                required
              />
            </div>
            <div className="formBox">
              <label htmlFor="dspecialty">Specialty</label>
              <input
                type="text"
                className="inputLoginField"
                name="dspecialty"
                placeholder="Specialty"
                onChange={handleChange}
                value={form.dspecialty}
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
            <button type="submit" className="loginBut">
              Signup
            </button>
          </form>
          <p className="linkP">
            hav a account?
            <Link to="/dlogin" style={{ color: "royalblue" }}>
              login
            </Link>
          </p>
          <p>{status}</p>
        </div>
        <div className="signupContainerb">
          <h1 className="loginTitle">Join the Restaurant Family!</h1>
          <h2>Create your account and start your culinary journey with us.</h2>
          <p className="loginDes">
            Sign up today to savor exclusive offers, personalized
            recommendations, and sneak peeks of our newest dishes. Your next
            delicious experience is just a few clicks away!
          </p>
        </div>
      </div>
    </>
  );
}
