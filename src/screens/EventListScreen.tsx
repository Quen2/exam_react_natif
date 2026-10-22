import {FlatList, Text, View} from "react-native";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {BottomTabScreenProps} from "@react-navigation/bottom-tabs";
import {CompositeScreenProps} from "@react-navigation/native";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {useState} from "react";
import {useTranslation} from "react-i18next";
import {useEvents} from "@/context/EventsContext";
import {EventType} from "@/type/event/eventType";
import {RootStackParamList, TabParamList} from "@/navigation/types";
import {isPast} from "@/utils/date";
import Logo from "@/components/Logo";
import Halftone from "@/components/Halftone";
import SectionTitle from "@/components/SectionTitle";
import SegmentedControl from "@/components/SegmentedControl";
import ActionButton from "@/components/ActionButton";
import EventCard from "@/components/EventCard";

type Props = CompositeScreenProps<
    BottomTabScreenProps<TabParamList, "Events">,
    NativeStackScreenProps<RootStackParamList>
>;

type Filter = "upcoming" | "mine" | "past";

const byDateAsc = (a: EventType, b: EventType) => new Date(a.date).getTime() - new Date(b.date).getTime();
const byDateDesc = (a: EventType, b: EventType) => byDateAsc(b, a);

export default function EventListScreen ({navigation}: Props) {
    const {events, isParticipating} = useEvents();
    const [filter, setFilter] = useState<Filter>("upcoming");
    const insets = useSafeAreaInsets();
    const {t} = useTranslation();

    const getFilteredEvents = () => {
        switch (filter) {
            case "upcoming":
                return events.filter((event) => !isPast(event.date)).sort(byDateAsc);
            case "mine":
                return events.filter((event) => isParticipating(event) && !isPast(event.date)).sort(byDateAsc);
            case "past":
                return events.filter((event) => isPast(event.date)).sort(byDateDesc);
        }
    }

    const filterOptions = [
        {key: "upcoming", label: t("events.filters.upcoming")},
        {key: "mine", label: t("events.filters.mine")},
        {key: "past", label: t("events.filters.past")},
    ] as const;

    return (
        <View className="flex-1 bg-background">
            <View className="bg-deep" style={{height: insets.top}} />
            <Halftone />
            <FlatList
                data={getFilteredEvents()}
                keyExtractor={(event) => event.id}
                renderItem={({item, index}) => <EventCard event={item} order={index} />}
                contentContainerClassName="gap-4 px-6 pb-8"
                ListHeaderComponent={
                    <View className="pt-8">
                        <Logo />
                        <View className="mt-10">
                            <SectionTitle title={t("events.title")} large />
                        </View>
                        <View className="mt-6">
                            <ActionButton label={t("events.create")} onPress={() => navigation.navigate("EventForm", {})} />
                        </View>
                        <View className="mb-2 mt-8">
                            <SegmentedControl options={filterOptions} value={filter} onChange={setFilter} />
                        </View>
                    </View>
                }
                ListEmptyComponent={
                    <Text className="mt-2 font-inter text-sm text-outline">{t(`events.empty.${filter}`)}</Text>
                }
            />
        </View>
    )
}
