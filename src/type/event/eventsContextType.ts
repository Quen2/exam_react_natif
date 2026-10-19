import {EventType} from "@/type/event/eventType";

export interface EventsContextType {
    events: EventType[];
    loading: boolean;
    getEvent: (id: string) => EventType | undefined;
    isParticipating: (event: EventType) => boolean;
}
