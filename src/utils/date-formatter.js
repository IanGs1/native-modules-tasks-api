export function dateFormatter(date) {
  if (!(date instanceof Date)) {
    return;
  }

  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  return `${day < 10 ? "0" + day : day}-${month < 10 ? "0" + month : month}-${year}T${hours < 10 ? "0" + hours : hours}:${minutes < 10 ? "0" + minutes : minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
}