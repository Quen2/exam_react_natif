import "@/theme/global.css";
import "@/i18n";

import {useEffect} from "react";
import {DefaultTheme, NavigationContainer} from "@react-navigation/native";
import {SafeAreaProvider} from "react-native-safe-area-context";
import {StatusBar} from "expo-status-bar";
import * as SplashScreen from "expo-splash-screen";
import {useFonts, Inter_300Light, Inter_400Regular, Inter_500Medium, Inter_600SemiBold} from "@expo-google-fonts/inter";
import {Bungee_400Regular} from "@expo-google-fonts/bungee";
import {AuthProvider} from "@/context/AuthContext";
import RootNavigator from "@/navigation/RootNavigator";
import {palette} from "@/theme/palette";

SplashScreen.preventAutoHideAsync();

const theme = {
    ...DefaultTheme,
    colors: {...DefaultTheme.colors, background: palette.background},
};

export default function App() {
    const [fontsLoaded] = useFonts({Inter_300Light, Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Bungee_400Regular});

    useEffect(() => {
        if (fontsLoaded) SplashScreen.hideAsync();
    }, [fontsLoaded]);

    if (!fontsLoaded) return null;

    return (
        <SafeAreaProvider>
            <AuthProvider>
                <NavigationContainer theme={theme}>
                    <StatusBar style="light" />
                    <RootNavigator />
                </NavigationContainer>
            </AuthProvider>
        </SafeAreaProvider>
    );
}
