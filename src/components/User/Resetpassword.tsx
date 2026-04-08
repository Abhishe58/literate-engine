import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function Resetpassword() {
  const [password, setPassword] = useState("");
  const [noti, setNoti] = useState("");
  const { tokenb } = useParams();
  const navi = useNavigate();

  const resetPass = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await fetch(`http://127.0.0.1:5000/resetpassword/${tokenb}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    const data = await res.json();
    setNoti(data.message);
    if (res.ok) {
      navi("/");
    }
  };
  return (
    <>
      <div className="loginWorld">
        <div className="loginContainera">
          <h1>Reset Password</h1>
          <form onSubmit={resetPass} className="loginForm">
            <div className="formBox">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                className="inputLoginField"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
              />
            </div>

            <button type="submit" className="loginBut">
              Submit
            </button>
          </form>
          <p>{noti}</p>
        </div>
        <div className="loginContainery"></div>
      </div>
    </>
  );
}
