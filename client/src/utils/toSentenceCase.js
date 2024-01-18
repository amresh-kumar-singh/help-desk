export default function (str = "") {
  const arrOfStr = str.split(/(?=[A-Z])/);
  return (
    arrOfStr[0]?.[0]?.toUpperCase() +
    arrOfStr[0].slice(1) +
    " " +
    arrOfStr
      .slice(1)
      .map((item) => (item || "").toLocaleLowerCase())
      .join(" ")
  );
}
