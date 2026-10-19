import {Text, View} from "react-native";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {useTranslation} from "react-i18next";
import {useAuth} from "@/context/AuthContext";
import Logo from "@/components/Logo";
import Halftone from "@/components/Halftone";
import SectionTitle from "@/components/SectionTitle";
import ActionButton from "@/components/ActionButton";

// Écran temporaire : il sera remplacé par la liste des événements
export default function HomeScreen () {
    const {user, logout} = useAuth();
    const insets = useSafeAreaInsets();
    const {t} = useTranslation();

    return (
        <View className="flex-1 bg-background">
            <View className="bg-deep" style={{height: insets.top}} />
            <Halftone />
            <View className="flex-1 px-6 pt-8">
                <Logo />
                <View className="mt-10">
                    <SectionTitle title={t("home.welcome", {name: user?.username})} large />
                </View>
                <Text className="mt-4 font-inter text-sm text-ink">{t("home.soon")}</Text>
                <View className="mt-10">
                    <ActionButton label={t("home.logout")} onPress={logout} variant="dark" />
                </View>
            </View>
        </View>
    )
}
