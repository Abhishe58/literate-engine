import { useState } from "react";

export default function Dforgetpassword() {
  const [email, setEmail] = useState<any>();
  const [noti, setNoti] = useState("");

  const subEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await fetch(
        "https://congenial-succotash-93s5.onrender.com/dforgetpassword",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        },
      );

      const data = await res.json();
      if (res.ok) {
        setNoti(data.message);
      }
    } catch (error: any) {
      setNoti(error?.response?.data.message);
    }
  };
  return (
    <>
      <div className="loginWorld">
        <div className="loginContainerx"></div>
        <div className="loginContainera">
          <h1>Reset Password</h1>
          <form onSubmit={subEmail} className="loginForm">
            <div className="formBox">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                className="inputLoginField"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="loginBut">
              Submit
            </button>
          </form>
          <p>{noti}</p>
        </div>
      </div>
    </>
  );
}
