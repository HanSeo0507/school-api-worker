import { fillZero } from "./fillZero";

export const formatDate = (date: Date | string, usingAPI?: boolean) => {
	const newDate = new Date(date);
	const [year, month, _date] = [newDate.getFullYear(), newDate.getMonth() + 1, newDate.getDate()];

	if (usingAPI) return `${year}${fillZero(month)}${fillZero(_date)}`;
	return `${year}-${fillZero(month)}-${fillZero(_date)}`;
};
