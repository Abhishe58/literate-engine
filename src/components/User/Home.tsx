import axios from "axios";
import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import "../../style/User/Home.css";
import { useNavigate } from "react-router-dom";

type Doctor = {
  _id: string;
  dname: string;
  demail: string;
  dphonenumber: string;
  dspecialty: string;
};

type application = {
  _id: string;
  doctorId: Doctor;
  date: string;
  time: string;
  reason: string;
  status: string;
};

export default function Home() {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const [doctorList, setDoctorList] = useState<Doctor[]>([]);
  const [applicationList, setApplicationList] = useState<application[]>([]);
  const [appointmentForm, setAppointmentForm] = useState({
    doctorId: "",
    date: "",
    time: "",
    reason: "",
  });
  const [noti, setNoti] = useState("");
  const [appostatusMess, setappostatusMess] = useState("");
  const [appoFilter, setAppoFilter] = useState("all");
  const [resche, setResche] = useState({
    date: "",
    time: "",
  });
  const [rescheToogle, setRescheToogle] = useState(false);
  const [appomobToogle, setAppomobToogle] = useState(false);
  const [docmobToogle, setDocmobToogle] = useState(false);
  // const [aboutDoc, setAboutDoc] = useState([])
  const navi = useNavigate();

  if (token) {
    const decoded = jwtDecode(token);

    if (!decoded.exp) {
      // token has no expiry → treat as invalid
      localStorage.removeItem("token");
      window.location.href = "https://congenial-succotash-93s5.onrender.com/";
    } else {
      const currentTime = Date.now() / 1000;

      if (decoded.exp < currentTime) {
        localStorage.removeItem("token");
        window.location.href = "https://congenial-succotash-93s5.onrender.com/";
      }
    }
  }

  const appolistFun = () => {
    axios
      .get("https://congenial-succotash-93s5.onrender.com/appointmentget", {
        headers: {
          Authorization: `Bearer ${token}`, // ✅ required
        },
      })
      .then((res) => setApplicationList(res.data))
      .catch((error) => {
        console.log("ERROR:", error.response?.data || error);
      });
  };

  useEffect(() => {
    if (!token) {
      navi("/");
      return;
    }
    axios
      .get("https://congenial-succotash-93s5.onrender.com/doctorlist", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setDoctorList(res.data))
      .catch((error) => {
        console.log("ERROR:", error.response?.data || error);
      });

    appolistFun();
  }, [token]);

  const handleChange = async (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    setAppointmentForm((prev) => ({ ...prev, [name]: value }));
  };

  const AppointmentForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "https://congenial-succotash-93s5.onrender.com/appointment",
        appointmentForm,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const data = res.data;

      setNoti(data.message);
      if (res.status === 200) {
        appolistFun();
      }
    } catch (error: any) {
      console.log("FULL ERROR:", error); // optional debug

      if (error.response) {
        // ✅ backend sent response (400, 401, etc.)
        setNoti(error.response.data.message);
      } else {
        // ❌ network error / server down
        setNoti("Something went wrong");
      }
    }
  };

  const cancleAppo = async (appointmentId: any) => {
    try {
      const res = await axios.patch(
        `https://congenial-succotash-93s5.onrender.com/appointementcancle/${appointmentId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const data = res.data;

      setappostatusMess(data.message);
      appolistFun();
    } catch (error: any) {
      console.log(error);
      setappostatusMess(
        error.response?.data?.message || "Error cancelling appointment",
      );
    }
  };

  const appointementfilter = applicationList.filter((appo) => {
    if (appoFilter === "all") {
      return true;
    }
    return appo.status === appoFilter;
  });

  const handleResche = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setResche((prev) => ({ ...prev, [name]: value }));
  };

  const rescheduleAppo = async (id: any) => {
    try {
      const res = await axios.patch(
        `https://congenial-succotash-93s5.onrender.com/reschedule/${id}`,
        resche,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const data = res.data;

      alert(data.message);
    } catch (error) {
      console.log(error);
    }
  };

  const booked = applicationList.filter((u) => u.status === "Booked").length;

  const cancelled = applicationList.filter(
    (u) => u.status === "Cancelled",
  ).length;

  const complete = applicationList.filter(
    (u) => u.status === "Complete",
  ).length;

  // const getDoctorList = async (id: any) => {
  //   try {
  //     const res = await axios.get(`/aboutdoctor/${id}`,{
  //       headers: {
  //         Authorization: `Bearer ${token}`
  //       }
  //     })

  //     const data = res.data;
  //     setAboutDoc(data)
  //   } catch (error: any) {
  //     setNoti(error?.response?.data?.message || "Error to get about Doctor")
  //   }
  // }

  return (
    <>
      <div>
        <header className="homeHeader">
          <p>
            <span className="material-symbols-outlined">cardiology</span>
          </p>
          <p>{user.userName}</p>
        </header>
        <main>
          <div className="mainContainera">
            <div className="mobileContainer">
              <p
                onClick={() =>
                  setAppomobToogle(!appomobToogle && !docmobToogle)
                }
              >
                {appomobToogle ? (
                  <span className="material-symbols-outlined">close</span>
                ) : (
                  <span className="material-symbols-outlined">
                    calendar_add_on
                  </span>
                )}
              </p>
              <p
                onClick={() => setDocmobToogle(!docmobToogle && !appomobToogle)}
              >
                {docmobToogle ? (
                  <span className="material-symbols-outlined">close</span>
                ) : (
                  <span className="material-symbols-outlined">stethoscope</span>
                )}
              </p>
            </div>
            <div className="deskContainer">
              <div className="appointmentContainer">
                <h1>Booked Appointment</h1>
                <form onSubmit={AppointmentForm} className="appoForm">
                  <div className="appoformBox">
                    <label htmlFor="docotr">Select Doctor</label>
                    <select
                      name="doctorId"
                      className="appoInput"
                      onChange={handleChange}
                      value={appointmentForm.doctorId}
                    >
                      <option value="">Select Doctor</option>
                      {doctorList.map((docLis) => (
                        <option value={docLis._id} key={docLis._id}>
                          {docLis.dname} - {docLis.dspecialty}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="appoformBox">
                    <label htmlFor="date">Date</label>
                    <input
                      type="date"
                      name="date"
                      className="appoInput"
                      onChange={handleChange}
                      value={appointmentForm.date}
                      required
                    />
                  </div>
                  <div className="appoformBox">
                    <label htmlFor="time">Time</label>
                    <input
                      type="time"
                      name="time"
                      className="appoInput"
                      onChange={handleChange}
                      value={appointmentForm.time}
                      required
                    />
                  </div>
                  <div className="appoformBox">
                    <label htmlFor="reason">Reason</label>
                    <input
                      type="text"
                      name="reason"
                      className="appoInput"
                      placeholder="Reason"
                      onChange={handleChange}
                      value={appointmentForm.reason}
                      required
                    />
                  </div>
                  <button type="submit" className="loginBut">
                    Submit
                  </button>
                </form>
                <p>{noti}</p>
              </div>
              <div className="doctorListContainer">
                <h1>Doctor List</h1>
                <div className="doctorList">
                  {doctorList.map((docLis) => (
                    <div key={docLis._id} className="doctorBox">
                      <p className="docIco">
                        <span className="material-symbols-outlined">
                          frame_person
                        </span>
                      </p>
                      <p>
                        {docLis.dname} ({docLis.dspecialty})
                      </p>
                      <p>Email: {docLis.demail}</p>
                      <p>Phone Number: {docLis.dphonenumber}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="mainContainerb">
            <div className="doctorFirstContainer">
              <p className="totalp">
                Total Appointment: {applicationList.length}
              </p>
              <p className="totalp">Total Booked: {booked}</p>
              <p className="totalp">Total Cancelled: {cancelled}</p>
              <p className="totalp">Total Completed: {complete}</p>
            </div>
            <div className="appointmentheader">
              <h1>Appointment List</h1>
              <select
                className="filterSelect"
                onChange={(e) => setAppoFilter(e.target.value)}
                value={appoFilter}
              >
                <option value="all">All</option>
                <option value="Booked">Booked</option>
                <option value="Cancelled">Canceled</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
            <div className="appointementList">
              {appointementfilter.map((appo) => {
                const isCancle =
                  appo.status === "Cancelled" || appo.status === "Completed";
                return (
                  <div key={appo._id} className="appointementBox">
                    <p className="appointementreason">{appo.reason}</p>
                    <p style={{ fontWeight: "600" }}>
                      Doctor: {appo.doctorId?.dname} ({appo.doctorId.dspecialty}
                      )
                    </p>
                    <p>Date: {appo.date}</p>
                    <p>Time: {appo.time}</p>
                    <p>Status: {appo.status}</p>
                    <div className="appointmentminBox">
                      {isCancle ? (
                        <p></p>
                      ) : (
                        <button
                          onClick={() => cancleAppo(appo._id)}
                          className="appointementBut"
                        >
                          Cancele Appointement {appostatusMess}
                        </button>
                      )}
                      {isCancle ? (
                        <p></p>
                      ) : (
                        <button
                          onClick={() => setRescheToogle(!rescheToogle)}
                          className="rescheduleBut"
                        >
                          {rescheToogle ? "cancle" : "Reschedule Appointment"}
                        </button>
                      )}
                    </div>
                    {rescheToogle ? (
                      <form
                        onSubmit={() => rescheduleAppo(appo._id)}
                        style={{
                          position: "relative",
                          display: "flex",
                          flexDirection: "column",
                          gap: "10px",
                        }}
                      >
                        <div className="appoformBox">
                          <label htmlFor="date">Date</label>
                          <input
                            type="date"
                            name="date"
                            className="appoInput"
                            onChange={handleResche}
                            value={resche.date}
                            required
                          />
                        </div>
                        <div className="appoformBox">
                          <label htmlFor="time">Time</label>
                          <input
                            type="time"
                            name="time"
                            className="appoInput"
                            onChange={handleResche}
                            value={resche.time}
                            required
                          />
                        </div>
                        <button
                          type="submit"
                          style={{
                            padding: "10px",
                            borderRadius: "10px",
                            border: "none",
                            background: "royalblue",
                            color: "white",
                            cursor: "pointer",
                          }}
                        >
                          re-schedule it
                        </button>
                      </form>
                    ) : (
                      <p></p>
                    )}
                  </div>
                );
              })}
            </div>
            {appomobToogle ? (
              <div className="appointmentContainerx">
                <h1>Booked Appointment</h1>
                <form onSubmit={AppointmentForm} className="appoForm">
                  <div className="appoformBox">
                    <label htmlFor="docotr">Select Doctor</label>
                    <select
                      name="doctorId"
                      className="appoInput"
                      onChange={handleChange}
                      value={appointmentForm.doctorId}
                    >
                      <option value="">Select Doctor</option>
                      {doctorList.map((docLis) => (
                        <option value={docLis._id} key={docLis._id}>
                          {docLis.dname} - {docLis.dspecialty}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="appoformBox">
                    <label htmlFor="date">Date</label>
                    <input
                      type="date"
                      name="date"
                      className="appoInput"
                      onChange={handleChange}
                      value={appointmentForm.date}
                      required
                    />
                  </div>
                  <div className="appoformBox">
                    <label htmlFor="time">Time</label>
                    <input
                      type="time"
                      name="time"
                      className="appoInput"
                      onChange={handleChange}
                      value={appointmentForm.time}
                      required
                    />
                  </div>
                  <div className="appoformBox">
                    <label htmlFor="reason">Reason</label>
                    <input
                      type="text"
                      name="reason"
                      className="appoInput"
                      placeholder="Reason"
                      onChange={handleChange}
                      value={appointmentForm.reason}
                      required
                    />
                  </div>
                  <button type="submit" className="loginBut">
                    Submit
                  </button>
                </form>
                <p>{noti}</p>
              </div>
            ) : (
              <p></p>
            )}
            {docmobToogle ? (
              <div className="doctorListContainerx">
                <h1>Doctor List</h1>
                <div className="doctorList">
                  {doctorList.map((docLis) => (
                    <div key={docLis._id} className="doctorBox">
                      <p className="docIco">
                        <span className="material-symbols-outlined">
                          frame_person
                        </span>
                      </p>
                      <p>
                        {docLis.dname} ({docLis.dspecialty})
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <p></p>
            )}
          </div>
        </main>
      </div>
    </>
  );
}
