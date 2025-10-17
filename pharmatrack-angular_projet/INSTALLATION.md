# Guide d'installation détaillé - PharmaTrack Burkina

## Étape 1 : Prérequis

Assurez-vous d'avoir installé :
- **Node.js** version 18 ou supérieure : [Télécharger Node.js](https://nodejs.org/)
- **npm** (inclus avec Node.js)

Vérifiez les versions installées :
\`\`\`bash
node --version
npm --version
\`\`\`

## Étape 2 : Créer le projet Angular

1. **Installer Angular CLI globalement** :
\`\`\`bash
npm install -g @angular/cli@17
\`\`\`

## Étape 3 : Installer les dépendances

Dans le dossier du projet, exécutez :

\`\`\`bash
npm install
\`\`\`

Cela installera toutes les dépendances listées dans `package.json`.

## Étape 4 : Démarrer l'application


Ouvrez **deux terminaux** :

**Terminal 1 - API Mock** :
\`\`\`bash
npm run api
\`\`\`
Cela démarre json-server sur `http://localhost:3000`

**Terminal 2 - Application Angular** :
\`\`\`bash
npm start
\`\`\`
Cela démarre l'application sur `http://localhost:4200`


## Étape 5 : Accéder à l'application

1. Ouvrez votre navigateur
2. Allez sur `http://localhost:4200`
3. Connectez-vous avec :
   - **Utilisateur** : `admin`
   - **Mot de passe** : `admin123`

