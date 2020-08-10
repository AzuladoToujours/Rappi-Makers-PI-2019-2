const moment = require('moment');
const InvalidDatesError = require('../errors/invalid-dates-error');

exports.checkDates = (req, res, next) => {
  let checkStart = checkStartAtValidDate(req.body.start_at);
  let invalidDates = new InvalidDatesError();

  let checkVacancyDuration = checkTimeBetweenStartAndEnd(
    req.body.start_at,
    req.body.end_at
  );

  if (!checkStart) {
    return invalidDates.startDateErrorResponse(res);
  } else if (!checkVacancyDuration) {
    return invalidDates.durationErrorResponse(res);
  } else if (checkStart && checkVacancyDuration) {
    next();
  }
};

checkStartAtValidDate = (startAtDate) => {
  let actualMoment = moment().format();
  let date = moment(moment(startAtDate).format());
  let difference = moment.duration(date.diff(actualMoment)).asHours();
  if (8 > difference) {
    return false;
  }
  return true;
};

checkTimeBetweenStartAndEnd = (startAtDate, endAtDate) => {
  let startAt = moment(moment(startAtDate).format());
  let endAt = moment(moment(endAtDate).format());

  var vancancyDuration = moment.duration(endAt.diff(startAt)).asHours();

  if (vancancyDuration < 1) {
    return false;
  }
  return true;
};
