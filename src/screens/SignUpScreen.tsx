import {Image, KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, TextInput, View} from "react-native";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {useState} from "react";
import {useTranslation} from "react-i18next";
import {createUser} from "@/api/user/userStorage";
import {useAuth} from "@/context/AuthContext";
import {RootStackParamList} from "@/navigation/types";
import {INPUT_CLASS, MESSAGE_CLASS} from "@/theme/palette";
import Logo from "@/components/Logo";
import SectionTitle from "@/components/SectionTitle";
import Halftone from "@/components/Halftone";
import ActionButton from "@/components/ActionButton";

type Props = NativeStackScreenProps<RootStackParamList, "SignUp">;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function SignUpScreen ({navigation}: Props) {
    const [username, setUsername] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [hidden, setHidden] = useState<boolean>(true);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const insets = useSafeAreaInsets();
    const {login} = useAuth();
    const {t} = useTranslation();

    const submitUserCreation = async () => {
        const trimmedUsername = username.trim();
        const trimmedEmail = email.trim();

        if (!trimmedUsername || !trimmedEmail || !password) {
            setErrorMessage(t("signUp.requiredFields"));
            return;
        }
        if (!EMAIL_REGEX.test(trimmedEmail)) {
            setErrorMessage(t("signUp.invalidEmail"));
            return;
        }
        if (password.length < 6) {
            setErrorMessage(t("signUp.passwordTooShort"));
            return;
        }

        try {
            await createUser(trimmedUsername, trimmedEmail, password);
            await login(trimmedEmail, password);
        } catch {
            setErrorMessage(t("signUp.emailTaken"));
        }
    }

    const clearError = (setter: (value: string) => void) => (text: string) => {
        setter(text);
        setErrorMessage("");
    }

    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} className="flex-1 bg-background">
            <View className="bg-deep" style={{height: insets.top}} />
            <Halftone />
            <ScrollView contentContainerClassName="flex-grow px-6 py-6" keyboardShouldPersistTaps="handled">
                <View className="w-full max-w-md flex-grow self-center">
                    <View className="flex-1 justify-center">
                        <Logo />
                        <View className="mt-10">
                            <SectionTitle title={t("signUp.title")} large />
                        </View>

                        <Text className="mt-6 font-inter-semibold text-sm text-ink">{t("signUp.username")}</Text>
                        <TextInput
                            placeholder={t("signUp.usernamePlaceholder")}
                            onChangeText={clearError(setUsername)}
                            autoCapitalize="none"
                            className={`mt-2 ${INPUT_CLASS}`}
                        />

                        <Text className="mt-3 font-inter-semibold text-sm text-ink">{t("signUp.email")}</Text>
                        <TextInput
                            placeholder={t("signUp.emailPlaceholder")}
                            onChangeText={clearError(setEmail)}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            autoComplete="email"
                            className={`mt-2 ${INPUT_CLASS}`}
                        />

                        <Text className="mt-3 font-inter-semibold text-sm text-ink">{t("signUp.password")}</Text>
                        <View className="mt-2 h-12 flex-row items-center border-b-[3px] border-ink bg-deep pl-3">
                            <TextInput
                                placeholder={t("signUp.passwordPlaceholder")}
                                onChangeText={clearError(setPassword)}
                                secureTextEntry={hidden}
                                className="h-full flex-1 font-inter text-sm text-ink placeholder:text-outline"
                            />
                            <Pressable
                                onPress={() => setHidden(!hidden)}
                                accessibilityRole="button"
                                accessibilityLabel={t("auth.showPassword")}
                                className="h-full w-12 items-center justify-center bg-ink"
                            >
                                <Image source={require("@/assets/images/auth/eye.png")} style={{width: 24, height: 24}} />
                            </Pressable>
                        </View>
                        {
                            errorMessage ?
                                <Text className={MESSAGE_CLASS}>{errorMessage}</Text> : null
                        }

                        <View className="mt-6">
                            <ActionButton label={t("signUp.submit")} onPress={submitUserCreation} />
                        </View>

                        <Text className="mt-6 text-center font-inter text-sm text-ink">
                            {t("signUp.alreadyHaveAccount")}{" "}
                            <Text className="font-inter-semibold text-primary underline" onPress={() => navigation.goBack()}>
                                {t("signUp.signIn")}
                            </Text>
                        </Text>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}
