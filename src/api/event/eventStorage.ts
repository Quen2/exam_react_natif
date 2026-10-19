import AsyncStorage from '@react-native-async-storage/async-storage';
import {EventType} from '@/type/event/eventType';
import {eventData} from '@/mock/event/eventData';

const EVENTS_KEY = 'events';

export async function readEvents(): Promise<EventType[]> {
    const stored = await AsyncStorage.getItem(EVENTS_KEY);
    if (stored) return JSON.parse(stored);

    await AsyncStorage.setItem(EVENTS_KEY, JSON.stringify(eventData));
    return eventData;
}

export async function saveEvents(events: EventType[]): Promise<void> {
    await AsyncStorage.setItem(EVENTS_KEY, JSON.stringify(events));
}
