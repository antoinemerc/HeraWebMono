# HeraWeb

Pour commencer cloner ce repo dans le dossier de votre choix

# Setup

## Pré  requis:

  - Java jdk v1.8.0_181 (java -version pour vérifier)
  - Node.js v8.11.3 (node --version pour vérifier)
  - NPM v6.4.1 (npm --version pour vérifier)
  - Git v2.10.2 (latest) (git --version pour vérifier)
  
Si vous souhaitez utiliser une base de donnée locale instaler la dernière version de MongoDB (4.0) et remplacer les lignes 46 et 47 du fichier /src/main/ressources/config/application-dev.yaml avec vos données 
  
  - uri: mongodb://localhost:*votre numéro de port*  
  - database: *votre base de donnée*
  
Cela peut être utile pour faire des test sur les modèles

## Lancement

Pour lancer le projet sur votre machine:

Lancer un terminal dans jhipster-registry et exécuter

    .\mvnw


Lancer dans HeraWebsite sur un terminal
  
    npm install
    
Attendez que l'opération finnise avant d'éxecuter dans deux terminaux

    .\mvnw
    npm start

Le projet est maintenant lancé sur http://localhost:9000

## Base de données

Base de données mongodb distante: 
  - String de connection de la bd disponible dans \HeraWebsite\src\main\resources\config\application-dev.yaml
  
Base de données hébergé par https://mlab.com
Connection au compte avec:
  - Login: TeamEcom
  - Pwd: Ecom2018
  
## Déploiement

Pour déployer l'application, on utilisera docker et docker compose pour générer une image qu'on peut mettre sur n'importe quel environnement
Pour générer l'application en mode production et en .war:

    ./mvnw package -Pprod verify jib:dockerBuild -DskipTests

Pour lancer l'image docker:

     docker-compose -f src/main/docker/app.yml up

Vous aurez deux images: herashop et jhipster registery ces deux docker image doivent être lancée pour que l'application fonctionne

  
  
  
  
