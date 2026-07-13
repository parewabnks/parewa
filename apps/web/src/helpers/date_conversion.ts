export function convertToUTC(datestring: string): string {

  const [year, month, day] = datestring.split("-").map(Number);
  const utcDate = new Date(Date.UTC(year, month - 1, day, 0, 0, 0));

  utcDate.setUTCMinutes(utcDate.getUTCMinutes() - (5 * 60 + 45));
  return utcDate.toISOString();
}

export function convertToNPT(datestring: string): string {

  const [year, month, day] = datestring.split("-").map(Number);
  const nptDate = new Date(Date.UTC(year, month - 1, day, 0, 0, 0));

  nptDate.setUTCMinutes(nptDate.getUTCMinutes() + (5 * 60 + 45));
  return nptDate.toISOString();
}