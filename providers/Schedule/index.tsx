import { ReactNode, useState } from "react";
import { ScheduleContext } from "../../contexts/Schedule";

type ScheduleProviderProps = {
  children: ReactNode;
};

export const ScheduleProvider = ({ children }: ScheduleProviderProps) => {
  const [scheduledAt, setScheduleAt] = useState<Date | null>(new Date());

  return (
    <ScheduleContext.Provider value={{ scheduledAt, setScheduleAt }}>
      {children}
    </ScheduleContext.Provider>
  );
};
