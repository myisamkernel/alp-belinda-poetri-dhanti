const dayjs = require("dayjs");

const checkOutsideWorkingHour = (t1, t2) => {
  const format = "HH:mm";

  const current = dayjs().format(format);

  const currentTime = dayjs(current, format);
  const time1 = dayjs(t1, format);
  const time2 = dayjs(t2, format);

  if (currentTime.isBefore(time1)) {
    return true;
  } else if (currentTime.isAfter(time2)) {
    return true;
  } else {
    return false;
  }
};

module.exports = { checkOutsideWorkingHour };
