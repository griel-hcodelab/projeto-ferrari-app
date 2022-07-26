import { format, getDay } from "date-fns";
import { Fragment, useCallback, useEffect, useState } from "react";
import styled from "styled-components/native";
import { Screen } from "../";
import Calendar from "../../components/Calendar";
import { Header } from "../../components/Header";
import { Page } from "../../components/Page";
import { BackButton } from "../../components/Page/BackButton";
import { ContinueButton } from "../../components/Page/ContinueButton";
import { PageFooter } from "../../components/Page/PageFooter";
import { PageForm } from "../../components/PageForm";
import { useDrawerNavigation } from "../../hooks/useDrawerNavigation";
import { useSchedule } from "../../hooks/useSchedule";
import { useScheduleService } from "../../hooks/useScheduleService";
import { Layout } from "../../providers/Layout";
import { ScheduleServiceProvider } from "../../providers/ScheduleService";
import { formatCurrency } from "../../utils/formatCurrency";
import { vars } from "../../values";

const ScheduleServiceItemWrap = styled.TouchableOpacity`
  flex-direction: row;
  margin-bottom: ${vars.spacePx};
`;
const ScheduleServiceInput = styled.View`
  width: 22px;
  height: 22px;
  margin-right: ${vars.spacePx};
  border: ${vars.gray3} 1px solid;
  justify-content: center;
  align-items: center;
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
const ScheduleServiceSubtitle = styled.Text`
  font-size: 14px;
  color: ${vars.gray2};
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
  const [isSelected, setIsSelected] = useState(selected);

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
          <ScheduleServiceSubtitle>{subtitle}</ScheduleServiceSubtitle>
        )}
        <ScheduleServicePrice>{formatCurrency(price)}</ScheduleServicePrice>
      </ScheduleServiceLabel>
    </ScheduleServiceItemWrap>
  );
};

const ScheduleServie = () => {
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
        <ScheduleServie />
      </ScheduleServiceProvider>
    </Layout>
  );
};
