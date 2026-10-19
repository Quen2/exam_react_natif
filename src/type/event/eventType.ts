export type EventType = {
    id: string,
    title: string,
    description: string,
    date: string,
    location: string,
    createdBy: string,
    participants: string[]
}

export type EventInput = Pick<EventType, "title" | "description" | "date" | "location">
