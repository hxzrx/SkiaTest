import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import MessageScreen from "./MessageScreen";

const Tab = createBottomTabNavigator();

const HomeTabs = ({ navigation }) => {
    return (
        <>
            <Tab.Navigator screenOptions={{ headerShown: true,}} >
                <Tab.Screen
                    name="MessageTabScreen"
                    component={MessageScreen}
                    options={{
                        tabBarBadge: 3,
                        headerShown: false,
                        title: "MessageTabScreen",
                    }}
                />
            </Tab.Navigator>
        </>
    );
};

export { HomeTabs };
