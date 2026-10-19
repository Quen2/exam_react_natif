import React, {createContext, ReactNode, useContext, useEffect, useState} from 'react';
import {EventType} from "@/type/event/eventType";
import {EventsContextType} from "@/type/event/eventsContextType";
import {readEvents} from "@/api/event/eventStorage";
import {useAuth} from "@/context/AuthContext";

const EventsContext = createContext<EventsContextType | undefined>(undefined);

export function EventsProvider({ children }: { children: ReactNode }) {
    const {user} = useAuth();
    const [events, setEvents] = useState<EventType[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        readEvents()
            .then(setEvents)
            .finally(() => setLoading(false));
    }, []);

    const getEvent = (id: string) => events.find((event) => event.id === id);

    const isParticipating = (event: EventType) => !!user && event.participants.includes(user.email);

    return (
        <EventsContext.Provider value={{ events, loading, getEvent, isParticipating }}>
            {children}
        </EventsContext.Provider>
    );
}

export const useEvents = () => {
    const context = useContext(EventsContext);
    if (!context) throw new Error('useEvents must be used inside EventsProvider');
    return context;
};
