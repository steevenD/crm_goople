# Description de l'application 
Dans le cadre du module Python de 2ème année de Master, nous devions réaliser une application CRM avec un Front Angular et un Back Django.

# Architecture de l'application
L'application Angular a été découpé en différents dossiers :
* **authentication** -> incription / connexion  
* **home** -> page d'accueil
* **kpi** -> statistiques sous forme de graphique, définition des objectifs
* **sales-shares** -> gestions des actions de vente
* **shared** -> dossier contenant les composants, services partagées dans les dossiers ci-dessus comme les "toast" de notification, la barre de navigation, ...

Ces dossiers sont eux-même découpés avec les sous-dossiers: 
* **views** -> contient les vues principales des dossiers, ce sont les composants "route"
* **components** -> contient les composants de la vue principales
* **services** -> contient les services
* **models** -> contient les modèles

J'ai décidé d'utiliser ce découpage car il est clair et c'est celui que j'utilise en entreprise.

La partie Django est découpé en plusieurs applications : 
* **crm_analyzer** -> partie statistiques, définition des objectifs
* **crm_authentication** -> partie inscription et connexion
* **crm_backend** -> application principale
* **crm_editor** -> partie gestion des actions de vente

### Schéma architecture de l'application
<img src="https://www.zupimages.net/up/19/51/vh8l.png" width="650">

* **LoginComponent / RegisterComponent** -> Composants "view" de connexion et d'inscription appelant l'application Django **crm_authentication**.
* **SalesSharesComposant** -> Composant "view" contentant le composant avec le tableau des actions de ventes (SalesTabComponent) qui lui-même contient le composant d'ajout (AddSaleComponent) et les lignes éditables du tableau (RowSaleComponent). Ces composants appelent l'application Django **crm_editor**.
* **KPIComponent** -> Composant "view" appelant l'application Django **crm_analyzer**.


# Prérequis
* node v12.13.0
* npm v6.9.0
* python v3.7.0

# Lancement de l'application 

## Lancement du backend Django
* `cd backend` 
* `pipenv shell`
* `pipenv install`
* `cd crm_backend`
* `manage.py runserver`

## Lancement du frontend Angular
* `cd frontend`
* `npm install`
* `npm start`
* Ouvrir un navigateur sur localhost:4200


# Lancement des tests 

## Selenium 
**Avoir une version de Chrome v78**

## Fichiers de test
Des fichiers de test sont présents dans le dossier **backend/files_test**

## Tests unitaires Python

Executer la commande après que le back-end Django soit lancé : 

* `cd backend` 
* `cd crm_backend`
* `manage.py test`

## Tests unitaires Angular
Les tests unitaires Angular sont réalisés grâce au framework Jasmine/Karma.<br> 
Lancez la commande `npm run test` pour lancer les tests unitaires.

# Traduction
La traduction s'exécute via le module i18n qui récupère les éléments via un un attribut dans une balise html.
Un document pour chaque langue peut être rédigé.

Pour lancer la traduction anglaise : `ng serve --configuration=en`
