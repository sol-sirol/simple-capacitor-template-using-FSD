import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.example.app",
  appName: "hybrid-simple",
  webDir: "build",
  server: {
    androidScheme: "https",
  },
  plugins: {
    CapacitorUpdater: {
      updateUrl: "https://appsync.apptor.tech/api/update",
      statsUrl: "https://appsync.apptor.tech/api/stats",
      autoUpdate: true,
      resetWhenUpdate: true,
    },
  },
};

export default config;
