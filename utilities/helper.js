module.exports = {
    // Helper function to format a date as MM/DD/YYYY
    format_date: (date) => {
      return date.toLocaleDateString();
    },
    // Helper function to format a time with commas for large numbers
    format_time: (date) => {
      return date.toLocaleTimeString();
    },
    // Helper function to format the current local date as MM/DD/YYYY
    format_local_date: () => {
      const now = new Date();
      return now.toLocaleDateString();
    },
    // Helper function to format the current local time with commas for large numbers
    format_local_time: () => {
      const now = new Date();
      return now.toLocaleTimeString();
    },
  };
