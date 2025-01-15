interface TimeFormat {
  d: number;
  h: number;
  m: number;
  s: number;
}

/**
 * Converts milliseconds into various time formats.
 *
 * @param {number} miliseconds - The number of milliseconds to convert.
 * @param {"s" | "m" | "h" | "d" | undefined} format - The format to convert to:
 *   - "s" for total seconds
 *   - "m" for total minutes
 *   - "h" for total hours
 *   - "d" for total days
 *   - undefined for an object with days, hours, minutes, and seconds
 * @returns {number | TimeFormat} The converted time in the specified format, or an object with days, hours, minutes, and seconds if no format is specified.
 */

export default function convertMiliseconds(
  miliseconds: number,
  format: "s" | "m" | "h" | "d" | undefined
): number | TimeFormat {
  let days, hours, minutes, seconds, total_hours, total_minutes, total_seconds;

  total_seconds = Number(Math.floor(miliseconds / 1000));
  total_minutes = Number(Math.floor(total_seconds / 60));
  total_hours = Number(Math.floor(total_minutes / 60));
  days = Number(Math.floor(total_hours / 24));

  seconds = Number(total_seconds % 60);
  minutes = Number(total_minutes % 60);
  hours = Number(total_hours % 24);

  switch (format) {
    case "s":
      return total_seconds;
    case "m":
      return total_minutes;
    case "h":
      return total_hours;
    case "d":
      return days;
    default:
      return { d: days, h: hours, m: minutes, s: seconds };
  }
}
