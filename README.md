# EventEase

Prototype mobile pour l'association EventEase : les membres et bénévoles consultent les événements (conférences, ateliers, sorties), en créent, les modifient et indiquent leur participation.

## Lancer le projet

```bash
npm install
npx expo start
```

Puis `a` pour ouvrir l'app dans l'émulateur Android (ou scanner le QR code avec Expo Go).

## Comptes de test

| Rôle  | Email                  | Mot de passe |
|-------|------------------------|--------------|
| Admin | admin@eventease.fr     | Test1234!    |
| Membre| camille@eventease.fr   | Test1234!    |

On peut aussi créer un compte depuis l'écran d'inscription.

## Fonctionnalités

- **Connexion / inscription** simplifiées, sans backend : les comptes sont stockés dans AsyncStorage, la session est conservée au redémarrage.
- **Liste des événements** triée par date, avec trois filtres : *À venir*, *J'y vais* (mes participations) et *Passés*.
- **Création / modification / suppression** d'un événement (titre, description, lieu, date et heure). La suppression demande une confirmation.
- **Participation** : bouton « Je participe » / « Je ne participe plus » sur la fiche, badge « J'y vais » sur les cartes.
- **Droits** : seuls le créateur d'un événement et les admins peuvent le modifier ou le supprimer.
- **Profil** : nombre de participations et d'événements créés, modification du pseudo, déconnexion.
- **Persistance locale** de toutes les données avec AsyncStorage.

## Choix techniques

- **Expo SDK 57** + TypeScript.
- **React Navigation** : un *native stack* pour l'authentification, la fiche et le formulaire, et des *bottom tabs* (Événements / Profil) avec une barre d'onglets personnalisée. Les écrans affichés dépendent de `isAuthenticated` : se connecter ou se déconnecter change de pile automatiquement.
- **Context API** : `AuthProvider` (session) et `EventsProvider` (événements). Chaque action met à jour le state (pour l'écran) et AsyncStorage (pour la persistance).
- **NativeWind** (Tailwind) pour le style, polices **Bungee** et **Inter**.
- **i18next** : aucun texte en dur, tout est dans `src/i18n/locales/fr.json` (clés typées).
- **Date** : sélecteur natif sur Android / iOS (`@react-native-community/datetimepicker`), saisie `JJ/MM/AAAA HH:MM` sur le web.

## Structure

```
App.tsx                  → providers + NavigationContainer
src/
  navigation/            → types des routes, pile principale, onglets
  screens/               → SignIn, SignUp, EventList, EventDetail, EventForm, Profile
  components/            → EventCard, DateField, TabBar, ActionButton, SectionTitle…
  context/               → AuthContext, EventsContext
  api/                   → userStorage, eventStorage (AsyncStorage)
  mock/                  → utilisateurs et événements chargés au premier lancement
  type/                  → types TypeScript
  hooks/                 → animations d'entrée et d'appui
  theme/                 → couleurs (color.css), palette, classes partagées
  utils/date.ts          → formatage et saisie des dates
  i18n/                  → configuration et textes français
```

## Réinitialiser les données

Les données de démo sont écrites dans AsyncStorage au premier lancement. Pour repartir de zéro, désinstaller Expo Go / l'app de l'émulateur, ou vider le stockage du site sur le web.
