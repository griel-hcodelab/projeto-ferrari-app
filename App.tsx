import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { HomeScreen } from "./screens/HomeScreen";
import { ServicesScreen } from "./screens/ServicesScreen";
import { Screen, Screens } from "./screens";
import { DrawerCustom } from "./components/DrawerCustom";
import { ScheduleNewScreen } from "./screens/ScheduleNewScreen";
import { AuthScreen } from "./screens/AuthScreen";
import { AuthProvider } from "./providers/Auth";
import { AppProvider } from "./providers/App";
import { ProfileScreen } from "./screens/ProfileScreen";
import { ScheduleProvider } from "./providers/Schedule";
import { ScheduleTimeOptionsScreen } from "./screens/ScheduleTimeOptions";

const Drawer = createDrawerNavigator<typeof Screens>();

export default function App() {
  return (
    <NavigationContainer>
      <AppProvider>
        <AuthProvider>
          <ScheduleProvider>
            <Drawer.Navigator
              initialRouteName={Screen.Home}
              screenOptions={{
                drawerPosition: "right",
                headerShown: false,
              }}
              drawerContent={(props) => <DrawerCustom {...props} />}
            >
              <Drawer.Screen name={Screen.Home} component={HomeScreen} />
              <Drawer.Screen
                name={Screen.Services}
                component={ServicesScreen}
              />
              <Drawer.Screen
                name={Screen.ScheduleNew}
                component={ScheduleNewScreen}
              />
              <Drawer.Screen
                name={Screen.ScheduleTimeOptions}
                component={ScheduleTimeOptionsScreen}
              />
              <Drawer.Screen name={Screen.Auth} component={AuthScreen} />
              <Drawer.Screen name={Screen.Profile} component={ProfileScreen} />
            </Drawer.Navigator>
          </ScheduleProvider>
        </AuthProvider>
      </AppProvider>
    </NavigationContainer>
  );
}
