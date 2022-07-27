import { MaterialIcons } from "@expo/vector-icons";
import { format, getDay } from "date-fns";
import { Fragment, useCallback, useEffect, useState } from "react";
import styled from "styled-components/native";
import { Screen } from "../";
import { Button } from "../../components/Button";
import Calendar from "../../components/Calendar";
import { Header } from "../../components/Header";
import { Page } from "../../components/Page";
import { BackButton } from "../../components/Page/BackButton";
import { ContinueButton } from "../../components/Page/ContinueButton";
import { PageFooter } from "../../components/Page/PageFooter";
import { PageForm } from "../../components/PageForm";
import { ScheduleServiceItem } from "../../components/ScheduleServiceItem";
import { useDrawerNavigation } from "../../hooks/useDrawerNavigation";
import { useSchedule } from "../../hooks/useSchedule";
import { useScheduleService } from "../../hooks/useScheduleService";
import { Layout } from "../../providers/Layout";
import { ScheduleServiceProvider } from "../../providers/ScheduleService";
import { formatCurrency } from "../../utils/formatCurrency";
import { vars } from "../../values";
import { Dimensions } from "react-native";
import { ScheduleServicePanelProvider } from "../../providers/ScheduleServicePanel";
import { usePanel } from "../../hooks/usePanel";
import { ScheduleServiceBody } from "../../components/ScheduleServiceBody";
import { ScheduleServicePanelFooter } from "../../components/ScheduleServicePanelFooter";

const ScheduleServicePanel = () => {
  return (
    <>
      <ScheduleServiceBody />
      <ScheduleServicePanelFooter />
    </>
  );
};

const ScheduleService = () => {
  const { navigate } = useDrawerNavigation();
  const { services } = useScheduleService();
  const {
    scheduleAt,
    timeOptionId,
    setTimeOptionId,
    services: servicesId,
    addService,
    removeService,
  } = useSchedule();

  const onChangeService = useCallback((checkd: boolean, id: number) => {
    if (checkd) {
      addService(id);
    } else {
      removeService(id);
    }
  }, []);

  return (
    <Fragment>
      <Page title="escolha os serviços" color="blue">
        <PageForm>
          {services.map(({ id, name, description, price }) => (
            <ScheduleServiceItem
              key={id}
              title={name}
              subtitle={description}
              price={Number(price)}
              selected={servicesId.includes(id)}
              onChange={(checked) => onChangeService(checked, id)}
            />
          ))}
        </PageForm>
      </Page>
      <ScheduleServicePanelProvider>
        <ScheduleServicePanel />
      </ScheduleServicePanelProvider>
      <PageFooter
        buttons={[
          {
            ...BackButton,
            onPress: () => navigate(Screen.ScheduleNew),
          },
          {
            ...ContinueButton,
            onPress: () => navigate(Screen.ScheduleTimeOptions),
          },
        ]}
      />
    </Fragment>
  );
};

export const ScheduleServicesScreen = () => {
  const { navigate } = useDrawerNavigation();

  return (
    <Layout
      header={<Header onPressBack={() => navigate(Screen.ScheduleNew)} />}
    >
      <ScheduleServiceProvider>
        <ScheduleService />
      </ScheduleServiceProvider>
    </Layout>
  );
};
