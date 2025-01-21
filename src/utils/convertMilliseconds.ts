type TimeFormat = {
  d: number;
  h: number;
  m: number;
  s: number;
};

/**
 * Converts milliseconds into various time formats.
 *
 * @param {number} milliseconds - The number of milliseconds to convert.
 * @param {"s" | "m" | "h" | "d"} [format] - The optional format to convert to:
 *   - "s" for total seconds
 *   - "m" for total minutes
 *   - "h" for total hours
 *   - "d" for total days
 *   - If not provided, defaults to an object with days, hours, minutes, and seconds.
 * @returns {number | TimeFormat} The converted time in the specified format, or an object with days, hours, minutes, and seconds if no format is specified.
 */

export default function convertMilliseconds(
  milliseconds: number,
  format?: "s" | "m" | "h" | "d" | undefined
): number | TimeFormat {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const totalMinutes = Math.floor(totalSeconds / 60);
  const totalHours = Math.floor(totalMinutes / 60);
  const days = Math.floor(totalHours / 24);

  const seconds = totalSeconds % 60;
  const minutes = totalMinutes % 60;
  const hours = totalHours % 24;

  switch (format) {
    case "s":
      return totalSeconds;
    case "m":
      return totalMinutes;
    case "h":
      return totalHours;
    case "d":
      return days;
    default:
      return { d: days, h: hours, m: minutes, s: seconds };
  }
}
