import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.loovie.app',
  appName: 'Loovie',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
