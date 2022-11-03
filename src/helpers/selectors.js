//state parameter is the json from API

export function getAppointmentsForDay(state, day) {

  if (!Array.isArray(state.days)) return [];
  if (state.days === undefined) return [];
  if (state.days.length === 0) return [];

  const filteredAppointments = state.days.filter(d => d.name === day);
  if (filteredAppointments.length === 0) return [];

  const appointmentArray = filteredAppointments[0].appointments;

  return appointmentArray.map(id => {
   return state.appointments[id]; // return the obj's with current element #!!!
  });

}