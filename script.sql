-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : lun. 22 avr. 2024 à 11:23
-- Version du serveur : 8.2.0
-- Version de PHP : 7.4.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `tkt`
--

-- --------------------------------------------------------

--
-- Structure de la table `attraction`
--

DROP TABLE IF EXISTS `attraction`;
CREATE TABLE IF NOT EXISTS `attraction` (
  `idAttraction` int NOT NULL AUTO_INCREMENT,
  `imageAttraction` varchar(255) NOT NULL,
  `nomAttraction` varchar(255) NOT NULL,
  `descAttraction` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `tailleMinRequise` int NOT NULL,
  `tailleMinRequiseAccomp` int DEFAULT NULL,
  `touteLaFamille` tinyint(1) NOT NULL,
  `sensationForte` tinyint(1) NOT NULL,
  `idThemeAttraction` int DEFAULT NULL,
  PRIMARY KEY (`idAttraction`),
  KEY `fk1` (`idThemeAttraction`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `attraction`
--

INSERT INTO `attraction` (`idAttraction`, `imageAttraction`, `nomAttraction`, `descAttraction`, `tailleMinRequise`, `tailleMinRequiseAccomp`, `touteLaFamille`, `sensationForte`, `idThemeAttraction`) VALUES
(1, 'https://assets.afcdn.com/story/20170626/1099307_w4300h2418c1cx2157cy1442.jpg', 'Pegase Express', 'Embarquez avec nous sur le Pégase Express, la montagne russe la plus ébouriffante du Parc Astérix. Chicanes, creux, bosses... On ne va pas en faire des wagons mais, vous sortirez de cette attraction... médusés.Embarquez avec nous sur le Pégase Express, la montagne russe la plus ébouriffante du Parc Astérix. Chicanes, creux, bosses... On ne va pas en faire des wagons mais, vous sortirez de cette attraction... médusés.', 130, 100, 1, 0, 1),
(2, 'https://www.lepoint.fr/images/2016/04/11/3585492lpw-3585510-article-jpg_3486293_1250x625.jpg', 'Discobélix', 'Tout le monde le sait, Obélix est tombé dans la marmite de potion quand il était petit… et ça l’a doté d’une force légendaire. Quand il décide de lancer un disque géant, celui-ci tourne, tourne, tourne et ne s\'arrête plus, créant un mouvement perpétuel pr', 120, NULL, 1, 0, 1),
(3, 'https://lh3.googleusercontent.com/p/AF1QipOybYCaSnSpj2qarJDKlOP9SQ59gh5s9fXg_HST=s680-w680-h510', 'OzIris', 'Lancés à pleine vitesse à 40 m de hauteur sur ces montagnes russes inversées, vous enchaînez les loopings et vrilles au cœur du Parc. Le ciel ne va peut-être pas vous tomber sur la tête mais vous risquez quand même de voir quelques étoiles !', 140, NULL, 0, 1, 2),
(4, 'https://www.parcasterix.fr/sites/default/files/styles/attraction_detail/public/images/attractions/haut/la-galere-1_0.jpg.webp?itok=dYUisnbg', 'La galère', 'Au cœur d\'une énorme tempête, seul votre courage empêchera le bateau de chavirer !', 20, 20, 1, 0, 3);

-- --------------------------------------------------------

--
-- Structure de la table `avertissement`
--

DROP TABLE IF EXISTS `avertissement`;
CREATE TABLE IF NOT EXISTS `avertissement` (
  `idAvertissement` int NOT NULL,
  `libAvertissement` varchar(255) NOT NULL,
  `commentaireAvertissement` longtext NOT NULL,
  `idUserAvertissement` int NOT NULL,
  `idNiveauAvertissement` int NOT NULL,
  PRIMARY KEY (`idAvertissement`),
  KEY `FK_idUserAvertissement` (`idUserAvertissement`),
  KEY `FK_idNiveauAvertissement` (`idNiveauAvertissement`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `emploi`
--

DROP TABLE IF EXISTS `emploi`;
CREATE TABLE IF NOT EXISTS `emploi` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nomEmploi` varchar(255) NOT NULL,
  `idEquipe` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk1` (`idEquipe`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `emploi`
--

INSERT INTO `emploi` (`id`, `nomEmploi`, `idEquipe`) VALUES
(1, 'Maintenance attraction', 1),
(2, 'Conseiller vendeur billeterie', 3),
(3, 'Vendeur conseil', 3),
(4, 'Manager boutique', 3);

-- --------------------------------------------------------

--
-- Structure de la table `equipe`
--

DROP TABLE IF EXISTS `equipe`;
CREATE TABLE IF NOT EXISTS `equipe` (
  `idEquipe` int NOT NULL AUTO_INCREMENT,
  `nomEquipe` varchar(255) NOT NULL,
  PRIMARY KEY (`idEquipe`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `equipe`
--

INSERT INTO `equipe` (`idEquipe`, `nomEquipe`) VALUES
(1, 'Technique'),
(2, 'Accueil'),
(3, 'Commerce');

-- --------------------------------------------------------

--
-- Structure de la table `metier`
--

DROP TABLE IF EXISTS `metier`;
CREATE TABLE IF NOT EXISTS `metier` (
  `idMetier` int NOT NULL AUTO_INCREMENT,
  `nomMetier` varchar(255) NOT NULL,
  `idEquipeMetier` int NOT NULL,
  PRIMARY KEY (`idMetier`),
  KEY `FK_idEquipeMetier` (`idEquipeMetier`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `mission`
--

DROP TABLE IF EXISTS `mission`;
CREATE TABLE IF NOT EXISTS `mission` (
  `idMission` int NOT NULL AUTO_INCREMENT,
  `dateMission` date NOT NULL,
  `libMission` varchar(255) NOT NULL,
  `commentaire` longtext NOT NULL,
  `estTerminee` tinyint(1) NOT NULL,
  `idAttractionMission` int DEFAULT NULL,
  `idUserMission` int NOT NULL,
  `idRestaurantMission` int DEFAULT NULL,
  PRIMARY KEY (`idMission`,`dateMission`),
  KEY `FK_idAttractionMission` (`idAttractionMission`),
  KEY `FK_idUserMission` (`idUserMission`),
  KEY `fk1` (`idRestaurantMission`)
) ENGINE=MyISAM AUTO_INCREMENT=40 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `mission`
--

INSERT INTO `mission` (`idMission`, `dateMission`, `libMission`, `commentaire`, `estTerminee`, `idAttractionMission`, `idUserMission`, `idRestaurantMission`) VALUES
(38, '2025-05-05', 'Préparer le lancement de l\'attraction', 'Préparer le lancement de l\'attraction', 0, 2, 1, NULL),
(36, '2024-04-11', 'Danser la Macarena', '', 0, 3, 1, NULL),
(35, '2024-04-13', 'Nettoyer les chiottes', 'Nettoyer les chiottes', 0, NULL, 2, 1);

-- --------------------------------------------------------

--
-- Structure de la table `niveau`
--

DROP TABLE IF EXISTS `niveau`;
CREATE TABLE IF NOT EXISTS `niveau` (
  `idNiveau` int NOT NULL,
  `libNiveau` varchar(255) NOT NULL,
  PRIMARY KEY (`idNiveau`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `restaurant`
--

DROP TABLE IF EXISTS `restaurant`;
CREATE TABLE IF NOT EXISTS `restaurant` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nomRestaurant` varchar(255) NOT NULL,
  `descRestaurant` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `restaurant`
--

INSERT INTO `restaurant` (`id`, `nomRestaurant`, `descRestaurant`) VALUES
(1, 'Le restaurant du lac', 'LA bonne adresse pour déguster du sanglier !');

-- --------------------------------------------------------

--
-- Structure de la table `theme`
--

DROP TABLE IF EXISTS `theme`;
CREATE TABLE IF NOT EXISTS `theme` (
  `idTheme` int NOT NULL AUTO_INCREMENT,
  `libelle` varchar(255) NOT NULL,
  PRIMARY KEY (`idTheme`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `theme`
--

INSERT INTO `theme` (`idTheme`, `libelle`) VALUES
(1, 'Grecque Antique'),
(2, 'Egypte'),
(3, 'Viking');

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `idUser` int NOT NULL AUTO_INCREMENT,
  `nom` varchar(255) NOT NULL,
  `prenom` varchar(255) NOT NULL,
  `login` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `isAdmin` tinyint(1) NOT NULL,
  `idEmploiUser` int NOT NULL,
  PRIMARY KEY (`idUser`),
  KEY `FK_idEquipeUser` (`idEmploiUser`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `user`
--

INSERT INTO `user` (`idUser`, `nom`, `prenom`, `login`, `password`, `isAdmin`, `idEmploiUser`) VALUES
(1, 'Chauvel', 'Elvin', 'chauvele', '$2b$10$W3WehxuhgXVqPBbU55gavurRwg9FaT4TpVGZ3d9kA1gCwLBXr64ea', 1, 1),
(2, 'Inan', 'Sami', 'inans', '$2b$10$9vjK589jeXw9GzjDv6eRNez3rvb3LCJ8d2zogVKuPNMOoYJnn7Kci', 1, 4),
(3, 'Ribeiro', 'Jules', 'julesr', '$2b$10$eO.jVKfPG1f6Wma30.q/6OJuCmMf3gIG/U0Mh4uV2Meow.riuhRem', 1, 4),
(4, 'Chauda', 'Bob', 'admin123', '$2b$10$amjDJwXggjNRdNfCk4Q9uOMulvXR3r6cXDclUL5y.BKpreTf1kkfS', 1, 1),
(5, 'Mbappé', 'Killyan', 'kiki', '$2b$10$QdfdS6DAsN2JJeYprjMgLu90FLCD4Un7XIwH1qZ9mlFEmOmCVIxsm', 0, 1),
(6, 'Musk', 'Elon', 'elonm', '$2b$10$3FtsGJQv/ec9QmDxdRcpk.FZqvAsid.2CZKNJE1XBMg4LMNpA.f6i', 0, 4);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
