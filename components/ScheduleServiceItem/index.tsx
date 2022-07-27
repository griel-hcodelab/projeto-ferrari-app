import { useEffect, useState } from "react";
import styled from "styled-components/native";
import { formatCurrency } from "../../utils/formatCurrency";
import { vars } from "../../values";

type ScheduleServiceItemProps = {
  title: string;
  subtitle?: string;
  price: number;
  selected?: boolean;
  onChange?: (selected: boolean) => void;
};

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

export const ScheduleServiceItem = ({
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
