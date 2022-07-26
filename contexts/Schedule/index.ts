import { createContext } from "react";

type ScheduleContextType = {
  scheduleAt: Date | null;
  setScheduleAt: (date: Date | null) => void;
  timeOptionId: number | null;
  setTimeOptionId: (timeOptionId: number | null) => void;
};

export const ScheduleContext = createContext<ScheduleContextType>({
  scheduleAt: null,
  setScheduleAt: () => {},
  timeOptionId: null,
  setTimeOptionId: () => {},
});
