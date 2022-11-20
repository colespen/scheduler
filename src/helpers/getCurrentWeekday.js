const dayjs = require('dayjs');

const getCurrWeekday = () => {
  const rightNow = dayjs().format('dddd');

  if (rightNow !== "Saturday" && rightNow !== "Sunday") {
    return rightNow;;
  }
  return "Monday";
};
export default getCurrWeekday
