import {NavigatorScreenParams} from "@react-navigation/native";

export type TabParamList = {
    Events: undefined;
    Profile: undefined;
};

export type RootStackParamList = {
    SignIn: undefined;
    SignUp: undefined;
    MainTabs: NavigatorScreenParams<TabParamList>;
    EventDetail: {id: string};
    EventForm: {id?: string};
};

declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootStackParamList {}
    }
}
