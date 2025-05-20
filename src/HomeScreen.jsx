import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { SketchesListingTemplate } from "./SketchesListingTemplate";
import { SketchingScreen } from "./SketchingScreen";

const Stack = createStackNavigator();

const HomeScreen = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="SketchesListingTemplate" component={SketchesListingTemplate} options={{ headerShown: true }} />
            <Stack.Screen name="SketchingScreen"         component={SketchingScreen}         options={{ headerShown: false }} />
        </Stack.Navigator>
    );
};

export default HomeScreen;
