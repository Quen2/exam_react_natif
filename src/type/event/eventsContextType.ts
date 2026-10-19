import {EventInput, EventType} from "@/type/event/eventType";

export interface EventsContextType {
    events: EventType[];
    loading: boolean;
    getEvent: (id: string) => EventType | undefined;
    addEvent: (input: EventInput) => Promise<EventType>;
    updateEvent: (id: string, changes: EventInput) => Promise<void>;
    deleteEvent: (id: string) => Promise<void>;
    toggleParticipation: (id: string) => Promise<void>;
    isParticipating: (event: EventType) => boolean;
    canManage: (event: EventType) => boolean;
}
