import { useReducer, useEffect } from "react";
import axios from 'axios';

import reducer, {
  SET_DAY,
  SET_APPLICATION_DATA,
  SET_INTERVIEW
} from "reducers/application";

import getCurrentWeekday from "helpers/getCurrentWeekday";
const currentDay = getCurrentWeekday()


export default function useApplicationData() {

  const initialState = {             // use inital state
    day: currentDay,
    days: [],
    appointments: {},
    interviewers: {}
  };

  const [state, dispatch] = useReducer(reducer, initialState);  //get state from reducer

  const setDay = day => dispatch({ type: SET_DAY, day });     // use dispatch

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    ])
      .then(allVals => {
        dispatch({                     // use dispatch
          type: SET_APPLICATION_DATA,
          days: allVals[0].data,
          appointments: allVals[1].data,
          interviewers: allVals[2].data
        });
      })
      .catch(err => console.log(err.message));

    webSocketConnection(); // realtime WebSocket update!

  }, []); //    empty dependency array prevents infinite loop.


  function bookInterview(id, interview) {
    return axios.put(`/api/appointments/${id}`, { interview })
      .then(() => {
        dispatch({ type: SET_INTERVIEW, id, interview });
      });
  }

  function cancelInterview(id) {
    return axios.delete(`/api/appointments/${id}`)
      .then(() => {
        dispatch({ type: SET_INTERVIEW, id, interview: null }); //update appointments & spots
      });
  }

  const webSocketConnection = () => {
    const url = process.env.REACT_APP_WEBSOCKET_URL;
    const ws = new WebSocket(url);

    ws.addEventListener('message', event => {

      // extract keys from parsed str then dispatch if correct type
      const { type, id, interview } = JSON.parse(event.data);

      if (type === 'SET_INTERVIEW') {
        dispatch({ type, id, interview });
      }
    });
    return () => ws.close();
  };

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  };

}