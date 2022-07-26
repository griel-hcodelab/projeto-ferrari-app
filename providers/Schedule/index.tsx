import { ReactNode, useState } from "react";
import { ScheduleContext } from "../../contexts/Schedule";

type ScheduleProviderProps = {
  children: ReactNode;
};

export const ScheduleProvider = ({ children }: ScheduleProviderProps) => {
  const [scheduleAt, setScheduleAt] = useState<Date | null>(new Date());
  const [timeOptionId, setTimeOptionId] = useState<number | null>(null);

  return (
    <ScheduleContext.Provider
      value={{ scheduleAt, setScheduleAt, timeOptionId, setTimeOptionId }}
    >
      {children}
    </ScheduleContext.Provider>
  );
};
