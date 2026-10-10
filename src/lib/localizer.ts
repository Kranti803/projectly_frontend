import { format, getDay, parse, startOfWeek } from "date-fns"
import { enUS } from "date-fns/locale/en-US"
import { dateFnsLocalizer } from "react-big-calendar"

const locales = { "en-US": enUS }

export const localizer = dateFnsLocalizer({
  format,
  parse,
  // Weeks start on Monday. Change weekStartsOn to 0 for Sunday.
  startOfWeek: (date: Date) => startOfWeek(date, { weekStartsOn: 1 }),
  getDay,
  locales,
})