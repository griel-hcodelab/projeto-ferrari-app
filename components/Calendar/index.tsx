import { useCallback, useEffect, useState } from "react";
import {
  startOfMonth,
  format,
  addMonths,
  subMonths,
  startOfWeek,
  endOfWeek,
  endOfMonth,
  differenceInSeconds,
  addDays,
} from "date-fns";
import locale from "date-fns/locale/pt-BR";
import { vars } from "../../values";
import styled from "styled-components/native";
import { Button } from "../Button";
import { MaterialIcons } from "@expo/vector-icons";
import { Dimensions } from "react-native";

type CalendarProps = {
  selected?: Date;
  onChange?: (date: Date | null) => void;
};

const Calendar = ({
  selected = undefined,
  onChange = () => {},
}: CalendarProps) => {
  const [startMonth, setStartMonth] = useState(startOfMonth(new Date()));
  const [dates, setDates] = useState<Date[]>([]);
  const [startAt, setStartAt] = useState(startOfWeek(startMonth));
  const [endAt, setEndAt] = useState(endOfWeek(endOfMonth(startMonth)));
  const [selectedDate, setSelectedDate] = useState<Date | null>(
    selected ? selected : new Date()
  );

  const onBtnPrev = useCallback(() => {
    setStartMonth(subMonths(startMonth, 1));
  }, [startMonth]);
  const onBtnNext = useCallback(() => {
    setStartMonth(addMonths(startMonth, 1));
  }, [startMonth]);

  const getDayNumberStyle = useCallback(
    (dt: Date) => {
      if (
        (selectedDate &&
          format(dt, "yyyyMMdd") === format(selectedDate, "yyyyMMdd")) ||
        format(dt, "yyyyMMdd") === format(new Date(), "yyyyMMdd")
      ) {
        return {
          color: vars.white,
        };
      } else if (format(dt, "yyyyMM") !== format(startMonth, "yyyyMM")) {
        return {
          color: vars.gray2,
        };
      } else {
        return {
          color: vars.dark0,
        };
      }
    },
    [startMonth, selectedDate]
  );
  const getDayDayStyle = useCallback(
    (dt: Date) => {
      if (
        selectedDate &&
        format(selectedDate, "yyyyMMdd") === format(dt, "yyyyMMdd")
      ) {
        return {
          backgroundColor: vars.green,
        };
      } else if (format(new Date(), "yyyyMMdd") === format(dt, "yyyyMMdd")) {
        return {
          backgroundColor: vars.blue,
        };
      } else {
        return {};
      }
    },
    [startMonth, selectedDate]
  );

  useEffect(() => {
    setStartAt(startOfWeek(startMonth));
    setEndAt(endOfWeek(endOfMonth(startMonth)));
  }, [startMonth]);

  useEffect(() => {
    const newDates: Date[] = [];
    let day = new Date(startAt.getTime());

    while (differenceInSeconds(endAt, day) > 0) {
      newDates.push(day);
      day = addDays(day, 1);
    }

    setDates(newDates);
  }, [startAt, endAt]);

  useEffect(() => {
    if (typeof onChange === "function") {
      onChange(selectedDate);
    }
  }, [selectedDate]);

  return (
    <>
      <CalendarHeader>
        <CalendarHeaderMonth>
          {format(startMonth, "MMMM yyyy", { locale })}
        </CalendarHeaderMonth>
        <CalendarHeaderNav>
          <Button
            onPress={() => onBtnPrev()}
            color="outline"
            style={{ width: 50 }}
          >
            <MaterialIcons name="chevron-left" size={24} color={vars.gray2} />
          </Button>
          <Button
            onPress={() => onBtnNext()}
            color="outline"
            style={{ width: 50 }}
          >
            <MaterialIcons name="chevron-right" size={24} color={vars.gray2} />
          </Button>
        </CalendarHeaderNav>
      </CalendarHeader>
      <CalendarWeekdays>
        <CalendarWeekday>Dom</CalendarWeekday>
        <CalendarWeekday>Seg</CalendarWeekday>
        <CalendarWeekday>Ter</CalendarWeekday>
        <CalendarWeekday>Qua</CalendarWeekday>
        <CalendarWeekday>Qui</CalendarWeekday>
        <CalendarWeekday>Sex</CalendarWeekday>
        <CalendarWeekday>Sab</CalendarWeekday>
      </CalendarWeekdays>
      <CalendarDates>
        {dates.map((date, index) => (
          <CalendarDate
            onPress={() => setSelectedDate(date)}
            style={getDayDayStyle(date)}
            key={format(date, "yyyy-MM-dd")}
          >
            <CalendarDateNumber style={getDayNumberStyle(date)}>
              {format(date, "d")}
            </CalendarDateNumber>
          </CalendarDate>
        ))}
      </CalendarDates>
    </>
  );
};

const CalendarHeader = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: ${vars.spacePx};
`;
const CalendarWeekdays = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-horizontal: ${vars.spacePx};
  height: 50px;
`;
const CalendarWeekday = styled.Text`
  flex: 1;
  text-align: center;
  color: ${vars.gray0};
  text-transform: uppercase;
  font-weight: bold;
  font-size: 16px;
`;
const CalendarDates = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-horizontal: ${vars.spacePx};
`;
const CalendarDate = styled.TouchableOpacity`
  width: ${(Dimensions.get("window").width - vars.space * 2) / 7}px;
  height: ${(Dimensions.get("window").width - vars.space * 2) / 7}px;
  justify-content: center;
  align-items: center;
  border-radius: ${Dimensions.get("window").width / 14}px; ;
`;
const CalendarDateNumber = styled.Text`
  text-align: center;
  font-size: 16px;
  color: ${vars.dark0};
`;
const CalendarHeaderNav = styled.Text`
  flex-direction: row;
  align-items: center;
  width: 110px;
  justify-content: space-between;
`;

const CalendarHeaderMonth = styled.Text`
  flex: 1;
  font-size: 22px;
  color: ${vars.gray2};
  text-transform: uppercase;
`;

export default Calendar;
