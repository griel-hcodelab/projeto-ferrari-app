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
import { ScheduleServiceProvider } from "../../providers/ScheduleService";
import { useScheduleService } from "../../hooks/useScheduleService";
import { formatCurrency } from "../../utils/formatCurrency";

const ScheduleServiceItemWrap = styled.TouchableOpacity`
  flex-direction: row;
`;
const ScheduleServiceInput = styled.View`
  width: 22px;
  height: 22px;
  margin-right: ${vars.spacePx};
  border: 1px solid ${vars.gray3};
  align-items: center;
  justify-content: center;
`;
const ScheduleServiceInputChecked = styled.View`
  width: 14px;
  height: 14px;
  background-color: ${vars.blue};
`;
const ScheduleServiceLabel = styled.View``;
const ScheduleServiceTitle = styled.Text`
  color: ${vars.dark0};
  font-size: 16px;
`;
const ScheduleServiceSubTitle = styled.Text`
  color: ${vars.gray2};
  font-size: 14px;
`;
const ScheduleServicePrice = styled.Text`
  color: ${vars.dark0};
  font-size: 16px;
  font-weight: bold;
`;

type ScheduleServiceItemProps = {
  title: string;
  subtitle?: string;
  price: number;
  selected?: boolean;
  onChange?: (selected: boolean) => void;
};
const ScheduleServiceItem = ({
  title,
  subtitle,
  price,
  selected = false,
  onChange,
}: ScheduleServiceItemProps) => {
  const [isSelected, setIsSelected] = useState(false);

  useEffect(() => {
    if (typeof onChange === "function") {
      onChange(isSelected);
    }
  }, [isSelected]);

  return (
    <ScheduleServiceItemWrap onPress={() => setIsSelected(!isSelected)}>
      <ScheduleServiceInput>
        {isSelected && <ScheduleServiceInputChecked />}
      </ScheduleServiceInput>
      <ScheduleServiceLabel>
        <ScheduleServiceTitle>{title}</ScheduleServiceTitle>
        {subtitle && (
          <ScheduleServiceSubTitle>{subtitle}</ScheduleServiceSubTitle>
        )}
        <ScheduleServicePrice>
          R${formatCurrency(Number(price))}
        </ScheduleServicePrice>
      </ScheduleServiceLabel>
    </ScheduleServiceItemWrap>
  );
};

const ScheduleService = (props) => {
  const { services } = useScheduleService();
  const {
    scheduleAt,
    timeOptionId,
    setTimeOptionId,
    services: servicesId,
    addService,
    removeService,
  } = useSchedule();

  const onChangeService = useCallback((checked: boolean, id: number) => {
    if (checked) {
      addService(id);
    } else {
      removeService(id);
    }
  }, []);

  return (
    <>
      <Page title="Escolha os Serviços" color="blue">
        <PageForm>
          {services.map(({ id, name, description, price }) => (
            <ScheduleServiceItem
              key={id}
              title={name}
              price={Number(price)}
              subtitle={description}
              selected={servicesId.includes(id)}
              onChange={(checked) => onChangeService(checked, id)}
            />
          ))}
        </PageForm>
      </Page>

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
    </>
  );
};

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
      <ScheduleServiceProvider>
        <ScheduleService />
      </ScheduleServiceProvider>
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
