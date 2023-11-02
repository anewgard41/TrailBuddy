module.exports = {
  // Format a given date as MM/DD/YYYY
  format_date: (date) => {
    return date.toLocaleDateString();
  },

  // Format a given date as HH:MM:SS
  format_time: (date) => {
    // Format the time component of a date in HH:MM:SS format
    return date.toLocaleTimeString();
  },
};