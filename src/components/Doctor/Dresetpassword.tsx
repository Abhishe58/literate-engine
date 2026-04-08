import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function Dresetpassword() {
  const [password, setPassword] = useState("");
  const [noti, setNoti] = useState("");
  const { tokenc } = useParams();
  const navi = useNavigate();

  const resetPass = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await fetch(
      `https://congenial-succotash-93s5.onrender.com/dresetpassword/${tokenc}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      },
    );

    const data = await res.json();
    setNoti(data.message);
    if (res.ok) {
      navi("/dlogin");
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
