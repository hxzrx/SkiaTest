// Orientation.kt

// Android Studio Gemini, 打开MainActivity.kt和MainApplication.kt文件.
// Prompt:
// 我这个app是用React Native 0.77.1开发的. 操作方式是竖屏操作, UI布局是PORTRAIT方向的, 但其中有一个画图板屏幕, 用户可能会将手机横放并输入文字, 这时文字需要在横向(即LANDSCAPE)方向排列, 因此我需要判断手机的朝向(orientation), 需要获得手机的PORTRAIT, LANDSCAPE-LEFT, LANDSCAPE-RIGHT, PORTRAIT-UPSIDEDOWN四种朝向.
// 我考察了几个库:
// 1: react-native-orientation-locker, 与React Native 0.77.1不兼容.
// 2: react-native-orientation-director, 始终build不成功.
// 该项目运行在Android上.
// 请给我开发建议, 是需要继续尝试其它库还是使用其它方法.
// 如果涉及到原生代码, 那么一律使用kotlin. React Native代码使用js或jsx.
// MainApplication和MainActivity都是kt文件.
// 请用中文作答.

// 具体步骤：
// 在 Kotlin 原生代码中监听屏幕方向变化:
// 使用 OrientationEventListener: Android 提供了 OrientationEventListener 类来监听设备的方向变化。我们需要创建一个自定义的 OrientationEventListener 实例。
// 获取屏幕方向: OrientationEventListener 会在方向发生变化时触发 onOrientationChanged() 方法。通过该方法传递过来的角度，我们可以判断出当前的屏幕方向。
// 处理四种方向: 我们需要将 onOrientationChanged() 传递过来的角度转换为你的四种屏幕方向.
//
// 定义枚举类: 定义一个枚举类来表示四种屏幕方向. Orientation.kt
// 编写方向监听类: PrientationModule.kt
// 创建一个类来实现 ReactPackage, 这个类需要实现 ReactPackage 接口，并重写 createNativeModules() 和 createViewManagers() 方法。 OrientationPackage.kt
// 注册到包: 在MainApplication.kt中注册到包中,  重写getPackages方法.
//
// 清理和构建:
// Clean your project: 在 Android Studio 中，选择 Build -> Clean Project。
// Rebuild your project: 在 Android Studio 中，选择 Build -> Rebuild Project。
// 重新启动 React Native 开发服务器。

package com.skiatest

enum class Orientation {
    PORTRAIT,
    LANDSCAPE_LEFT,
    LANDSCAPE_RIGHT,
    PORTRAIT_UPSIDEDOWN,
    UNKNOWN
}
