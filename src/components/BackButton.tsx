import {Pressable, Text, View} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {Ionicons} from "@expo/vector-icons";
import {useTranslation} from "react-i18next";
import {palette} from "@/theme/palette";

export default function BackButton () {
    const navigation = useNavigation();
    const {t} = useTranslation();

    return (
        <Pressable
            onPress={() => navigation.goBack()}
            accessibilityRole="button"
            accessibilityLabel={t("detail.back")}
            hitSlop={10}
            className="flex-row items-center self-start"
        >
            <View className="h-10 w-10 -rotate-6 items-center justify-center bg-deep">
                <Ionicons name="arrow-back" size={22} color={palette.ink} />
            </View>
            <Text className="ml-3 font-bungee text-sm text-ink">{t("detail.back")}</Text>
        </Pressable>
    )
}
