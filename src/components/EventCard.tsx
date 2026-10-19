import {Animated, Pressable, Text, View} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {Ionicons} from "@expo/vector-icons";
import {useTranslation} from "react-i18next";
import {EventType} from "@/type/event/eventType";
import {useEvents} from "@/context/EventsContext";
import {usePressScale} from "@/hooks/usePressScale";
import {formatDay, formatMonth, formatTime, isPast} from "@/utils/date";
import {palette} from "@/theme/palette";
import StickIn from "@/components/StickIn";

type EventCardProps = {
    event: EventType;
    order?: number;
};

export default function EventCard ({event, order = 0}: EventCardProps) {
    const navigation = useNavigation();
    const {isParticipating} = useEvents();
    const {scale, pressIn, pressOut} = usePressScale();
    const {t} = useTranslation();

    const going = isParticipating(event);
    const past = isPast(event.date);

    const openDetail = () => {
        navigation.navigate("EventDetail", {id: event.id});
    }

    return (
        <StickIn order={order}>
            <Pressable
                onPress={openDetail}
                onPressIn={pressIn}
                onPressOut={pressOut}
                accessibilityRole="button"
                accessibilityLabel={`${event.title}, ${formatDay(event.date)} ${formatMonth(event.date)}`}
            >
                <Animated.View style={{transform: [{scale}]}}>
                    <View className={`flex-row bg-surface p-4 ${past ? "opacity-70" : ""}`}>
                        <View className={`h-16 w-14 items-center justify-center bg-accent ${Number(event.id) % 2 ? "-rotate-3" : "rotate-2"}`}>
                            <Text className="font-bungee text-xl leading-6 text-night">{formatDay(event.date)}</Text>
                            <Text className="font-bungee text-[10px] text-night">{formatMonth(event.date)}</Text>
                        </View>

                        <View className="ml-4 flex-1">
                            <Text className="font-inter-semibold text-base text-ink" numberOfLines={2}>
                                {event.title}
                            </Text>

                            <View className="mt-1.5 flex-row items-center">
                                <Ionicons name="time-outline" size={14} color={palette.outline} />
                                <Text className="ml-1 font-inter text-xs text-outline">{formatTime(event.date)}</Text>
                                {event.location ? (
                                    <>
                                        <Ionicons name="location-outline" size={14} color={palette.outline} style={{marginLeft: 10}} />
                                        <Text className="ml-1 flex-1 font-inter text-xs text-outline" numberOfLines={1}>
                                            {event.location}
                                        </Text>
                                    </>
                                ) : null}
                            </View>

                            <View className="mt-3 flex-row flex-wrap items-center gap-2">
                                <Text className="font-inter-medium text-xs text-ink">
                                    {t("events.participants", {count: event.participants.length})}
                                </Text>
                                {going ? (
                                    <View className="rotate-3 bg-accent px-1.5">
                                        <Text className="font-bungee text-[10px] text-night">{t("events.going")}</Text>
                                    </View>
                                ) : null}
                                {past ? (
                                    <View className="-rotate-2 bg-deep px-1.5">
                                        <Text className="font-bungee text-[10px] text-ink">{t("events.past")}</Text>
                                    </View>
                                ) : null}
                            </View>
                        </View>
                    </View>
                </Animated.View>
            </Pressable>
        </StickIn>
    )
}
