export const convertTimestamp = timestamp => {
  let date = new Date(timestamp * 1000)
  let convertedDate = `${date.getDate()} ${date.getMonth()} ${date.getFullYear()}
     at ${date.getHours()}:${date.getMinutes()} `
  return convertedDate
}