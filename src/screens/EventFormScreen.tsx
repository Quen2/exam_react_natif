import {KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, View} from "react-native";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {useState} from "react";
import {useTranslation} from "react-i18next";
import {useEvents} from "@/context/EventsContext";
import {RootStackParamList} from "@/navigation/types";
import {INPUT_CLASS, MESSAGE_CLASS} from "@/theme/palette";
import Halftone from "@/components/Halftone";
import BackButton from "@/components/BackButton";
import SectionTitle from "@/components/SectionTitle";
import ActionButton from "@/components/ActionButton";
import DateField from "@/components/DateField";

type Props = NativeStackScreenProps<RootStackParamList, "EventForm">;

type FormError = "title" | "description" | "date";

// Par défaut : demain à 18h
function defaultDate (): Date {
    const date = new Date();
    date.setDate(date.getDate() + 1);
    date.setHours(18, 0, 0, 0);
    return date;
}

export default function EventFormScreen ({route, navigation}: Props) {
    const id = route.params?.id;
    const {getEvent, addEvent, updateEvent} = useEvents();
    const existing = id ? getEvent(id) : undefined;
    const isEditing = !!existing;

    const [title, setTitle] = useState<string>(existing?.title ?? "");
    const [description, setDescription] = useState<string>(existing?.description ?? "");
    const [location, setLocation] = useState<string>(existing?.location ?? "");
    const [date, setDate] = useState<Date>(existing ? new Date(existing.date) : defaultDate());
    const [dateIsValid, setDateIsValid] = useState<boolean>(true);
    const [error, setError] = useState<FormError | null>(null);
    const insets = useSafeAreaInsets();
    const {t} = useTranslation();

    const handleSubmit = async () => {
        if (!title.trim()) return setError("title");
        if (!description.trim()) return setError("description");
        if (!dateIsValid) return setError("date");

        const input = {
            title: title.trim(),
            description: description.trim(),
            location: location.trim(),
            date: date.toISOString(),
        };

        if (existing) {
            await updateEvent(existing.id, input);
            navigation.goBack();
        } else {
            const created = await addEvent(input);
            navigation.replace("EventDetail", {id: created.id});
        }
    }

    const clearError = (setter: (value: string) => void) => (text: string) => {
        setter(text);
        setError(null);
    }

    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} className="flex-1 bg-background">
            <View className="bg-deep" style={{height: insets.top}} />
            <Halftone />
            <ScrollView contentContainerClassName="px-6 pb-12 pt-6" keyboardShouldPersistTaps="handled">
                <View className="w-full max-w-md self-center">
                    <BackButton />

                    <View className="mt-8">
                        <SectionTitle title={isEditing ? t("form.editTitle") : t("form.createTitle")} large />
                    </View>

                    <View className="mt-6 bg-surface p-4">
                        <Text className="font-inter-semibold text-sm text-ink">{t("form.title")}</Text>
                        <TextInput
                            value={title}
                            onChangeText={clearError(setTitle)}
                            placeholder={t("form.titlePlaceholder")}
                            maxLength={80}
                            className={`mt-2 ${INPUT_CLASS}`}
                        />

                        <Text className="mt-3 font-inter-semibold text-sm text-ink">{t("form.description")}</Text>
                        <TextInput
                            value={description}
                            onChangeText={clearError(setDescription)}
                            placeholder={t("form.descriptionPlaceholder")}
                            multiline
                            textAlignVertical="top"
                            className="mt-2 min-h-[112px] border-b-[3px] border-ink bg-deep px-3 py-3 font-inter text-sm text-ink placeholder:text-outline"
                        />

                        <Text className="mt-3 font-inter-semibold text-sm text-ink">{t("form.location")}</Text>
                        <TextInput
                            value={location}
                            onChangeText={setLocation}
                            placeholder={t("form.locationPlaceholder")}
                            className={`mt-2 ${INPUT_CLASS}`}
                        />

                        <DateField
                            value={date}
                            onChange={(next) => {
                                setDate(next);
                                setDateIsValid(true);
                                setError(null);
                            }}
                            onInvalid={() => setDateIsValid(false)}
                        />

                        {error ? <Text className={MESSAGE_CLASS}>{t(`form.errors.${error}`)}</Text> : null}
                    </View>

                    <View className="mt-8">
                        <ActionButton label={isEditing ? t("form.save") : t("form.create")} onPress={handleSubmit} />
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}
