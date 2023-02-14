import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.cryptocademy.android",
  appName: "Cryptocademy",
  webDir: "dist",
  bundledWebRuntime: false,
  plugins: {
    PushNotifications: {
      presentationOptions: ["badge", "sound", "alert"]
    },
    SplashScreen: {
      launchAutoHide: true,
      launchShowDuration: 3000,
      showSpinner: false
    }
  }
};

export default config;
