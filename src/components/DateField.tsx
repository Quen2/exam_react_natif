import {Platform, Pressable, Text, TextInput, View} from "react-native";
import {useState} from "react";
import DateTimePicker, {DateTimePickerEvent} from "@react-native-community/datetimepicker";
import {Ionicons} from "@expo/vector-icons";
import {useTranslation} from "react-i18next";
import {formatLongDate, formatTime, parseInputString, toInputString} from "@/utils/date";
import {INPUT_CLASS, palette} from "@/theme/palette";
import ActionButton from "@/components/ActionButton";

type DateFieldProps = {
    value: Date;
    onChange: (date: Date) => void;
    onInvalid?: () => void;
};

type PickerMode = "date" | "time";

// Le sélecteur natif n'existe pas sur le web : on y propose une saisie "JJ/MM/AAAA HH:MM"
function WebDateField ({value, onChange, onInvalid}: DateFieldProps) {
    const [text, setText] = useState<string>(toInputString(value));
    const {t} = useTranslation();

    const handleChange = (input: string) => {
        setText(input);
        const parsed = parseInputString(input);
        if (parsed) onChange(parsed);
        else onInvalid?.();
    }

    return (
        <View>
            <Text className="mt-3 font-inter-semibold text-sm text-ink">{t("form.webDate")}</Text>
            <TextInput
                value={text}
                onChangeText={handleChange}
                placeholder={t("form.webDatePlaceholder")}
                className={`mt-2 ${INPUT_CLASS}`}
            />
        </View>
    )
}

export default function DateField ({value, onChange, onInvalid}: DateFieldProps) {
    const [mode, setMode] = useState<PickerMode | null>(null);
    const {t} = useTranslation();

    if (Platform.OS === "web") {
        return <WebDateField value={value} onChange={onChange} onInvalid={onInvalid} />;
    }

    const handlePick = (event: DateTimePickerEvent, selected?: Date) => {
        // Android ferme la boîte de dialogue tout seul, iOS reste ouvert jusqu'à "Valider"
        if (Platform.OS === "android") setMode(null);
        if (event.type !== "set" || !selected) return;

        const next = new Date(value);
        if (mode === "date") next.setFullYear(selected.getFullYear(), selected.getMonth(), selected.getDate());
        else next.setHours(selected.getHours(), selected.getMinutes(), 0, 0);
        onChange(next);
    }

    const iso = value.toISOString();

    return (
        <View>
            <View className="mt-3 flex-row gap-3">
                <View className="flex-[2]">
                    <Text className="font-inter-semibold text-sm text-ink">{t("form.date")}</Text>
                    <Pressable
                        onPress={() => setMode("date")}
                        accessibilityRole="button"
                        accessibilityLabel={`${t("form.date")} : ${formatLongDate(iso)}`}
                        className="mt-2 h-12 flex-row items-center border-b-[3px] border-ink bg-deep px-3"
                    >
                        <Ionicons name="calendar-outline" size={18} color={palette.ink} />
                        <Text className="ml-2 flex-1 font-inter text-sm text-ink" numberOfLines={1}>
                            {formatLongDate(iso)}
                        </Text>
                    </Pressable>
                </View>

                <View className="flex-1">
                    <Text className="font-inter-semibold text-sm text-ink">{t("form.time")}</Text>
                    <Pressable
                        onPress={() => setMode("time")}
                        accessibilityRole="button"
                        accessibilityLabel={`${t("form.time")} : ${formatTime(iso)}`}
                        className="mt-2 h-12 flex-row items-center border-b-[3px] border-ink bg-deep px-3"
                    >
                        <Ionicons name="time-outline" size={18} color={palette.ink} />
                        <Text className="ml-2 font-inter text-sm text-ink">{formatTime(iso)}</Text>
                    </Pressable>
                </View>
            </View>

            {mode ? (
                <View className={Platform.OS === "ios" ? "mt-3 bg-primary p-2" : ""}>
                    <DateTimePicker
                        value={value}
                        mode={mode}
                        is24Hour
                        locale="fr-FR"
                        display={Platform.OS === "ios" ? "spinner" : "default"}
                        onChange={handlePick}
                    />
                    {Platform.OS === "ios" ? (
                        <ActionButton label={t("form.confirmPicker")} onPress={() => setMode(null)} variant="dark" />
                    ) : null}
                </View>
            ) : null}
        </View>
    )
}
