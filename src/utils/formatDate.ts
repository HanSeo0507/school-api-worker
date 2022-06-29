import { fillZero } from "./fillZero";

export const formatDate = (_date: Date | string, usingAPI?: boolean) => {
  const newDate = new Date(_date);
  const [year, month, date] = [
    newDate.getFullYear(),
    newDate.getMonth() + 1,
    newDate.getDate(),
  ];

  if (usingAPI) return `${year}${fillZero(month)}${fillZero(date)}`;
  return `${year}-${fillZero(month)}-${fillZero(date)}`;
};
