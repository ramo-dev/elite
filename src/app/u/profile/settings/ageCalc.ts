export function calculateAge(createdDate) {
  // Parse the created date string into a Date object
  const created = new Date(createdDate);

  // Get the current date
  const now = new Date();

  // Calculate the difference in years, months, and days
  let years = now.getFullYear() - created.getFullYear();
  let months = now.getMonth() - created.getMonth();
  let days = now.getDate() - created.getDate();

  // Adjust if the day difference is negative
  if (days < 0) {
    months--;
    // Calculate the previous month's last day
    const lastMonth = new Date(now.getFullYear(), now.getMonth(), 0);
    days += lastMonth.getDate();
  }

  // Adjust if the month difference is negative
  if (months < 0) {
    years--;
    months += 12;
  }

  return {
    years: years,
    months: months,
    days: days
  };
}
