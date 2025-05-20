import Slider from "@react-native-community/slider";
import { Canvas, Fill, Path, useCanvasRef } from "@shopify/react-native-skia";
import React, { useCallback, useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { Divider, IconButton, Menu, Text as PaperText, useTheme } from "react-native-paper";
import { runOnJS, useSharedValue } from "react-native-reanimated";


export const SketchingScreen = ({navigation}) => {
    const theme = useTheme();

    const paths = useSharedValue([]);
    const currentPath = useSharedValue(null); //  Reanimated Shared Value
    const [currentPathForRender, setCurrentPathForRender] = useState(null); // React state for rendering

    const [strokeWidth, setStrokeWidth] = useState(2); // 画笔粗细

    const lastValidTouchPosition = useSharedValue({ x: 0, y: 0 });
    const [isEraser, setIsEraser] = useState(false); // 是否为橡皮擦模式
    const [toolsMenuVisible, setToolsMenuVisible] = useState(false);
    const [shapesMenuVisible, setShapesMenuVisible] = useState(false);
    const canvasRef = useCanvasRef();

    const [backgroundColor, _setBackgroundColor] = useState("#FFFFFFFF");
    const colors = ["#000000", "#FF0000", "#00FF00", "#0000FF", "#FFA500", "#FFFFFF"];
    const [color, setColor] = useState(colors[0]);

    const [drawMode, _setDrawMode] = useState("freehand");
    const startPoint = useSharedValue({ x: 0, y: 0 });
    const canvasPosition = useSharedValue({ x: 0, y: 0, width: 0, height: 0 });

    // 设置绘制模式图标
    const setShapeMenuIcon = useCallback(() => {
        return "draw";
    }, [drawMode, isEraser]);

    // 添加设置绘图模式的函数
    const setDrawingMode = () => {
    };

    const onCanvasLayout = (event) => {
        const { x, y, width, height } = event.nativeEvent.layout;
        if (width > 0 && height > 0) {
            canvasPosition.value = { x, y, width, height };
        }
    };

    const updateCurrentPathForRender = useCallback((pathData) => {
        setCurrentPathForRender(pathData ? { ...pathData } : null);
    }, []);


    const panGesture = Gesture.Pan()
        .minPointers(1)
        .maxPointers(1)
        .onBegin((event) => {
            const { x, y } = event;
            let canvasX = x - canvasPosition.value.x;
            let canvasY = y - canvasPosition.value.y;
            canvasX = Math.max(0, Math.min(canvasX, canvasPosition.value.width));
            canvasY = Math.max(0, Math.min(canvasY, canvasPosition.value.height));

            startPoint.value = { x: canvasX, y: canvasY };
            lastValidTouchPosition.value = { x: canvasX, y: canvasY };

            if (currentPath.value) {
                paths.value = [...paths.value, currentPath.value];
                currentPath.value = null;
            }

            if (drawMode === "freehand") {
                currentPath.value = {
                    path: `M ${canvasX} ${canvasY}`,
                    color: isEraser ? backgroundColor : color,
                    strokeWidth: strokeWidth,
                };
            } else {
                currentPath.value = null;
            }
            runOnJS(updateCurrentPathForRender)(currentPath.value);
        })
        .onUpdate((event) => {
            if (!currentPath.value) return; // No current path to update

            const { x, y } = event;
            let canvasX = x - canvasPosition.value.x;
            let canvasY = y - canvasPosition.value.y;
            canvasX = Math.max(0, Math.min(canvasX, canvasPosition.value.width));
            canvasY = Math.max(0, Math.min(canvasY, canvasPosition.value.height));

            lastValidTouchPosition.value = { x: canvasX, y: canvasY };

            if (drawMode === "freehand") {
                // Create a new object for the updated path data
                const updatedPathData = {
                    ...currentPath.value,
                    path: currentPath.value.path + ` L ${canvasX} ${canvasY}`
                };
                currentPath.value = updatedPathData;
            }
            runOnJS(updateCurrentPathForRender)(currentPath.value);
        })
        .onEnd((event) => {
            if (!currentPath.value) return; // No current path to finalize
            paths.value = [...paths.value, currentPath.value];

            runOnJS(updateCurrentPathForRender)(currentPath.value);
        });

    const goBack = () => {
        paths.value = null;
        currentPath.value = null;
        navigation.goBack();
    };

    return (
        <View style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={styles.container}>
                <GestureDetector gesture={panGesture}>
                    <View
                        style={styles.canvas}
                        onLayout={onCanvasLayout}
                    >
                        <Canvas
                            ref={canvasRef}
                            opaque={true}
                            style={StyleSheet.absoluteFill}
                            pointerEvents="box-only"
                        >
                            <Fill color={backgroundColor} />

                            { /* Use currentPathForRender for rendering */
                                currentPathForRender && (
                                    <Path
                                        path={currentPathForRender.path}
                                        strokeWidth={currentPathForRender.strokeWidth}
                                        style="stroke"
                                        color={currentPathForRender.color}
                                    />
                                )}
                        </Canvas>
                    </View>
                </GestureDetector>

                <Divider bold={true} />
                <View style={{...styles.controls, backgroundColor:theme.colors.elevation.level5}}>
                    <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center", height: 50 }}>
                        <View style={{justifyContent: "center", alignSelf: "center"}}>
                            <Menu
                                visible={shapesMenuVisible}
                                onDismiss={() => setShapesMenuVisible(false)}
                                anchor={
                                    <IconButton icon={setShapeMenuIcon()} size={28} onPress={() => setShapesMenuVisible(true)} />
                                }
                            >
                                <View>
                                    <Menu.Item leadingIcon={"draw"} title="Free" onPress={() => { setDrawingMode("freehand"); }} />
                                    <Divider />
                                </View>
                            </Menu>
                        </View>

                        <View style={[styles.colorPicker, {marginLeft: 0, marginRight: 0, height: 50, alignSelf: "center"}]}>
                            {colors.map((c) => (
                                <TouchableOpacity
                                    key={c}
                                    style={[
                                        styles.colorButton,
                                        { backgroundColor: c },
                                        color === c && !isEraser && styles.selectedColor, // Ensure not eraser mode for selected color highlight
                                        isEraser && c === color && styles.disabled // This was original, might need review: disables the selected color if eraser is on
                                    ]}
                                    onPress={() => {
                                        setColor(c);
                                        setIsEraser(false);
                                    }}
                                />
                            ))}
                        </View>

                        <View style={{justifyContent: "center", alignSelf: "center"}}>
                            <Menu
                                visible={toolsMenuVisible}
                                onDismiss={() => setToolsMenuVisible(false)}
                                anchor={
                                    <IconButton icon="cog-outline" size={28} onPress={() => setToolsMenuVisible(true)} />
                                }
                            >
                                <View>
                                    <Menu.Item leadingIcon={"arrow-left"} title={"Exit"} onPress={() => { setToolsMenuVisible(false); goBack();}} />

                                </View>
                            </Menu>
                        </View>


                    </View>

                    <View style={styles.sliderContainer}>
                        <PaperText style={styles.label}>Stroke Width: {strokeWidth}</PaperText>
                        <Slider
                            value={strokeWidth}
                            onSlidingComplete={(value) => {
                                if (value !== strokeWidth) {
                                    setStrokeWidth(Math.round(value)); // Ensure integer value
                                }
                            }}
                            minimumValue={1}
                            maximumValue={50}
                            step={1}
                            style={styles.slider}
                        />
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    canvas: {
        flex: 1,
        backgroundColor: "#fff",
        width: "100%",
        height: "100%",
    },
    controls: {
        padding: 10,
        backgroundColor: "#fff",
    },
    colorPicker: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
        height: 50,
    },
    colorButton: {
        width: 30,
        height: 30,
        borderRadius: 15,
        margin: 5,
        borderWidth: 1,
        borderColor: "#ccc",
    },
    selectedColor: {
        borderWidth: 3,
        borderColor: "#666",
    },
    disabled: {
        opacity: 0.5,
    },
    sliderContainer: {
        marginBottom: 10,
    },
    label: {
        textAlign: "center",
        marginBottom: 5,
    },
    slider: {
        width: "100%",
    },
});
