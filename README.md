# Angular Product Catalog

Une application Angular responsive qui affiche une liste de produits à l'aide de composants d'interface utilisateur Angular Material. L'application récupère les données produit depuis une API externe, les affiche sous forme de cartes et offre des fonctionnalités de tri et de filtrage.


## Technology Stack

- Angular 19
- Angular Material
- RxJS
- TypeScript
- Jasmine/Karma for testing

## Getting Started

### Prerequisites

- Node.js (v18.19.0)
- npm (v10.9.0 or later)

### Installation

1. Clone the repository
   ```
   git clone https://github.com/yourusername/angular-product-catalog.git
   cd angular-product-catalog
   ```

2. Install dependencies
   ```
   npm install
   ```

3. Start the development server
   ```
   npm start
   ```

4. Ouvrez votre navigateur et accédez à `http://localhost:4200`

## Running Tests

Exécutez les tests unitaires avec :
```
npm test
```

## Project Structure

- `src/app/models` - Contient des modèles de données et des interfaces
- `src/app/services` - Contient le service produit pour la communication API
- `src/app/product-list` - Composant de liste de produits avec son modèle et ses styles

## Choix techniques

- **Reactive Programming**: J'ai utilisé RxJS pour gérer les flux de données pour le filtrage et le tri
- **Standalone Components**: Utilisation des composants autonomes d'Angular pour une meilleure modularité
- **Responsive Design**: Mise en œuvre d'une disposition de grille réactive qui s'adapte à différentes tailles d'écran
- **Error Handling**: Implemented comprehensive error handling in the service layer
- **Unit Testing**: Ajout de tests unitaires approfondis pour les composants et les services

## Améliorations futures

- Mise en place de la pagination pour gérer des listes de produits plus volumineuses
- Ajout d'une vue détaillée du produit en cliquant dessus
- Mise en place d'une fonctionnalité de panier
- Ajout d'un filtre de catégories de produits
- Mise en place d'un support hors ligne via Service Workers
- Ajout de tests de bout en bout avec Cypress ou Playwright