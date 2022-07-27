import { useContext } from "react";
import { ScheduleServicePanelContext } from "../contexts/ScheduleServicePanel";

export const usePanel = () => {
  const context = useContext(ScheduleServicePanelContext);

  return context;
};
