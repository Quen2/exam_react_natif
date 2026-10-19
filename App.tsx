import "@/theme/global.css";

import {Text, View} from "react-native";
import {StatusBar} from "expo-status-bar";

export default function App() {
    return (
        <View className="flex-1 items-center justify-center bg-background">
            <StatusBar style="light" />
            <Text className="text-2xl font-bold text-ink">EventEase</Text>
        </View>
    );
}
