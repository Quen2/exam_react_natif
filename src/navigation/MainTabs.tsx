import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {TabParamList} from "@/navigation/types";
import EventListScreen from "@/screens/EventListScreen";
import ProfileScreen from "@/screens/ProfileScreen";
import TabBar from "@/components/TabBar";

const Tab = createBottomTabNavigator<TabParamList>();

export default function MainTabs () {
    return (
        <Tab.Navigator screenOptions={{headerShown: false}} tabBar={(props) => <TabBar {...props} />}>
            <Tab.Screen name="Events" component={EventListScreen} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
    )
}
