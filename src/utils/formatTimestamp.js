function formatTimestamp(timestamp) {
  const date = new Date(timestamp);

  // Get day, month, and year
  const day = date.getDate();
  const month = date.getMonth() + 1; // Months are zero-indexed
  const year = date.getFullYear();

  // Get hours and minutes
  let hours = date.getHours();
  const minutes = date.getMinutes();

  // Determine AM/PM
  const amOrPm = hours >= 12 ? "PM" : "AM";

  // Convert hours to 12-hour format
  if (hours > 12) {
    hours -= 12;
  }

  // Pad single-digit day, month, hours, and minutes with leading zeros
  const formattedDay = String(day).padStart(2, "0");
  const formattedMonth = String(month).padStart(2, "0");
  const formattedHours = String(hours).padStart(2, "0");
  const formattedMinutes = String(minutes).padStart(2, "0");

  // Construct the formatted date and time string
  const formattedDate = `${formattedDay}/${formattedMonth}/${year}`;
  const formattedTime = `${formattedHours}:${formattedMinutes} ${amOrPm}`;

  return [ formattedDate, formattedTime ];
}

export default formatTimestamp;