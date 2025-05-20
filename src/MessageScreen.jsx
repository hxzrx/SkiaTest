import { createDrawerNavigator } from "@react-navigation/drawer";
import React from "react";
import { View } from "react-native";
import { List } from "react-native-paper";

const Drawer = createDrawerNavigator();

const CardDecke = ({ navigation }) => {
    const listContets = ["A", "B", "C"];
    return (
        <View>
            {listContets.map((item, i) => {
                return (
                    <List.Item
                        key={i}
                        title={item}
                        description="Message description"
                        onPress={() => navigation.navigate("SketchesListingTemplate")}
                    />
                );
            })}
        </View>
    );
};

const MessageScreen = ({ navigation }) => {
    return (
        <Drawer.Navigator>
            <Drawer.Screen
                name="Root"
                component={CardDecke}
                options={{ title: "Low Carbon", headerTitleAlign: "center" }}
            />
        </Drawer.Navigator>
    );
};

export default MessageScreen;
