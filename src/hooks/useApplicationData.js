import { useState, useEffect } from "react";
import axios from 'axios';

export default function useApplicationData() {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  // console.log("~~~~~ INSIDE useAPP state", state.days);
  // console.log("~~~~~ INSIDE useAPP state.appointments", state.appointments);

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
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    // console.log(" ~~~ bookInterview - appointment: ", appointment);
    // console.log(" ~~~ bookInterview - appointments: ", appointments); 
    
    const days = getSpotsRemaining(appointments); 
    return axios.put(`/api/appointments/${id}`, appointment ) // pass appointment not interview!!
      .then(() => {
        setState(prev => ({ ...prev, appointments, days }))//update state
      });
  }

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    const days = getSpotsRemaining(appointments);
    return axios.delete(`/api/appointments/${id}`)
      .then(() => setState({ ...state, appointments, days }));
  }

  function getSpotsRemaining(appointments) { //pass in new appointments state from bookInterview
   return state.days.map(day => {
      const newDay = {...day} // spread each day in obj to make copy
      let spots = 0;
      newDay.appointments.forEach(id => {
        if (appointments[id].interview === null) {
          spots++;
        } 
      })
      newDay.spots = spots;
      return newDay
    })
  }
  // all days being iterated through
  // then take copy of each newDay.appointments and forEach spot++

  //if edit, add spot, if delete, remove spot (new fn)

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  };
  // return stateManager;
}