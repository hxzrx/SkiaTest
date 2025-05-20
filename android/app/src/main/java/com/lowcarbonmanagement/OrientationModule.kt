// OrientationModule.kt
package com.skiatest

import android.content.Context
import android.view.OrientationEventListener
import android.view.Surface
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.modules.core.DeviceEventManagerModule
import android.util.Log

class OrientationModule(reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

    private val mReactContext: ReactApplicationContext = reactContext
    private var orientationEventListener: OrientationEventListener? = null
    private var currentOrientation = Orientation.UNKNOWN

    companion object {
        private const val TAG = "OrientationModule"
    }
    override fun getName(): String {
        return "OrientationModule"
    }

    init {
        initOrientationListener()
    }

    private fun initOrientationListener() {
        orientationEventListener = object : OrientationEventListener(mReactContext) {
            override fun onOrientationChanged(orientation: Int) {
                val newOrientation = when {
                    orientation in 45 until 135 -> Orientation.LANDSCAPE_RIGHT
                    orientation in 135 until 225 -> Orientation.PORTRAIT_UPSIDEDOWN
                    orientation in 225 until 315 -> Orientation.LANDSCAPE_LEFT
                    orientation in 315 until 360 || orientation in 0 until 45 -> Orientation.PORTRAIT
                    else -> Orientation.UNKNOWN
                }

                if (newOrientation != currentOrientation) {
                    currentOrientation = newOrientation
                    sendOrientationEvent(newOrientation)
                    Log.i(TAG,"The current orientation is $currentOrientation")
                }
            }
        }
        orientationEventListener?.enable()
    }

    private fun sendOrientationEvent(orientation: Orientation) {
        mReactContext
            .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
            .emit("OrientationChange", orientation.toString())
    }
    override fun onCatalystInstanceDestroy() {
        super.onCatalystInstanceDestroy()
        orientationEventListener?.disable()
    }
}
