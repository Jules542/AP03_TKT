const express = require("express");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const mysql = require("mysql2");
const cors = require("cors");
const bcrypt = require("bcrypt");
const saltRound = 10;

const app = express();

app.use(cors());
app.use(express.json());

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: "tkt",
});

connection.connect((error) => {
  if (error) {
    console.error("Erreur connexion BDD " + error.stack);
    return;
  }
});

function verifyToken(req, res, next) {
  const token = req.headers["x-access-token"];
  if (!token) {
    return res.status(403).send({ auth: false, message: "No token provided." });
  }
  jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
    if (err) {
      return res
        .status(500)
        .send({ auth: false, message: "Failed to authenticate token." });
    }
    req.userId = decoded.id;
    req.isAdmin = decoded.isAdmin;
    next();
  });
}

app.post("/login", (req, res) => {
  const { login, password } = req.body;
  connection.query(
    "SELECT idUser, login, password, isAdmin FROM user WHERE login = ?",
    [login],
    (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).send({
          message: "The entered login does not correspond any existing account",
        });
      } else {
        if (results.length > 0) {
          const user = results[0];
          bcrypt.compare(password, user.password, function (err, result) {
            if (result == true) {
              const token = jwt.sign(
                { id: user.idUser, isAdmin: user.isAdmin },
                process.env.JWT_SECRET,
                {
                  expiresIn: 86400,
                }
              );
              res.status(200).send({ auth: true, token: token });
            } else {
              res.status(401).send({ message: "Invalid password" });
            }
          });
        } else {
          res.status(404).send({ message: "User not found" });
        }
      }
    }
  );
});

app.post("/register", verifyToken, (req, res) => {
  if (!req.isAdmin) {
    return res.status(403).send({ message: "Unauthorized" });
  }
  const { nom, prenom, login, password, emploiId } = req.body;
  bcrypt.hash(password, saltRound, function (err, hash) {
    connection.query(
      "INSERT INTO user (nom, prenom, login, password, isAdmin, idEmploiUser) VALUES (?, ?, ?, ?, ?, ?)",
      [nom, prenom, login, hash, 0, emploiId],
      (error) => {
        if (error) {
          console.error(error);
          res.status(500).send({
            message: "An error occurred during registration",
          });
        } else {
          res.status(201).send({ message: "User registered" });
        }
      }
    );
  });
});

app.get("/attractions", (req, res) => {
  connection.query(
    "SELECT idAttraction, imageAttraction, nomAttraction, descAttraction, tailleMinRequise, tailleMinRequise, tailleMinRequiseAccomp, touteLaFamille, sensationForte, theme.libelle FROM attraction INNER JOIN theme ON idTheme = idThemeAttraction",
    (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).send({ message: "An error occurred" });
      } else {
        res.status(200).send(results);
      }
    }
  );
});

app.get("/users", verifyToken, (req, res) => {
  if (!req.isAdmin) {
    return res.status(403).send({ message: "Unauthorized" });
  }
  connection.query(
    "SELECT idUser, login, nom, prenom, isAdmin, nomEmploi, idEmploiUser, COALESCE(COUNT(idUserMission), 0) AS nbMissions FROM user LEFT JOIN emploi ON emploi.id = idEmploiUser LEFT JOIN equipe ON emploi.idEquipe = equipe.idEquipe LEFT JOIN mission ON idUser = idUserMission GROUP BY idUser, login, nom, prenom, isAdmin, nomEmploi, idEmploiUser",
    (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).send({ message: "An error occurred" });
      }
      res.status(200).send(results);
    }
  );
});

app.get("/usersNoAdmin", (req, res) => {
  connection.query(
    "SELECT idUser, login, nom, prenom, isAdmin, nomEquipe, idEmploiUser, COALESCE(COUNT(idUserMission), 0) AS nbMissions FROM user LEFT JOIN emploi ON Emploi.id = idEmploiUser LEFT JOIN equipe ON Emploi.idEquipe = Equipe.idEquipe LEFT JOIN mission ON idUser = idUserMission GROUP BY idUser, login, nom, prenom, isAdmin, nomEquipe, idEmploiUser;",
    (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).send({ message: "An error occurred" });
      }
      res.status(200).send(results);
    }
  );
});

app.put("/user/:id", verifyToken, (req, res) => {
  if (!req.isAdmin) {
    return res.status(403).send({ message: "Unauthorized" });
  }

  const idUser = req.params.id;
  const { nom, prenom, idEmploiUser } = req.body;

  connection.query(
    "UPDATE user SET nom = ?, prenom = ?, idEmploiUser = ? WHERE idUser = ?",
    [nom, prenom, idEmploiUser, idUser],
    (error) => {
      if (error) {
        console.error(error);
        res.status(500).send({ message: "An error occurred" });
      } else {
        res.status(200).send({ message: "User updated" });
      }
    }
  );
});

app.delete("/user/:id", verifyToken, (req, res) => {
  if (!req.isAdmin) {
    return res.status(403).send({ message: "Unauthorized" });
  }

  const idUser = req.params.id;

  connection.query("DELETE FROM user WHERE idUser = ?", [idUser], (error) => {
    if (error) {
      console.error(error);
      res.status(500).send({ message: "An error occurred" });
    } else {
      res.status(200).send({ message: "User deleted" });
    }
  });
});

// CRUD for affecting missions
app.get("/missions", verifyToken, (req, res) => {
  connection.query(
    "SELECT idMission, dateMission, libMission, commentaire, estTerminee, idUserMission, idAttractionMission FROM mission",
    (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).send({ message: "An error occurred" });
      } else {
        res.status(200).send(results);
      }
    }
  );
});

app.post("/missions", verifyToken, (req, res) => {
  const {
    dateMission,
    libMission,
    commentaire,
    estTerminee,
    idUserMission,
    idAttractionMission,
  } = req.body;
  connection.query(
    "INSERT INTO mission (dateMission, libMission, commentaire, estTerminee, idUserMission, idAttractionMission) VALUES (?, ?, ?, ?, ?, ?)",
    [
      dateMission,
      libMission,
      commentaire,
      estTerminee,
      idUserMission,
      idAttractionMission,
    ],
    (error) => {
      if (error) {
        console.error(error);
        res.status(500).send({ message: "An error occurred" });
      } else {
        res.status(201).send({ message: "Mission created" });
      }
    }
  );
});

app.put("/missions/:id", verifyToken, (req, res) => {
  if (!req.isAdmin) {
    return res.status(403).send({ message: "Unauthorized" });
  }
  const idMission = req.params.id;
  const {
    dateMission,
    libMission,
    commentaire,
    estTerminee,
    idUserMission,
    idAttractionMission,
  } = req.body;
  connection.query(
    "UPDATE mission SET dateMission = ?, libMission = ?, commentaire = ?, estTerminee = ?, idUserMission = ?, idAttractionMission = ? WHERE idMission = ?",
    [
      dateMission,
      libMission,
      commentaire,
      estTerminee,
      idUserMission,
      idAttractionMission,
      idMission,
    ],
    (error) => {
      if (error) {
        console.error(error);
        res.status(500).send({ message: "An error occurred" });
      } else {
        res.status(200).send({ message: "Mission updated" });
      }
    }
  );
});

app.delete("/missions/:id", verifyToken, (req, res) => {
  if (!req.isAdmin) {
    return res.status(403).send({ message: "Unauthorized" });
  }
  const idMission = req.params.id;
  connection.query(
    "DELETE FROM mission WHERE idMission = ?",
    [idMission],
    (error) => {
      if (error) {
        console.error(error);
        res.status(500).send({ message: "An error occurred" });
      } else {
        res.status(200).send({ message: "Mission deleted" });
      }
    }
  );
});

//Route GET des équipes
app.get("/equipes", verifyToken, (req, res) => {
  if (!req.isAdmin) {
    return res.status(403).send({ message: "Unauthorized" });
  }

  connection.query(
    "SELECT idEquipe, nomEquipe FROM equipe",
    (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).send({ message: "An error occurred" });
      } else {
        res.status(200).send(results);
      }
    }
  );
});

app.get("/restaurants", verifyToken, (_, res) => {
  connection.query(
    "SELECT id,  nomRestaurant, descRestaurant FROM restaurant",
    (error, results) => {
      if (error) {
        console.error(error);
        res
          .status(500)
          .send({ message: "An error occurred", error: error.message });
      } else {
        res.status(200).send(results);
      }
    }
  );
});

app.get("/emplois", verifyToken, (_, res) => {
  connection.query(
    "SELECT id, nomEmploi, idEquipe FROM emploi",
    (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).send({ message: "An error occurred" });
      } else {
        res.status(200).send(results);
      }
    }
  );
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// REQUETES AVERTISSEMENTS
app.get("/avertissements", (req, res) => {
  connection.query(
    "SELECT idAvertissement, libAvertissement, commentaireAvertissement, idUserAvertissement, idNiveauAvertissement FROM avertissement",
    (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).send({ message: "An error occurred" });
      } else {
        res.status(200).send(results);
      }
    }
  );
});

app.post("/avertissement/add", verifyToken, (req, res) => {
  if (!req.isAdmin) {
    return res.status(403).send({ message: "Unauthorized" });
  }
  const {
    libAvertissement,
    commentaireAvertissement,
    idUserAvertissement,
    idNiveauAvertissement,
  } = req.body;
  connection.query(
    "INSERT INTO avertissement (libAvertissement, commentaireAvertissement, idUserAvertissement, idNiveauAvertissement) VALUES (?, ?, ?, ?)",
    [
      libAvertissement,
      commentaireAvertissement,
      idUserAvertissement,
      idNiveauAvertissement,
    ],
    (error) => {
      if (error) {
        console.error(error);
        res.status(500).send({ message: "An error occurred" });
      } else {
        res.status(201).send({ message: "Avertissement créé" });
      }
    }
  );
});

app.delete("/avertissement/delete/:id", verifyToken, (req, res) => {
  if (!req.isAdmin) {
    return res.status(403).send({ message: "Unauthorized" });
  }
  const idAvertissement = req.params.id;
  connection.query(
    "DELETE FROM avertissement WHERE idAvertissement = ?",
    [idAvertissement],
    (error) => {
      if (error) {
        console.error(error);
        res.status(500).send({ message: "An error occurred" });
      } else {
        res.status(200).send({ message: "Avertissement supprimé" });
      }
    }
  );
});

app.put("/avertissement/update/:id", verifyToken, (req, res) => {
  if (!req.isAdmin) {
    return res.status(403).send({ message: "Unauthorized" });
  }
  const idAvertissement = req.params.id;
  const {
    libAvertissement,
    commentaireAvertissement,
    idUserAvertissement,
    idNiveauAvertissement,
  } = req.body;
  connection.query(
    "UPDATE avertissement SET libAvertissement = ?, commentaireAvertissement = ?, idUserAvertissement = ?, idNiveauAvertissement = ? WHERE idAvertissement = ?",
    [
      libAvertissement,
      commentaireAvertissement,
      idUserAvertissement,
      idNiveauAvertissement,
      idAvertissement,
    ],
    (error) => {
      if (error) {
        console.error(error);
        res.status(500).send({ message: "An error occurred" });
      } else {
        res.status(200).send({ message: "Avertissement modifié" });
      }
    }
  );
});

app.get("/niveaux", (req, res) => {
  connection.query(
    "SELECT idNiveau, libNiveau   FROM niveau",
    (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).send({ message: "An error occurred" });
      } else {
        res.status(200).send(results);
      }
    }
  );
});

// Route pour obtenir les missions en fonction d'un idUser
app.get("/missionsUser/:idUser", verifyToken, (req, res) => {
  const idUser = req.params.idUser; // Utilisez req.params pour récupérer le paramètre de l'URL
  //Requête SQL
  connection.query("SELECT m.idMission, m.dateMission, m.libMission, m.commentaire, m.estTerminee, m.idUserMission, a.nomAttraction, r.nomRestaurant FROM mission m LEFT JOIN restaurant r ON m.idRestaurantMission = r.id LEFT JOIN attraction a ON m.idAttractionMission = a.idAttraction WHERE m.idUserMission = ? AND m.estTerminee = 0 AND (m.idAttractionMission IS NOT NULL OR m.idRestaurantMission IS NOT NULL OR (m.idAttractionMission IS NULL AND m.idRestaurantMission IS NULL));", [idUser], (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).send({ message: "An error occurred" });
    } else {
      res.status(200).send(results);
    }
  });
});

app.put("/missionsUser", verifyToken, (req, res) => {
  const updatedMissionData = req.body; // Les nouvelles données de la mission à mettre à jour

  // Boucle à travers les clés de updatedMissionData et mettez à jour chaque mission individuellement
  Object.keys(updatedMissionData).forEach(idMission => {
    const { estTerminee, commentaire } = updatedMissionData[idMission];

    connection.query(
      "UPDATE mission SET estTerminee = ?, commentaire = ? WHERE idMission = ?",
      [estTerminee, commentaire, idMission],
      (error) => {
        if (error) {
          console.error(error);
          res.status(500).send({ message: "An error occurred" });
          return; // Retournez pour arrêter la boucle et ne pas envoyer de réponse multiple
        }
      }
    );
  });

  // Après avoir mis à jour toutes les missions, envoyez une réponse réussie
  res.status(200).send({ message: "Missions updated" });
});