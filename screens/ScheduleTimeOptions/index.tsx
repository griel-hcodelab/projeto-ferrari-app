import { useState } from "react";
import { Screen } from "..";
import Calendar from "../../components/Calendar";
import { Header } from "../../components/Header";
import { Page } from "../../components/Page";
import { BackButton } from "../../components/Page/BackButton";
import { ContinueButton } from "../../components/Page/ContinueButton";
import { PageFooter } from "../../components/Page/PageFooter";
import { useSchedule } from "../../hooks/useSchedule";
import { Layout } from "../../providers/Layout";

export const scheduleTimeOptionsScreen = (props) => {
  const { scheduleAt, setScheduleAt } = useSchedule();

  return (
    <Layout
      header={
        <Header onPressBack={() => props.navigation.navigate(Screen.Home)} />
      }
    >
      <Page title="Escolha a Data" color="blue"></Page>

      <PageFooter
        buttons={[
          {
            ...BackButton,
            onPress: () => props.navigation.navigate(Screen.Home),
          },
          {
            ...ContinueButton,
            onPress: () =>
              props.navigation.navigate(Screen.ScheduleTimeOptions),
          },
        ]}
      />
    </Layout>
  );
};
