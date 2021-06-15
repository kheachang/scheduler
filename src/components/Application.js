import React, { useEffect } from "react";
import DayList from "components/DayList";
import Appointment from "components/Appointments";
import { useState } from "react";
import "components/Application.scss";
import {
  getAppointmentsForDay,
  getInterview,
  getInterviewersForDay,
} from "helpers/selectors";
const axios = require("axios");

export default function Application() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  // change local state when we book interviews
  function bookInterview(id, interview) {
    console.log(id, interview);

    // add new interview into appointment id
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    // add it into appointments
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    console.log("interview", interview)
    console.log("appointments", appointments)

    // make api request to update the state
    return axios.put(`/api/appointments/${id}`, {interview}).then(() => {setState({...state, appointments})})
    
  };

  function cancelInterview(id) {
    console.log(id)

    const appointment = {
      ...state.appointments[id],
      interview: null
    }
    const appointments = {
      ...state.appointments,
      [id]: appointment
    }

     return axios.delete(`/api/appointments/${id}`).then(() => {
       return setState({...state, appointments})
     })

  }
const setDay = (day) => setState((prev) => ({ ...prev, day }));
const dailyAppointments = getAppointmentsForDay(state, state.day);
const schedule = dailyAppointments.map((appointment) => {
  const interview = getInterview(state, appointment.interview);
  const interviewers = getInterviewersForDay(state, state.day);
  return (
    <>
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={interviewers}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
      />
    </>
  );
});

useEffect(() => {
  Promise.all([
    axios.get("/api/days"),
    axios.get("/api/appointments"),
    axios.get("api/interviewers"),
  ]).then((res) => {
    // console.log(res.data)
    setState((prev) => ({
      ...prev,
      days: res[0].data,
      appointments: res[1].data,
      interviewers: res[2].data,
    }));
  });
}, []);

return (
  <main className="layout">
    <section className="sidebar">
      <img
        className="sidebar--centered"
        src="images/logo.png"
        alt="Interview Scheduler"
      />
      <hr className="sidebar__separator sidebar--centered" />
      <nav className="sidebar__menu">
        <DayList days={state.days} day={state.day} setDay={setDay} />
      </nav>
      <img
        className="sidebar__lhl sidebar--centered"
        src="images/lhl.png"
        alt="Lighthouse Labs"
      />
    </section>
    <section className="schedule">{schedule}      
    <Appointment key="last" time="5pm" 
/>
</section>
  </main>
)}
