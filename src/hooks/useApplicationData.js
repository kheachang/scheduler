import React from "react";
import { useState, useEffect } from "react";
const axios = require("axios");

const useApplicationData = () => {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const setDay = (day) => setState((prev) => ({ ...prev, day }));

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

    console.log("interview", interview);
    console.log("appointments", appointments);

    // make api request to update the state
    return axios.put(`/api/appointments/${id}`, { interview }).then(() => {
      setState({ ...state, appointments });
    });
  }

  function cancelInterview(id) {
    console.log(id);

    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios.delete(`/api/appointments/${id}`).then(() => {
      return setState({ ...state, appointments });
    });
  }

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

  return { state, setDay, bookInterview, cancelInterview };
};

export default useApplicationData;
