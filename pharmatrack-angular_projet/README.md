# PharmaTrack Burkina

Application de gestion de pharmacie pour les zones rurales du Burkina Faso.

## Fonctionnalités

- **Gestion des médicaments** : CRUD complet avec suivi du stock
- **Gestion des ventes** : Enregistrement des ventes avec décrémentation automatique du stock
- **Tableau de bord** : Statistiques et graphiques des ventes
- **Alertes** : Notifications pour les stocks faibles (< 10)
- **Authentification** : Connexion sécurisée avec guards

## Technologies utilisées

- Angular 17 (Standalone Components)
- Angular Material
- TypeScript
- RxJS
- Chart.js / ng2-charts
- json-server (API mock)

## Installation

### Prérequis

- Node.js (v18 ou supérieur)
- npm ou yarn

### Étapes d'installation

1. **Installer les dépendances** :
\`\`\`bash
npm install
\`\`\`

2. **Installer Angular CLI globalement** :
\`\`\`bash
npm install -g @angular/cli
\`\`\`

3. **Démarrer le serveur API mock** (dans un terminal) :
\`\`\`bash
npm run api
\`\`\`
Le serveur API sera disponible sur `http://localhost:3000`

4. **Démarrer l'application Angular** (dans un autre terminal) :
\`\`\`bash
npm start
\`\`\`
L'application sera disponible sur `http://localhost:4200`

## Identifiants de connexion

- **Nom d'utilisateur** : `admin`
- **Mot de passe** : `admin123`

## Structure du projet

\`\`\`
src/
├── app/
│   ├── components/
│   │   ├── dashboard/          # Tableau de bord
│   │   ├── login/              # Page de connexion
│   │   ├── medicine-list/      # Liste des médicaments
│   │   ├── medicine-form/      # Formulaire médicament
│   │   └── sales/              # Gestion des ventes
│   ├── guards/
│   │   └── auth.guard.ts       # Protection des routes
│   ├── models/
│   │   ├── medicine.model.ts   # Interface Medicine
│   │   └── sale.model.ts       # Interface Sale
│   ├── services/
│   │   ├── auth.service.ts     # Service d'authentification
│   │   ├── medicine.service.ts # Service médicaments
│   │   └── sales.service.ts    # Service ventes
│   ├── app.component.ts
│   └── app.routes.ts           # Configuration des routes
├── index.html
├── main.ts
└── styles.scss
\`\`\`

## Fonctionnement

### Dashboard
- Affiche les statistiques principales (nombre de médicaments, ventes totales)
- Alertes pour les stocks faibles
- Graphique des top 5 ventes
- Liste des ventes récentes

### Gestion des médicaments
- Ajouter, modifier, supprimer des médicaments
- Suivi du stock en temps réel
- Alertes visuelles pour les stocks faibles

### Gestion des ventes
- Enregistrer une vente
- Décrémentation automatique du stock
- Historique complet des ventes

## API Mock (json-server)

L'API mock utilise `db.json` comme base de données. Les endpoints disponibles :

- `GET /medicines` - Liste des médicaments
- `GET /medicines/:id` - Détails d'un médicament
- `POST /medicines` - Créer un médicament
- `PUT /medicines/:id` - Modifier un médicament
- `DELETE /medicines/:id` - Supprimer un médicament
- `GET /sales` - Liste des ventes
- `POST /sales` - Créer une vente

## Améliorations futures

- Gestion des utilisateurs avec rôles
- Rapports et exports PDF
- Notifications par email/SMS
- Mode hors ligne avec synchronisation
- Gestion des fournisseurs
- Historique des modifications

## Auteur

Développé pour les pharmacies rurales du Burkina Faso
