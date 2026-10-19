import {ScrollView, Text, View} from "react-native";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {useEffect, useState} from "react";
import {Ionicons} from "@expo/vector-icons";
import {useTranslation} from "react-i18next";
import {useEvents} from "@/context/EventsContext";
import {getAllUsers} from "@/api/user/userStorage";
import {UserType} from "@/type/user/userType";
import {RootStackParamList} from "@/navigation/types";
import {formatLongDate, formatTime, isPast} from "@/utils/date";
import {MESSAGE_CLASS, palette} from "@/theme/palette";
import Halftone from "@/components/Halftone";
import BackButton from "@/components/BackButton";
import SectionTitle from "@/components/SectionTitle";
import StickIn from "@/components/StickIn";

type Props = NativeStackScreenProps<RootStackParamList, "EventDetail">;

type IconName = "calendar-outline" | "time-outline" | "location-outline" | "person-outline";

function InfoRow ({icon, label, value}: {icon: IconName; label: string; value: string}) {
    return (
        <View className="flex-row items-center py-2">
            <View className="h-9 w-9 -rotate-3 items-center justify-center bg-deep">
                <Ionicons name={icon} size={18} color={palette.ink} />
            </View>
            <View className="ml-3 flex-1">
                <Text className="font-inter text-xs text-outline">{label}</Text>
                <Text className="font-inter-semibold text-sm text-ink">{value}</Text>
            </View>
        </View>
    )
}

export default function EventDetailScreen ({route}: Props) {
    const {id} = route.params;
    const {getEvent, isParticipating} = useEvents();
    const [users, setUsers] = useState<UserType[]>([]);
    const insets = useSafeAreaInsets();
    const {t} = useTranslation();

    const event = getEvent(id);

    useEffect(() => {
        getAllUsers().then(setUsers);
    }, []);

    if (!event) {
        return (
            <View className="flex-1 bg-background px-6" style={{paddingTop: insets.top + 24}}>
                <BackButton />
                <Text className={MESSAGE_CLASS}>{t("detail.notFound")}</Text>
            </View>
        );
    }

    const going = isParticipating(event);
    const past = isPast(event.date);
    const usernameOf = (email: string) =>
        users.find((user) => user.email === email)?.username ?? t("detail.unknownUser");

    return (
        <View className="flex-1 bg-background">
            <View className="bg-deep" style={{height: insets.top}} />
            <Halftone />
            <ScrollView contentContainerClassName="px-6 pb-12 pt-6">
                <BackButton />

                <View className="mt-8">
                    <SectionTitle title={event.title} />
                </View>

                {going ? (
                    <Text className={MESSAGE_CLASS}>{t("detail.participating")}</Text>
                ) : null}
                {past ? (
                    <Text className="mt-3 self-start bg-deep px-2 py-1 font-inter-semibold text-xs text-ink">
                        {t("detail.pastEvent")}
                    </Text>
                ) : null}

                <StickIn order={1}>
                    <View className="mt-6 bg-surface px-4 py-2">
                        <InfoRow icon="calendar-outline" label={t("detail.date")} value={formatLongDate(event.date)} />
                        <InfoRow icon="time-outline" label={t("detail.time")} value={formatTime(event.date)} />
                        <InfoRow icon="location-outline" label={t("detail.location")} value={event.location || t("detail.noLocation")} />
                        <InfoRow icon="person-outline" label={t("detail.organizer")} value={usernameOf(event.createdBy)} />
                    </View>
                </StickIn>

                <StickIn order={2}>
                    <View className="mt-6">
                        <Text className="font-bungee text-base text-ink">{t("detail.description")}</Text>
                        <Text className="mt-2 font-inter text-sm leading-6 text-ink">{event.description}</Text>
                    </View>
                </StickIn>

                <StickIn order={3}>
                    <View className="mt-6">
                        <Text className="font-bungee text-base text-ink">
                            {t("detail.participants")} ({event.participants.length})
                        </Text>
                        {event.participants.length === 0 ? (
                            <Text className="mt-2 font-inter text-sm text-outline">{t("detail.noParticipants")}</Text>
                        ) : null}
                        <View className="mt-3 flex-row flex-wrap gap-2">
                            {event.participants.map((email, index) => (
                                <View key={email} className={`bg-deep px-2 py-1 ${index % 2 ? "rotate-2" : "-rotate-1"}`}>
                                    <Text className="font-inter-semibold text-xs text-ink">{usernameOf(email)}</Text>
                                </View>
                            ))}
                        </View>
                    </View>
                </StickIn>

            </ScrollView>
        </View>
    )
}
