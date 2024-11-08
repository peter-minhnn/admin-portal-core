import clsx from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...args: any[]) {
  return twMerge(clsx(args));
}

export const append = (params: any) => {
  let objParams = {};
  for (const key of Object.keys(params)) {
    const element = params[key];
    if (
      (!element && typeof element !== "number") ||
      (typeof element === "number" && element < 0)
    )
      continue;
    objParams = { ...objParams, [key]: element };
  }
  return objParams;
};

export const createQueryParams = (params: Record<string, string | number>) => {
  const appendParams = append(params);
  const urlParams = new URLSearchParams(
    Object.entries(appendParams) as string[][],
  ).toString();
  return `${urlParams ? "?" + urlParams : ""}`;
};

export const generateUniqueId = (prefix: string = "") => {
  const uniquePart =
    Date.now().toString(36) + Math.random().toString(36).substring(2);
  return String(prefix + uniquePart).toLocaleUpperCase();
};

export const getMaxId = (rows: any[], key: string) => {
  const numericIds = rows
    .filter((item) => !isNaN(item[key]))
    .map((item) => Number(item[key]));
  return numericIds.length > 0 ? Math.max(...numericIds) : 0;
};

export const removeDuplicates = (array: any[], key: string) => {
  if (!array) return [];
  return array.filter(
    (item, index, self) =>
      index === self.findIndex((t) => t[key] === item[key]),
  );
};

export const urlPattern = new RegExp(
  "^(https?:\\/\\/)?" + // http 또는 https
    "((([a-zA-Z\\d]([a-zA-Z\\d-]*[a-zA-Z\\d])*)\\.)+[a-zA-Z]{2,}|" + // 도메인 이름
    "((\\d{1,3}\\.){3}\\d{1,3}))" + // 또는 IP 주소
    "(\\:\\d+)?(\\/[-a-zA-Z\\d%_.~+]*)*" + // 포트 및 경로
    "(\\?[;&a-zA-Z\\d%_.~+=-]*)?" + // 쿼리 문자열
    "(\\#[-a-zA-Z\\d_]*)?$",
  "i",
);

export const sanitizeUrl = (url: string): string => {
  if (!urlPattern.test(url)) {
    return url;
  }

  try {
    const urlObj = new URL(url);
    const sanitizedSearchParams = new URLSearchParams();

    urlObj.searchParams.forEach((value, key) => {
      const sanitizedValue = value.replace(/[^\w-~:/?#[\]@!$&'()*+,;=%]/g, "");
      sanitizedSearchParams.append(key, sanitizedValue);
    });

    urlObj.search = sanitizedSearchParams.toString();
    return urlObj.toString();
  } catch {
    return url;
  }
};

/**
 * Compare two objects for deep equality
 * @param obj1 - The first object to compare
 * @param obj2 - The second object to compare
 * @returns True if the objects are equal, false otherwise
 */
export const deepCompareObjEqual = (obj1: any, obj2: any): boolean => {
  if (obj1 === obj2) {
    return true;
  }

  if (
    typeof obj1 !== "object" ||
    obj1 === null ||
    typeof obj2 !== "object" ||
    obj2 === null
  ) {
    return false;
  }

  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (const key of keys1) {
    if (!keys2.includes(key) || !deepCompareObjEqual(obj1[key], obj2[key])) {
      return false;
    }
  }

  return true;
};

export const isMobileDevice = () => {
  return /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
};

export const buildQueryString = (obj: any) => {
  return Object.keys(obj)
    .filter((key) => !["", undefined, null].includes(obj[key]))
    .map(
      (key: string) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`,
    )
    .join("&");
};

const sanitizeInput = (input: any): any => {
  const sanitizeString = (str: string): string => {
    return str.replace(/[{}[\]"]/g, "");
  };

  if (typeof input === "string") {
    return sanitizeString(input);
  } else if (typeof input === "object" && input !== null) {
    const sanitizedObj: any = {};
    for (const key in input) {
      if (input.hasOwnProperty(key)) {
        sanitizedObj[key] = sanitizeInput(input[key]);
      }
    }
    return sanitizedObj;
  }
  return input;
};

export const convertSanitizedInputJson = <T>(input: T | string): any => {
  const sanitizedInput = sanitizeInput(input);
  try {
    return JSON.stringify(sanitizedInput);
  } catch (error) {
    console.error("Invalid JSON input:", error);
    return null;
  }
};

export const parseSanitizedInput = (input: string): any => {
  const sanitizedInput = sanitizeInput(input);
  try {
    return JSON.parse(JSON.stringify(sanitizedInput));
  } catch (error) {
    console.error("Invalid JSON input:", error);
    return null;
  }
};

export const formatNumber = (
  value: number | string,
  locale: string = "en-US",
  options?: Intl.NumberFormatOptions,
): string => {
  return new Intl.NumberFormat(locale, options).format(Number(value));
};

export const formatCurrency = (
  value: number | string,
  locale: string = "en-US",
  currency: string = "USD",
): string => {
  return new Intl.NumberFormat(locale, { style: "currency", currency }).format(
    Number(value),
  );
};
