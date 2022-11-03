import React, { useState, useEffect } from "react";
import axios from 'axios';

import DayList from "./DayList";
import Appointment from "components/Appointment";

import { getAppointmentsForDay } from "helpers/selectors";

import "components/Appointment";
import "components/Application.scss";


export default function Application(props) {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  })

  const dailyAppointments = [];
  dailyAppointments.push(getAppointmentsForDay(state, state.day));
  
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
      }))
    })
    .catch(err => console.log(err.message))
  }, [])
 
  const appointmentList = dailyAppointments[0].map(apps => (
    <Appointment key={apps.id} {...apps} />
    ));

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
        {appointmentList}
        
      </section>

    </main>
  );
}
