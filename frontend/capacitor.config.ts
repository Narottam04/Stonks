import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.stonks.android",
  appName: "Stonks",
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
    },
    FirebaseAuthentication: {
      skipNativeAuth: false,
      providers: ["google.com"],
    },
  },
  server: {
    androidScheme: "http",
    cleartext: true,
    allowNavigation: [
      "http://170.187.238.118/*"
    ]
  }
};

export default config;
