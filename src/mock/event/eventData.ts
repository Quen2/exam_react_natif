import {EventType} from "@/type/event/eventType";

export const eventData: EventType[] = [
    {
        id: "1",
        title: "Conférence : l'engagement bénévole",
        description: "Retours d'expérience de trois associations lyonnaises sur le recrutement et la fidélisation des bénévoles. Échanges avec le public et pot de l'amitié pour finir.",
        date: "2026-11-14T18:30:00",
        location: "Maison des associations, Lyon 3e",
        createdBy: "admin@eventease.fr",
        participants: ["camille@eventease.fr"]
    },
    {
        id: "2",
        title: "Atelier réparation de vélos",
        description: "Apprenez à régler vos freins, changer une chambre à air et entretenir votre chaîne. Les outils sont fournis, venez avec votre vélo !",
        date: "2026-11-22T09:00:00",
        location: "Local de l'asso, 12 rue Garibaldi",
        createdBy: "camille@eventease.fr",
        participants: []
    },
    {
        id: "3",
        title: "Sortie randonnée au Mont Pilat",
        description: "Boucle de 14 km avec 600 m de dénivelé. Prévoir chaussures de marche, pique-nique et 1,5 L d'eau. Covoiturage organisé depuis Lyon.",
        date: "2026-12-06T07:45:00",
        location: "Départ parking Perrache",
        createdBy: "admin@eventease.fr",
        participants: ["admin@eventease.fr", "camille@eventease.fr"]
    },
    {
        id: "4",
        title: "Assemblée générale de rentrée",
        description: "Bilan de l'année, présentation du budget et élection du nouveau bureau.",
        date: "2026-09-12T14:00:00",
        location: "Maison des associations, Lyon 3e",
        createdBy: "admin@eventease.fr",
        participants: ["admin@eventease.fr", "camille@eventease.fr"]
    }
]
