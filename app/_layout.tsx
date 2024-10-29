import { createTamagui, TamaguiProvider, View } from "tamagui";
import { config } from "@tamagui/config/v3";
import { Stack } from "expo-router";

// you usually export this from a tamagui.config.ts file
const tamaguiConfig = createTamagui(config);

// TypeScript types across all Tamagui APIs
type Conf = typeof tamaguiConfig;
declare module "@tamagui/core" {
  interface TamaguiCustomConfig extends Conf {}
}

export default function RootLayout() {
  return (
    <TamaguiProvider config={tamaguiConfig}>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </TamaguiProvider>
  );
}
