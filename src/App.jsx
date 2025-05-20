import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import "react-native-gesture-handler";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { PaperProvider } from "react-native-paper";
import { SafeAreaInsetsContext } from "react-native-safe-area-context";
import HomeScreen from "./HomeScreen";

const Stack = createStackNavigator();

export default function App() {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
                <PaperContainer/>
        </GestureHandlerRootView>
    );
}

const PaperContainer = () => {

    return (
        <PaperProvider>
            <React.Fragment>
                <NavigationContainer>
                    <SafeAreaInsetsContext.Consumer>
                        {() => {
                            return (
                                <RootScreen/>
                            );
                        }}
                    </SafeAreaInsetsContext.Consumer>
                </NavigationContainer>
            </React.Fragment>
        </PaperProvider>
    );
};

const RootScreen = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
        </Stack.Navigator>
    );
};
