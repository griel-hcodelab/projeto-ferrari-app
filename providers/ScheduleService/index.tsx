import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { ScheduleContext } from "../../contexts/Schedule";
import { ScheduleServiceContext } from "../../contexts/ScheduleService";
import { useApp } from "../../hooks/useApp";
import { Service } from "../../types/Service";
import { vars } from "../../values";

type ScheduleProviderProps = {
  children: React.ReactNode;
};

export const ScheduleServiceProvider = ({
  children,
}: ScheduleProviderProps) => {
  const [services, setServices] = useState<Service[]>([]);
  const { catchAxiosError } = useApp();

  const load = useCallback(() => {
    axios
      .get<Service[]>("/services", {
        baseURL: vars.baseURL,
      })
      .then(({ data }) => {
        setServices(data);
      })
      .catch(catchAxiosError);
  }, []);

  useEffect(() => {
    load();
  }, []);

  return (
    <ScheduleServiceContext.Provider value={{ services }}>
      {children}
    </ScheduleServiceContext.Provider>
  );
};
