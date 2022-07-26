import { ReactNode, useCallback, useState } from "react";
import { ScheduleContext } from "../../contexts/Schedule";

type ScheduleProviderProps = {
  children: ReactNode;
};

export const ScheduleProvider = ({ children }: ScheduleProviderProps) => {
  const [scheduleAt, setScheduleAt] = useState<Date | null>(new Date());
  const [timeOptionId, setTimeOptionId] = useState<number | null>(null);
  const [services, setServices] = useState<number[]>([]);

  const addService = useCallback(
    (serviceId: number) => {
      const service = services.find((id) => id === serviceId);
      if (!service) {
        setServices([...services, serviceId]);
      }
    },
    [services]
  );
  const removeService = useCallback(
    (serviceId: number) => {
      setServices([...services.filter((id) => id !== serviceId)]);
    },
    [services]
  );

  return (
    <ScheduleContext.Provider
      value={{
        scheduleAt,
        setScheduleAt,
        timeOptionId,
        setTimeOptionId,
        services,
        setServices,
        addService,
        removeService,
      }}
    >
      {children}
    </ScheduleContext.Provider>
  );
};
