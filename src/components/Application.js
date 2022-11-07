import React, { useState, useEffect } from "react";
import axios from 'axios';

import DayList from "./DayList";
import Appointment from "components/Appointment";

import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";

import "components/Appointment";
import "components/Application.scss";


export default function Application(props) {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState({ ...state, day });

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"), //doesn't need http://localhost:8001?
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    ])
      .then(allVals => {
        setState(prev => ({
          ...prev,
          days: allVals[0].data,
          appointments: allVals[1].data,
          interviewers: allVals[2].data
        }));
      })
      .catch(err => console.log(err.message));
  }, []);

  const dailyAppointments = getAppointmentsForDay(state, state.day);

  const dailyInterviews = getInterviewersForDay(state, state.day);
  // console.log(" ~~~~~~~ state", state);

  const schedule = dailyAppointments.map(appointment => {
    const interview = getInterview(state, appointment.interview);
    // console.log(" ~~~~~~ interview = getInterview()", interview);
    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={dailyInterviews}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
      // onEdit={"onEdit"}
      />
    );
  });

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    // console.log(" ~~~ bookInterview - appointment: ", appointment);
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios.put(`/api/appointments/${id}`, { interview }) // does id and interivew body correlate here?
      .then(() => setState(prev => ({ ...prev, appointments })
      ))
      .catch(err => console.log(err.message));
  }
  // console.log(" ~~~ state!!! ", state);

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    }

    return axios.delete(`/api/appointments/${id}`)
    .then(() => setState({ ...state, appointments }))
    .catch(err => console.log(err.message));
  }

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
          <DayList
            days={state.days}
            value={state.day}
            onChange={setDay}
          //3 PROPS passed to DayList!!
          />
        </nav>

        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>

      <section className="schedule">
        {schedule}
        <Appointment time="5pm bye." />
      </section>

    </main>
  );
}
