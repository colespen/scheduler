import { useState, useEffect } from "react";
import axios from 'axios';

// import DayList from "./DayList";
// import Appointment from "components/Appointment";

// import "components/Appointment";
// import "components/Application.scss";

export default function useApplicationData() {

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
      ));
    // .catch(err => console.log(err.message));
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
    };
    return axios.delete(`/api/appointments/${id}`)
      .then(() => setState({ ...state, appointments }));
    // .catch(err => console.log(err.message)); // 
  }

  const stateManager = {
    state,
    setDay,
    bookInterview,
    cancelInterview
  };
  
  return stateManager;
}