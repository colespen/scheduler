////    REDUCER fn for useApplicationData custom hook.

export const SET_DAY = "SET_DAY";
export const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
export const SET_INTERVIEW = "SET_INTERVIEW";

//USE SWITCH
const reducer = (state, action) => {
  switch (action.type) {
    case SET_DAY:
      return {
        ...state,
        day: action.day
      };
    case SET_APPLICATION_DATA:
      return {
        ...state,
        days: action.days,
        appointments: action.appointments,
        interviewers: action.interviewers
      };

    ////    Implement the spots remaining functionality inside SET_INTERVIEW
    case SET_INTERVIEW:
      const updateSpots = (days, appointments) => {
        // Find day in days array equal to state
        const currDay = days.find(day => day.name === state.day);

        // Get all app. id's
        const appointIDs = currDay.appointments;

        // Get number of appointments where interview is null
        const noInterviews = appointIDs.filter((id) => !appointments[id].interview);

        // Determine number of spots
        const spotsAvailable = noInterviews.length;

        // Update day without altering the original obj
        const updatedDay = { ...currDay, spots: spotsAvailable };

        // Find index to update the days array
        const currDayIndex = days.findIndex(day => day.name === state.day);

        const updatedDays = [...days];

        // Update days array
        updatedDays[currDayIndex] = updatedDay;

        return updatedDays;
      };

      const appointment = {
        ...state.appointments[action.id],
        interview: action.interview ? { ...action.interview } : null
      };

      const appointments = {
        ...state.appointments,
        [action.id]: appointment
      };

      return {
        ...state,
        days: updateSpots(state.days, appointments),
        appointments
      };

    default:
      throw new Error(
        `Connot reduce. Unsupported action type: ${action.type}`
      );
  }
};

export default reducer;