import { createContext } from "react";

type ScheduleContextType = {
  scheduleAt: Date | null;
  setScheduleAt: (date: Date | null) => void;
};

export const ScheduleContext = createContext<ScheduleContextType>({
  scheduleAt: null,
  setScheduleAt: () => {},
});
