import { isValid, isBefore } from "date-fns";

export function sortBy(key: any, order = "asc") {
  return function innerSort(a: any, b: any) {
    if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
      return 0;
    }

    const varA = typeof a[key] === "string" ? a[key].toUpperCase() : a[key];
    const varB = typeof b[key] === "string" ? b[key].toUpperCase() : b[key];

    let comparison = 0;
    if (key.toUpperCase().includes("DATE")) {
      if (isValid(varA) && isValid(varB)) {
        if (isBefore(varB, varA)) {
          comparison = 1;
        } else if (isBefore(varA, varB)) {
          comparison = -1;
        }
      }
    } else {
      if (varA > varB) {
        comparison = 1;
      } else if (varA < varB) {
        comparison = -1;
      }
    }
    return order === "desc" ? comparison * -1 : comparison;
  };
}
