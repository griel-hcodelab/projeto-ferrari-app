import { useEffect } from "react";
import { useDrawerNavigation } from "../hooks/useDrawerNavigation";

export const useScreenFocus = (fn: () => void, deps: any[] = []) => {
  const navigation = useDrawerNavigation();

  useEffect(() => {
    navigation.addListener("focus", () => fn());
  }, [navigation, ...deps]);
};
