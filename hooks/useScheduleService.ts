import { useContext } from "react";
import { ScheduleServiceContext } from "../contexts/ScheduleService";

export const useScheduleService = () => {
  const context = useContext(ScheduleServiceContext);

  return context;
};
