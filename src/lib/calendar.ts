const shortMonthFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
})

export const monthFormatter = new Intl.DateTimeFormat("en-US", {
  month: "long",
  year: "numeric",
})

export function addMonths(date: Date, offset: number) {
  return new Date(date.getFullYear(), date.getMonth() + offset, 1)
}

export function isSameDay(left: Date | null, right: Date) {
  return (
    Boolean(left) &&
    left?.getFullYear() === right.getFullYear() &&
    left.getMonth() === right.getMonth() &&
    left.getDate() === right.getDate()
  )
}

export function formatDateValue(date: Date | null) {
  if (!date) return null
  return `${date.getDate()} ${shortMonthFormatter.format(date)} ${date.getFullYear()}`
}

export function getCalendarDates(month: Date) {
  const firstDay = new Date(month.getFullYear(), month.getMonth(), 1)
  const gridStart = new Date(firstDay)
  gridStart.setDate(firstDay.getDate() - firstDay.getDay())

  return Array.from({ length: 42 }, (_, index) => {
    const date = new Date(gridStart)
    date.setDate(gridStart.getDate() + index)
    return date
  })
}
