import { MaterialIcons } from "@expo/vector-icons";
import styled from "styled-components/native";
import { usePanel } from "../../hooks/usePanel";
import { vars } from "../../values";
import Animated from "react-native-reanimated";
import { useSchedule } from "../../hooks/useSchedule";
import { useScheduleService } from "../../hooks/useScheduleService";
import { formatCurrency } from "../../utils/formatCurrency";

export const ScheduleServicePanelFooter = () => {
  const { styleArrow, isOpen, setIsOpen, panelY, bottomY } = usePanel();
  const { services: servicesId } = useSchedule();
  const { services } = useScheduleService();

  return (
    <ScheduleServicePanelFooterWrap
      onPressIn={() => {
        if (!isOpen) {
          panelY.value = bottomY - 50;
        }
      }}
      onPressOut={() => {
        setIsOpen(!isOpen);
      }}
    >
      <Animated.View style={styleArrow}>
        <MaterialIcons name="keyboard-arrow-up" size={24} color={vars.gray2} />
      </Animated.View>
      <ScheduleServicePanelFooterTotal>
        <ScheduleServicePanelFooterTotalText>
          Total
        </ScheduleServicePanelFooterTotalText>
        <ScheduleServicePanelFooterTotalValue>
          {formatCurrency(
            services
              .filter((service) => servicesId.includes(service.id))
              .map((service) => Number(service.price))
              .reduce((acc, curr) => acc + curr, 0)
          )}
        </ScheduleServicePanelFooterTotalValue>
      </ScheduleServicePanelFooterTotal>
    </ScheduleServicePanelFooterWrap>
  );
};

const ScheduleServicePanelFooterWrap = styled.TouchableOpacity`
  border-top-color: ${vars.gray3};
  border-top-width: 1px;
  border-bottom-color: ${vars.gray3};
  border-bottom-width: 1px;
  position: absolute;
  bottom: 82px;
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 ${vars.spacePx};
  height: 50px;
  background-color: ${vars.gray12};
`;

const ScheduleServicePanelFooterTotal = styled.View`
  flex-direction: row;
  align-items: center;
`;
const ScheduleServicePanelFooterTotalText = styled.Text`
  font-size: 18px;
  color: ${vars.dark0};
  margin-right: ${vars.spacePx};
`;
const ScheduleServicePanelFooterTotalValue = styled.Text`
  font-size: 18px;
  color: ${vars.dark0};
  font-weight: bold;
`;
