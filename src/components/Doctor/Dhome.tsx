import axios from "axios";
import { useEffect, useState } from "react";
import "../../style/Doctor/Home.css";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

type User = {
  _id: string;
  name: string;
  phonenumber: string;
};
type Doctor = {
  _id: string;
  dname: string;
};

type Dcotorappo = {
  _id: string;
  doctorId: Doctor;
  userId: User;
  date: string;
  time: string;
  reason: string;
  status: string;
};

export default function Dhome() {
  const token = localStorage.getItem("token");
  const doctor = JSON.parse(localStorage.getItem("doctor") || "null");

  const [dcotorAppointmentList, setdcotorAppointmentList] = useState<
    Dcotorappo[]
  >([]);
  const [appoFilter, setAppoFilter] = useState("All");
  const [appocanMess, setAppocanMess] = useState("");
  const navi = useNavigate();
  const [noti, setNoti] = useState("");

  const getappoList = () => {
    axios
      .get("https://congenial-succotash-93s5.onrender.com/doctorappointement", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setdcotorAppointmentList(res.data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    if (!token) {
      navi("/dlogin");
      return;
    }

    let decode;

    try {
      decode = jwtDecode(token);
    } catch (error) {
      console.log("Invalid token");
      localStorage.removeItem("token");
      navi("/dlogin");
      return;
    }

    if (!decode.exp) {
      localStorage.removeItem("token");
      navi("/dlogin");
      return;
    }

    const currentTime = Date.now() / 1000;

    if (decode.exp < currentTime) {
      localStorage.removeItem("token");
      navi("/dlogin");
      return;
    }

    getappoList();

    const interval = setInterval(getappoList, 60000);

    return () => clearInterval(interval);
  }, [token]);

  const filterFun = dcotorAppointmentList.filter((dappo) => {
    if (appoFilter === "All") {
      return true;
    }

    return dappo.status === appoFilter;
  });

  const cancleAppointment = async (id: any) => {
    try {
      const res = await axios.patch(
        `https://congenial-succotash-93s5.onrender.com/appointmentdoccancele/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const data = res.data;
      setAppocanMess(data.message);
      getappoList();
    } catch (error: any) {
      console.log(error);
      setAppocanMess(
        error.response?.data?.message || "Error cancelling appointment",
      );
    }
  };

  const booked = dcotorAppointmentList.filter(
    (d) => d.status === "Booked",
  ).length;

  const cancel = dcotorAppointmentList.filter(
    (d) => d.status === "Cancelled",
  ).length;

  const complete = dcotorAppointmentList.filter(
    (d) => d.status === "Completed",
  ).length;

  const appoComplete = async (id: any) => {
    try {
      const res = await axios.patch(
        `https://congenial-succotash-93s5.onrender.com/doctorappocomplete/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const data = res.data;
      setNoti(data.message);
      getappoList();
    } catch (error: any) {
      setNoti(
        error?.response?.data?.message || "Error Completing Appointments",
      );
    }
  };
  return (
    <>
      <div>
        <header className="homeHeader">
          <p>
            <span className="material-symbols-outlined">cardiology</span>
          </p>
          <p>{doctor.doctorName}</p>
        </header>
        <main className="doctorHome">
          <p>{noti}</p>
          <div className="doctorFirstContainer">
            <p className="totalp">
              Total Appointment: {dcotorAppointmentList.length}
            </p>
            <p className="totalp">Total Booked: {booked}</p>
            <p className="totalp">Total Cancelled: {cancel}</p>
            <p className="totalp">Total Completed: {complete}</p>
          </div>
          <div className="doctorxBox">
            <h1>Appointments</h1>
            <select
              className="filterSelect"
              onChange={(e) => setAppoFilter(e.target.value)}
              value={appoFilter}
            >
              <option value="All">All</option>
              <option value="Booked">Booked</option>
              <option value="Cancelled">Cancelled</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
          <div className="appointementList">
            {filterFun.map((dappo) => {
              const isCancle =
                dappo.status === "Cancelled" || dappo.status === "Completed";
              const idb = dappo.status === "Booked";
              return (
                <div key={dappo._id} className="appointementBox">
                  <p className="appointementreason">Reason: {dappo.reason}</p>
                  <p>Patient Name: {dappo.userId?.name}</p>
                  <p>Patient Phone Number: {dappo.userId?.phonenumber}</p>
                  <p>Date: {dappo.date}</p>
                  <p>Time: {dappo.time}</p>
                  <p>Status: {dappo.status}</p>
                  <div className="appointmentminBox">
                    {isCancle ? (
                      <p></p>
                    ) : (
                      <button
                        onClick={() => cancleAppointment(dappo._id)}
                        className="dcancleAppoBut"
                      >
                        Cancele Appointement
                      </button>
                    )}

                    {idb ? (
                      <button
                        className="rescheduleBut"
                        onClick={() => appoComplete(dappo._id)}
                      >
                        Complete Appointment
                      </button>
                    ) : (
                      ""
                    )}
                  </div>
                  <p>{appocanMess}</p>
                </div>
              );
            })}
          </div>
        </main>
      </div>
    </>
  );
}
