import React, { useEffect } from "react";
import DayList from "components/DayList";
import Appointment from "components/Appointments";
import { useState } from "react";
import "components/Application.scss";
import { getAppointmentsForDay } from "helpers/selectors";
const axios = require("axios");

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const setDay = (day) => setState((prev) => ({ ...prev, day }));
  const dailyAppointments = getAppointmentsForDay(state, state.day)
  

  useEffect(() => {Promise.all([
    axios.get("/api/days"),
    axios.get("/api/appointments"),
    axios.get("api/interviewers"),
  ]).then(res => {
      // console.log(res.data)
      setState(prev => ({
        ...prev,
        days: res[0].data,
        appointments: res[1].data,
        interviewers: res[2].data,
      }))
    });
  })

  const mappedAppointments = dailyAppointments.map((appointment) => {
    return (
      <>
        <Appointment key={appointment.id} {...appointment} />
        <Appointment key="last" time="5pm" />
      </>
    );
  });

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
      <section className="schedule">{mappedAppointments}</section>
    </main>
  )};