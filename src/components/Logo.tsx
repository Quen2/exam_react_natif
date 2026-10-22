import {Animated, Easing, Text, View} from "react-native";
import {useEffect, useRef} from "react";
import {useReducedMotion} from "react-native-reanimated";
import {Ionicons} from "@expo/vector-icons";
import {useTranslation} from "react-i18next";
import {palette} from "@/theme/palette";

export default function Logo () {
    const spin = useRef(new Animated.Value(0)).current;
    const reducedMotion = useReducedMotion();
    const {t} = useTranslation();

    useEffect(() => {
        if (reducedMotion) return;

        Animated.timing(spin, {
            toValue: 1,
            duration: 1100,
            easing: Easing.out(Easing.cubic),
            useNativeDriver: true,
        }).start();
    }, []);

    const rotate = spin.interpolate({inputRange: [0, 1], outputRange: ["0deg", "360deg"]});

    return (
        <View accessibilityRole="header" accessibilityLabel={t("app.name")} className="flex-row items-center self-start">
            <Animated.View style={{transform: [{rotate}]}}>
                <View className="h-11 w-11 -rotate-6 items-center justify-center bg-deep">
                    <Ionicons name="calendar" size={24} color={palette.ink} />
                </View>
            </Animated.View>
            <View className="ml-5 px-3 py-1">
                <View className="absolute inset-0 rotate-3 bg-shade" />
                <View className="absolute inset-0 -rotate-2 bg-primary" />
                <Text className="font-bungee text-2xl leading-8 text-night">{t("app.name")}</Text>
            </View>
            <Text className="ml-4 mt-6 font-bungee text-sm text-ink">{t("app.tagline")}</Text>
        </View>
    )
}
