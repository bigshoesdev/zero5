import axios, { AxiosResponse } from "axios";
import config from "./config";

const baseUrl: string = config.apiBaseURL;

export const getEvents = async (
  startDate: string,
  endDate: string,
  searchKey: string
): Promise<AxiosResponse<ApiDataType>> => {
  try {
    const events: AxiosResponse<ApiDataType> = await axios.get(
      baseUrl +
        `/events?startDate=${startDate}&endDate=${endDate}&searchKey=${searchKey}`
    );
    return events;
  } catch (error: any) {
    throw new Error(error);
  }
};
