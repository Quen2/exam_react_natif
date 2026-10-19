export type RootStackParamList = {
    SignIn: undefined;
    SignUp: undefined;
    EventList: undefined;
    EventDetail: {id: string};
    EventForm: {id?: string};
};

declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootStackParamList {}
    }
}
