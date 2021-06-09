import React, {userEffect} from "react";
import DayList from 'components/DayList';
import DaylistItem from 'components/DayListItem';
import Appointment from "components/Appointments";
import { useState } from 'react';
import "components/Application.scss";
const axios = require('axios');


const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 3,
    time: "2pm",
    interview: {
      student: "Khea Chang",
      interviewer: {
        id: 2,
        name: "Tori Malcolm",
        avatar: "https://i.imgur.com/Nmx0Qxo.png"
      }
    }
  },
  {
    id: 4,
    time: "11am",
    interview: {
      student: "Bob Ross",
      interviewer: {
        id: 3,
        name: "Mildred Nazir",
        avatar: "https://i.imgur.com/T2WwVfS.png"
      }
    }
  },
  {
    id: 5,
    time: "11am",
    interview: {
      student: "Lily James",
      interviewer: {
        id: 2,
        name: "Tori Malcolm",
        avatar: "https://i.imgur.com/Nmx0Qxo.png"
      }
    }
  }
];

export default function Application(props) {

  const [day, setDay] = useState([]);

  const mappedAppointments = appointments.map(appointment => {
    return (
      <>
      <Appointment 
        key={appointment.id}
       {...appointment}
      />
      <Appointment key="last" time="5pm" />
      </>
    )
  }
    )

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

        <DayList days={days} day={day} setDay={setDay} /> /* props*/ 
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {mappedAppointments}
        
      </section>
    </main>
  );
}

