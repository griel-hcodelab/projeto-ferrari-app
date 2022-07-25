import { useContext } from "react";
import { ScheduleContext } from "../contexts/Schedule";

export const useSchedule = () => {
  const context = useContext(ScheduleContext);

  return context;
};
