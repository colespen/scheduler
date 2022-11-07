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
      axios.get("/api/days"), //doesn't need http://localhost?
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
    // console.log(" ~~~~~~ getInterview", interview);
    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={dailyInterviews}
        bookInterview={bookInterview}
        // onEdit={"onEdit"}
        // onDelete={"onDelete"}
      />
    );
  });

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: {...interview}
    }
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    setState({ ...state, appointments }); //not showing locally in console yet
    // console.log(state);
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
