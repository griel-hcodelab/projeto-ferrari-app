import { createContext } from "react";

type ScheduleContextType = {
  scheduleAt: Date | null;
  setScheduleAt: (date: Date | null) => void;
  timeOptionId: number | null;
  setTimeOptionId: (timeOptionId: number | null) => void;
  services: any;
  setServices: (services: number[]) => void;
  addService: (serviceId: number) => void;
  removeService: (serviceId: number) => void;
};

export const ScheduleContext = createContext<ScheduleContextType>({
  scheduleAt: null,
  setScheduleAt: () => {},
  timeOptionId: null,
  setTimeOptionId: () => {},
  services: [],
  setServices: () => {},
  addService: () => {},
  removeService: () => {},
});
