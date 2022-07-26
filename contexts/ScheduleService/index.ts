import { createContext } from "react";
import { Service } from "../../types/Service";

type ScheduleServiceContextType = {
  services: Service[];
};

export const ScheduleServiceContext = createContext<ScheduleServiceContextType>(
  {
    services: [],
  }
);
