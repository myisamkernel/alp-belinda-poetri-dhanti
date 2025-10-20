const dayjs = require("dayjs");
const customParseFormat = require("dayjs/plugin/customParseFormat");
dayjs.extend(customParseFormat);

const checkOutsideWorkingHour = (t1, t2) => {
  const format = "HH:mm";

  const current = dayjs().format(format);
  const currentTime = dayjs(current, format);
  const time1 = dayjs(t1, format);
  const time2 = dayjs(t2, format);

  if (time1.isBefore(time2)) {
    return !(currentTime.isAfter(time1) && currentTime.isBefore(time2));
  }

  if (currentTime.isAfter(time1) || currentTime.isBefore(time2)) {
    return false; // within range
  }

  return true; // outside range
};

module.exports = { checkOutsideWorkingHour };
