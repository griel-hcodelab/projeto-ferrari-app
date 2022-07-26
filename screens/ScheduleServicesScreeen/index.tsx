import { format, getDay } from "date-fns";
import { useCallback, useEffect, useState } from "react";
import styled from "styled-components/native";
import { Screen } from "../";
import Calendar from "../../components/Calendar";
import { Header } from "../../components/Header";
import { Page } from "../../components/Page";
import { BackButton } from "../../components/Page/BackButton";
import { ContinueButton } from "../../components/Page/ContinueButton";
import { PageFooter } from "../../components/Page/PageFooter";
import { PageForm } from "../../components/PageForm";
import { useSchedule } from "../../hooks/useSchedule";
import { Layout } from "../../providers/Layout";
import { vars } from "../../values";
import locale from "date-fns/locale/pt-BR";
import { ScheduleTimeOptionItem } from "../../components/ScheduleTimeOptionItem";
import { TimeOption } from "../../types/TimeOption";
import axios from "axios";
import { useApp } from "../../hooks/useApp";
import { useScreenFocus } from "../../utils/useScreenFocus";
import { useNavigation } from "@react-navigation/native";

export const ScheduleServicesScreen = (props) => {
  const { scheduleAt, timeOptionId, setTimeOptionId } = useSchedule();

  return (
    <Layout
      header={
        <Header
          onPressBack={() => props.navigation.navigate(Screen.ScheduleNew)}
        />
      }
    >
      <Page title="Escolha os Serviços" color="blue"></Page>

      <PageFooter
        buttons={[
          {
            ...BackButton,
            onPress: () => props.navigation.navigate(Screen.ScheduleNew),
          },
          {
            ...ContinueButton,
            onPress: () => props.navigation.navigate(Screen.ScheduleServices),
          },
        ]}
      />
    </Layout>
  );
};

const ScheduleTimeOptionTitle = styled.Text`
  color: ${vars.gray9};
  font-size: 16px;
  text-transform: uppercase;
`;
const ScheduleTimeOptionSelectedDate = styled.Text`
  font-size: 20px;
  text-transform: uppercase;
  color: ${vars.black};
  font-weight: bold;
`;
const ScheduleTimeOptionList = styled.View`
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
`;
