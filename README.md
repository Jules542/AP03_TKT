# **React TKT**
![image](https://upload.wikimedia.org/wikipedia/fr/archive/c/c0/20200130223812%21Logo_Parc_Ast%C3%A9rix_2020.png)

Le directeur général du parc, désire équiper les salariés avec une application web interne à la société, l’objectif mettre en place une solution facile d’utilisation pour faire gagner du temps dans les activités de toutes les équipes du parc.

## Fonctionnalités

- **Page de connexion Admin/User**: Affichage différent en fonction du compte connecté
- **Présentation des attractions du parc**: Affichage des attractions avec possibilité de filtrer
- **Affichage des missions à réaliser par l’utilisateur connecté**: Possibilité à l'utilisateur de valider une mission effectuée ou de laisser un commentaire
- **Affichage de la liste de toutes les missions pour l'administrateur**: Possibilité d'ajouter une mission et de l'attribuer à un utilisateur
- **Gestion des alertes par l'admin**: Ajout, modification ou suppression d'une alerte
- **Afficher les alertes pour les utilisateurs**: Les utilisateurs doivent pouvoir voir les alertes créées
- **Gestion des utilisateurs par l'admin**: Ajout, modification ou suppression d'un compte


## Technologies

![REACT](https://img.shields.io/badge/-ReactJs-61DAFB?logo=react&logoColor=white&style=for-the-badge)
![MySQL](https://img.shields.io/badge/MySQL-8-red?style=for-the-badge)
![JAVASCRIPT](https://img.shields.io/badge/JS-ECMAscript6-ffdb58?style=for-the-badge)
![NODE.JS](https://img.shields.io/badge/node.js-%2343853D.svg?style=for-the-badge&logo=node-dot-js&logoColor=white)

## Installation

1. Clonez le projet depuis le dépôt GitHub :

   ```bash
   git clone https://github.com/Jules542/AP03_TKT.git
   ```

2. Installation de la base de données MySQL en local

    ```bash
    2.1 - Récupérez le fichier `script.sql` depuis le dossier du projet.

    2.2 - Créez une base de données vide nommée "tkt".

    2.3 - Importez les données du fichier dans cette base de données.
    ```

3. Installer les packages nécessaires via un terminal :

    ### Pour l'API :
    cd API
    npm i bcrypt cors dotenv express jsonwebtoken mysql2 react-toastify nodemon
    ### Démarrer l'API :
    nodemon

    ### Pour le projet React :
    cd TKT
    npm i axios jwt-decode react react-dom react-router-dom react-toastify
    ### Démarrer le projet :
    npm run dev

## Jeu de test

    Un compte admin a été créé dans la base de données : 
    Login = "admin123"
    Password = "admin123"

## Auteurs

- [@Jules542](https://github.com/Jules542)
- [@VulqyFR](https://github.com/VulqyFR)
- [@C4SAM](https://github.com/C4SAM)
