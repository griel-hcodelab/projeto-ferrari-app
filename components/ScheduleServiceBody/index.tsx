import { MaterialIcons } from "@expo/vector-icons";
import { Dimensions } from "react-native";
import styled from "styled-components/native";
import { useSchedule } from "../../hooks/useSchedule";
import { useScheduleService } from "../../hooks/useScheduleService";
import { formatCurrency } from "../../utils/formatCurrency";
import { vars } from "../../values";
import { Button } from "../Button";
import Animated from "react-native-reanimated";
import { usePanel } from "../../hooks/usePanel";
import { PanGestureHandler } from "react-native-gesture-handler";

export const ScheduleServiceBody = () => {
  const { services } = useScheduleService();
  const { services: servicesId, removeService } = useSchedule();
  const { stylePanel, gestureHandler } = usePanel();
  return (
    <PanGestureHandler onGestureEvent={gestureHandler}>
      <Animated.View style={stylePanel}>
        <ScheduleServicePanelBody>
          <ScheduleServicePanelHeader>
            <ScheduleServicePanelHeaderText>
              Resumo
            </ScheduleServicePanelHeaderText>
          </ScheduleServicePanelHeader>
          <ScheduleServicePanelContent>
            {services
              .filter((service) => servicesId.includes(service.id))
              .map(({ name, price, id }) => (
                <ScheduleServicePanelItem key={id}>
                  <ScheduleServicePanelItemName>
                    {name}
                  </ScheduleServicePanelItemName>
                  <ScheduleServicePanelPrice>
                    {formatCurrency(Number(price))}
                  </ScheduleServicePanelPrice>
                  <Button
                    style={{ minWidth: 64 }}
                    onPress={() => removeService(id)}
                  >
                    <MaterialIcons name="delete" size={24} color={vars.dark0} />
                  </Button>
                </ScheduleServicePanelItem>
              ))}
          </ScheduleServicePanelContent>
        </ScheduleServicePanelBody>
      </Animated.View>
    </PanGestureHandler>
  );
};

const ScheduleServicePanelBody = styled.View`
  position: absolute;
  width: 100%;
  background-color: ${vars.gray12};
  bottom: 130px;
`;
const ScheduleServicePanelHeader = styled.View`
  height: 80px;
  justify-content: center;
  align-items: center;
  border-bottom-color: ${vars.gray3};
  border-bottom-width: 1px;
  margin: 0 ${vars.spacePx};
`;
const ScheduleServicePanelHeaderText = styled.Text`
  font-size: 32px;
  color: ${vars.dark0};
`;
const ScheduleServicePanelContent = styled.View`
  height: ${Dimensions.get("screen").height - 349}px;
`;
const ScheduleServicePanelItem = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 0 ${vars.spacePx};
  padding: ${vars.space / 2}px 0;
  border-bottom-color: ${vars.gray3};
  border-bottom-width: 1px;
`;
const ScheduleServicePanelItemName = styled.Text`
  font-size: 16px;
  color: ${vars.dark0};
  flex: 1;
  margin-left: ${vars.spacePx};
`;
const ScheduleServicePanelPrice = styled.Text`
  font-size: 16px;
  color: ${vars.dark0};
  flex: 1;
`;
