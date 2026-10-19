import {KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, View} from "react-native";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {useState} from "react";
import {useTranslation} from "react-i18next";
import {useAuth} from "@/context/AuthContext";
import {useEvents} from "@/context/EventsContext";
import {INPUT_CLASS, MESSAGE_CLASS} from "@/theme/palette";
import Halftone from "@/components/Halftone";
import SectionTitle from "@/components/SectionTitle";
import ActionButton from "@/components/ActionButton";
import StickIn from "@/components/StickIn";

function StatBlock ({value, label, tilt}: {value: number; label: string; tilt: string}) {
    return (
        <View className="flex-1 items-center bg-deep py-4">
            <View className={`bg-accent px-3 ${tilt}`}>
                <Text className="font-bungee text-2xl leading-8 text-night">{value}</Text>
            </View>
            <Text className="mt-2 font-inter-semibold text-xs text-ink">{label}</Text>
        </View>
    )
}

export default function ProfileScreen () {
    const {user, logout, updateUser} = useAuth();
    const {events, isParticipating} = useEvents();
    const [username, setUsername] = useState<string>(user?.username ?? "");
    const [message, setMessage] = useState<string | null>(null);
    const insets = useSafeAreaInsets();
    const {t} = useTranslation();

    if (!user) return null;

    const isAdmin = user.role === "admin";
    const participations = events.filter(isParticipating).length;
    const created = events.filter((event) => event.createdBy === user.email).length;

    const trimmed = username.trim();
    const hasChanged = trimmed !== user.username;

    const handleSubmit = async () => {
        if (!trimmed) {
            setMessage(t("profile.emptyUsername"));
            return;
        }
        await updateUser({username: trimmed});
        setMessage(t("profile.updated"));
    }

    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} className="flex-1 bg-background">
            <View className="bg-deep" style={{height: insets.top}} />
            <Halftone />

            <ScrollView contentContainerClassName="flex-grow px-6 py-6" keyboardShouldPersistTaps="handled">
                <View className="w-full max-w-md flex-grow self-center">
                    <SectionTitle title={t("profile.title")} large />

                    <StickIn order={1}>
                        <View className="mt-8 flex-row items-center bg-surface p-4">
                            <View className="h-12 w-12 -rotate-6 items-center justify-center bg-accent">
                                <Text className="font-bungee text-lg text-night">
                                    {user.username.charAt(0).toUpperCase()}
                                </Text>
                            </View>

                            <View className="ml-3 flex-1">
                                <View className="flex-row items-center gap-2">
                                    <Text className="font-inter-semibold text-base text-ink" numberOfLines={1}>
                                        {user.username}
                                    </Text>
                                    {isAdmin ? (
                                        <View className="rotate-3 bg-accent px-1.5">
                                            <Text className="font-bungee text-[10px] text-night">{t("profile.admin")}</Text>
                                        </View>
                                    ) : null}
                                </View>
                                <Text className="mt-0.5 font-inter text-xs text-outline" numberOfLines={1}>
                                    {user.email}
                                </Text>
                            </View>
                        </View>
                    </StickIn>

                    <StickIn order={2}>
                        <View className="mt-4 flex-row gap-3">
                            <StatBlock value={participations} label={t("profile.stats.participations")} tilt="-rotate-3" />
                            <StatBlock value={created} label={t("profile.stats.created")} tilt="rotate-2" />
                        </View>
                    </StickIn>

                    <View className="mt-10 flex-1">
                        <SectionTitle title={t("profile.myInfos")} />

                        <View className="mt-4 bg-surface p-4">
                            <Text className="font-inter-semibold text-sm text-ink">{t("profile.username")}</Text>
                            <TextInput
                                value={username}
                                onChangeText={(text) => {
                                    setUsername(text);
                                    setMessage(null);
                                }}
                                placeholder={t("profile.usernamePlaceholder")}
                                autoCapitalize="none"
                                className={`mt-2 ${INPUT_CLASS}`}
                            />

                            {message ? <Text className={MESSAGE_CLASS}>{message}</Text> : null}

                            <View className="mt-5">
                                <ActionButton label={t("profile.update")} onPress={handleSubmit} disabled={!hasChanged} />
                            </View>
                        </View>
                    </View>

                    <View className="mt-10">
                        <ActionButton label={t("profile.logout")} onPress={logout} variant="dark" />
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}
