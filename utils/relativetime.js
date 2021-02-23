const toReadableTime = (date) => {
  // Make a fuzzy time
  const delta = Math.round((+new Date() - date) / 1000);

  const minute = 60,
    hour = minute * 60,
    day = hour * 24,
    week = day * 7,
    month = week * 4,
    year = month * 12;

  if (delta < 30) {
    return 'just now.';
  } else if (delta < minute) {
    return delta + ' seconds ago.';
  } else if (delta < 2 * minute) {
    return 'a minute ago.';
  } else if (delta < hour) {
    return Math.floor(delta / minute) + ' minutes ago.';
  } else if (Math.floor(delta / hour) == 1) {
    return 'an hour ago.';
  } else if (delta < day) {
    return Math.floor(delta / hour) + ' hours ago.';
  } else if (delta < day * 2) {
    return 'yesterday';
  } else if (delta < week) {
    return Math.floor(delta / day) + ' days ago.';
  } else if (Math.floor(delta / week) == 1) {
    return 'a week ago.';
  } else if (delta < month) {
    return Math.floor(delta / week) + ' weeks ago.';
  } else if (Math.floor(delta / month) == 1) {
    return 'a week ago.';
  } else
    return Math.floor(delta / year) + ' years ago.';
};

export default toReadableTime;
