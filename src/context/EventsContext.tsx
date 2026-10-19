import React, {createContext, ReactNode, useContext, useEffect, useState} from 'react';
import {EventInput, EventType} from "@/type/event/eventType";
import {EventsContextType} from "@/type/event/eventsContextType";
import {readEvents, saveEvents} from "@/api/event/eventStorage";
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

    // Met à jour l'écran ET AsyncStorage en une seule fois
    const persist = async (updated: EventType[]) => {
        setEvents(updated);
        await saveEvents(updated);
    };

    const getEvent = (id: string) => events.find((event) => event.id === id);

    const addEvent = async (input: EventInput) => {
        if (!user) throw new Error("NOT_AUTHENTICATED");

        const newEvent: EventType = {
            ...input,
            id: `${Date.now()}`,
            createdBy: user.email,
            participants: [user.email],
        };

        await persist([...events, newEvent]);
        return newEvent;
    };

    const updateEvent = async (id: string, changes: EventInput) => {
        await persist(events.map((event) => (event.id === id ? {...event, ...changes} : event)));
    };

    const deleteEvent = async (id: string) => {
        await persist(events.filter((event) => event.id !== id));
    };

    const isParticipating = (event: EventType) => !!user && event.participants.includes(user.email);

    const canManage = (event: EventType) =>
        !!user && (user.role === "admin" || event.createdBy === user.email);

    return (
        <EventsContext.Provider
            value={{ events, loading, getEvent, addEvent, updateEvent, deleteEvent, isParticipating, canManage }}
        >
            {children}
        </EventsContext.Provider>
    );
}

export const useEvents = () => {
    const context = useContext(EventsContext);
    if (!context) throw new Error('useEvents must be used inside EventsProvider');
    return context;
};
