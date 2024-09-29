import dayjs from "dayjs";
export const getDateTimeFormat = (dateTime: string) => {
  return dayjs(dateTime).format(" MM DD,YYYY hh:mm A");
};
