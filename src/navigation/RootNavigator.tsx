import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {useAuth} from "@/context/AuthContext";
import {RootStackParamList} from "@/navigation/types";
import {palette} from "@/theme/palette";
import SignInScreen from "@/screens/SignInScreen";
import SignUpScreen from "@/screens/SignUpScreen";
import HomeScreen from "@/screens/HomeScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator () {
    const {isAuthenticated, loading} = useAuth();

    if (loading) return null;

    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                animation: "slide_from_right",
                contentStyle: {backgroundColor: palette.background},
            }}
        >
            {isAuthenticated ? (
                <Stack.Screen name="Home" component={HomeScreen} />
            ) : (
                <>
                    <Stack.Screen name="SignIn" component={SignInScreen} />
                    <Stack.Screen name="SignUp" component={SignUpScreen} />
                </>
            )}
        </Stack.Navigator>
    )
}
