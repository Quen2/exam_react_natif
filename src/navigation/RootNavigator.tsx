import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {useAuth} from "@/context/AuthContext";
import {useEvents} from "@/context/EventsContext";
import {RootStackParamList} from "@/navigation/types";
import {palette} from "@/theme/palette";
import MainTabs from "@/navigation/MainTabs";
import SignInScreen from "@/screens/SignInScreen";
import SignUpScreen from "@/screens/SignUpScreen";
import EventDetailScreen from "@/screens/EventDetailScreen";
import EventFormScreen from "@/screens/EventFormScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator () {
    const {isAuthenticated, loading: authLoading} = useAuth();
    const {loading: eventsLoading} = useEvents();

    if (authLoading || eventsLoading) return null;

    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                animation: "slide_from_right",
                contentStyle: {backgroundColor: palette.background},
            }}
        >
            {isAuthenticated ? (
                <>
                    <Stack.Screen name="MainTabs" component={MainTabs} />
                    <Stack.Screen name="EventDetail" component={EventDetailScreen} />
                    <Stack.Screen name="EventForm" component={EventFormScreen} />
                </>
            ) : (
                <>
                    <Stack.Screen name="SignIn" component={SignInScreen} />
                    <Stack.Screen name="SignUp" component={SignUpScreen} />
                </>
            )}
        </Stack.Navigator>
    )
}
