# Hospital Appointment System

A full-stack **Hospital Appointment Management System** built using the **MERN Stack**.

This project provides separate portals for patients and doctors. Patients can find doctors, select available appointment slots, submit appointment details, and track appointment status. Doctors can manage their daily appointments, accept or cancel requests, reschedule appointments, and update consultation status.

---

## Live Demo

Visit the live website here:

[Patient Portal](https://hospitalappointnnent.netlify.app/)
[Doctor Portal](https://hospitalappointnnent.netlify.app/dlogin)

## Features

### Patient Portal

- Patient registration and login
- Secure authentication using JWT
- View all available doctors
- Filter doctors by specialization
- View doctor details
- Select appointment date and available time slot
- Enter symptoms, reason for visit, and contact details
- Book an appointment
- View upcoming appointments
- View appointment history
- Check appointment status
- Cancel appointment requests
- View rescheduled appointment details
- Update patient profile

### Doctor Portal

- Doctor registration and login
- Secure doctor dashboard
- View today's appointments
- View upcoming appointments
- View patient appointment details
- Accept pending appointment requests
- Cancel appointments with a reason
- Reschedule appointment date and time
- Update appointment status
- Mark appointment as completed
- Mark patient as no-show
- Manage doctor availability
- Update doctor profile details

---

## Appointment Status

| Status | Description |
| --- | --- |
| `Pending` | Appointment request is waiting for doctor approval. |
| `Accepted` | Doctor has accepted the appointment. |
| `Cancelled` | Appointment has been cancelled by the doctor or patient. |
| `Rescheduled` | Doctor has changed the appointment date or time. |
| `Completed` | Doctor has completed the patient consultation. |
| `No Show` | Patient did not attend the appointment. |

---

## User Roles

### Patient

Patients can:

- Create an account
- Login securely
- Search for doctors
- Select appointment date and time
- Book appointments
- View appointment status
- Cancel appointments
- Update profile information

### Doctor

Doctors can:

- Login to the doctor portal
- View daily appointments
- Accept or reject appointment requests
- Cancel appointments
- Reschedule appointments
- Update appointment status
- View patient details
- Manage available appointment slots
- Update doctor profile

### Admin *(Future Feature)*

Admins can:

- Manage doctors
- Manage patients
- View all appointments
- Add doctor specializations
- Monitor appointment activity
- Generate reports
- Manage hospital settings

---

## Technology Stack

### Frontend

- React.js
- React Router DOM
- Fetch
- Rest API
- CSS

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Token (JWT)
- bcrypt.js
- dotenv

---

## Project Structure

```bash
hospital-appointment-system/
│
├── client/
│   ├── public/
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── layouts/
│       ├── context/
│       ├── services/
│       ├── utils/
│       ├── App.jsx
│       └── main.jsx
│
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── uploads/
│   ├── server.js
│   └── .env
│
├── README.md
└── package.json

```

---


## Author

**Abhishek**  
MERN Stack Developer

---

## License

This project is created for learning and portfolio purposes.
