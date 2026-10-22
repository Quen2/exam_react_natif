import {Animated, Pressable, StyleSheet, Text, View} from "react-native";
import {useEffect, useRef} from "react";
import {BottomTabBarProps} from "@react-navigation/bottom-tabs";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {Ionicons} from "@expo/vector-icons";
import {useTranslation} from "react-i18next";
import {palette} from "@/theme/palette";
import {TabParamList} from "@/navigation/types";

const TABS: Record<keyof TabParamList, {label: "tabs.events" | "tabs.profile"; icon: "calendar" | "person"}> = {
    Events: {label: "tabs.events", icon: "calendar"},
    Profile: {label: "tabs.profile", icon: "person"},
};

function ActiveSlab () {
    const scale = useRef(new Animated.Value(0.4)).current;

    useEffect(() => {
        Animated.spring(scale, {toValue: 1, friction: 5, useNativeDriver: true}).start();
    }, []);

    return (
        <Animated.View style={[StyleSheet.absoluteFill, {transform: [{scale}]}]}>
            <View className="absolute inset-0 -rotate-3 bg-primary" />
        </Animated.View>
    )
}

export default function TabBar ({state, navigation}: BottomTabBarProps) {
    const insets = useSafeAreaInsets();
    const {t} = useTranslation();

    return (
        <View
            accessibilityRole="tablist"
            className="flex-row bg-deep pt-2"
            style={{paddingBottom: insets.bottom + 12}}
        >
            {state.routes.map((route, index) => {
                const active = state.index === index;
                const tab = TABS[route.name as keyof TabParamList];

                const openTab = () => {
                    const event = navigation.emit({type: "tabPress", target: route.key, canPreventDefault: true});
                    if (!active && !event.defaultPrevented) navigation.navigate(route.name);
                };

                return (
                    <Pressable
                        key={route.key}
                        onPress={openTab}
                        accessibilityRole="tab"
                        accessibilityState={{selected: active}}
                        className="flex-1 items-center"
                    >
                        <View className="h-9 w-16 items-center justify-center">
                            {active ? <ActiveSlab /> : null}
                            <Ionicons
                                name={active ? tab.icon : `${tab.icon}-outline`}
                                size={24}
                                color={active ? palette.night : palette.ink}
                            />
                        </View>
                        <Text className={`mt-1 font-bungee text-xs ${active ? "text-primary" : "text-ink"}`}>
                            {t(tab.label)}
                        </Text>
                    </Pressable>
                );
            })}
        </View>
    )
}
