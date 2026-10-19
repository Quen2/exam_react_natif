import {Animated, Pressable, Text, View} from "react-native";
import {usePressScale} from "@/hooks/usePressScale";

type ActionButtonProps = {
    label: string;
    onPress: () => void;
    disabled?: boolean;
    variant?: "light" | "dark";
};

export default function ActionButton ({label, onPress, disabled = false, variant = "light"}: ActionButtonProps) {
    const {scale, pressIn, pressOut} = usePressScale();
    const dark = variant === "dark";

    return (
        <Pressable
            onPress={onPress}
            onPressIn={pressIn}
            onPressOut={pressOut}
            disabled={disabled}
            accessibilityRole="button"
            accessibilityState={{disabled}}
            className={`h-12 ${disabled ? "opacity-40" : ""}`}
        >
            <Animated.View style={{flex: 1, justifyContent: "center", transform: [{scale}]}}>
                <View className={`absolute inset-0 rotate-1 ${dark ? "bg-primary" : "bg-shade"}`} />
                <View className={`absolute inset-0 -rotate-1 ${dark ? "bg-deep" : "bg-primary"}`} />
                <Text className={`text-center font-bungee text-sm ${dark ? "text-ink" : "text-night"}`}>{label}</Text>
            </Animated.View>
        </Pressable>
    )
}
