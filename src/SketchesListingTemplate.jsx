import React from "react";
import { View } from "react-native";
import { List } from "react-native-paper";

export const SketchesListingTemplate = ({navigation}) => {
    const listContets = ["Sketch A", "Sketch B", "Sketch C"];
    return (
        <View>
            {listContets.map((item, i) => {
                return (
                    <List.Item
                        key={i}
                        title={item}
                        description="Item description"
                        onPress={() => navigation.navigate("SketchingScreen")}
                    />
                );
            })}
        </View>
    );
};
