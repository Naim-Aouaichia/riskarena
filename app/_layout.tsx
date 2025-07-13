import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { createThirdwebClient } from "thirdweb";

import { useColorScheme } from '@/hooks/useColorScheme';

import "@thirdweb-dev/react-native-adapter";
import { ThirdwebProvider } from "thirdweb/react";


export default function RootLayout() {
  
  const client = createThirdwebClient({
    clientId: "4204fddef7ed6f12fb31235c768b925d",
    secretKey: "l3MKeeufrHB7Zh39cLR19R9155bWIT48u4vi8bVMjjYI-8EajpUBEU2V6sUjRxxapSPNz9d32Rcd_b6QgQbiuw"
  });
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <ThirdwebProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </ThirdwebProvider>
  );
}
