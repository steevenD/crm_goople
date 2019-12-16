# Description de l'application 
Dans le cadre du module Python de 2ème année de Master, nous devions réaliser une application CRM avec un Front Angular et un Back Django.

L'application Angular a été découpé en différent dossier :
* authentication -> incription / connexion  
* home -> page d'accueil
* kpi -> statistiques sous forme de graphique, définition des objectifs
* sales-shares -> gestions des actions de vente
* shared -> dossier contenant les composants, services partagées dans les dossiers ci-dessus comme les "toast" de notification, la barre de navigation, ...

Ces dossiers sont eux-même découpés avec les sous-dossiers: 
* views -> contenant les vues principales des dossiers, ce sont les composants "route"
* components -> contenant les composants de la vue principales
* services
* models

J'ai décidé d'utiliser ce découpage car il est clair et c'est celui que j'utilise en entreprise.

La partie Django est découpé en plusieurs applications : 
* crm_analyser -> partie forme de graphique, définition des objectifs
* crm_authentication -> partie inscription et connexion
* crm_backend -> application principale
* crm_editor -> partie gestion des actions de vente



<img src="https://zupimages.net/viewer.php?id=19/51/vh8l.png" width=250 />

# Prérequis
* node v12.13.0
* npm v6.9.0
* python v3.7.0

# Lancement de l'application 

## Lancement du backend Django
* cd backend 
* pipenv shell
* cd crm_backend
* manage.py runserver

## Lancement du frontend Angular
* cd frontend
* npm install
* npm start
* Ouvrir un navigateur sur localhost:4200


# Lancement des tests 

## Selenium 


## Tests unitaires Python


## Tests unitaires Angular
Les tests unitaires Angular sont réalisés grâce au framework Jasmine/Karma.<br> 
Lancez la commande `npm run test` pour lancer les tests unitaires.

# Traduction
La traduction s'exécute via le module i18n qui récupère les élément via un un attribut dans une balise html.
Un document pour chaque langue peut être rédigée.

Pour lancer simplement la traduction anglais par exemple, utiliser la commande :
* `ng serve --configuration=en`
