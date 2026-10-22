import {Pressable, Text, View} from "react-native";

type Option<T extends string> = {
    key: T;
    label: string;
};

type SegmentedControlProps<T extends string> = {
    options: readonly Option<T>[];
    value: T;
    onChange: (value: T) => void;
};

export default function SegmentedControl<T extends string> ({options, value, onChange}: SegmentedControlProps<T>) {
    return (
        <View accessibilityRole="tablist" className="h-11 flex-row bg-deep">
            {options.map((option) => {
                const active = value === option.key;

                return (
                    <Pressable
                        key={option.key}
                        onPress={() => onChange(option.key)}
                        accessibilityRole="tab"
                        accessibilityState={{selected: active}}
                        className={`flex-1 items-center justify-center ${active ? "bg-accent" : ""}`}
                    >
                        <Text className={`font-bungee text-xs ${active ? "text-night" : "text-ink"}`}>
                            {option.label}
                        </Text>
                    </Pressable>
                );
            })}
        </View>
    )
}
