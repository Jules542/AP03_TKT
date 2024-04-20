import React from 'react'
import axios from 'axios'
import { useEffect, useState, useContext } from 'react';
import CloseIcon from '../common/icons/CloseIcon';
import { Link } from 'react-router-dom';
import { UserContext } from "../../context/UserContext";

const Avertissement = ({avertissement, users, niveaux, fetchData}) => {
  const { isLoggedIn, isAdmin } = useContext(UserContext);
  const user = users.find((user) => user.idUser === avertissement.idUserAvertissement);
  const niveau = niveaux.find((niveau) => niveau.idNiveau === avertissement.idNiveauAvertissement);
  const [editing, setEditing] = useState(false);
  const [editedAvertissement, setEditedAvertissement] = useState(avertissement);
  const handleDelete = () => {
    const token = localStorage.getItem("token");
    axios
      .delete(`http://localhost:3000/avertissement/delete/${avertissement.idAvertissement}`, {
        headers: {
          "Content-Type": "application/json",
          "x-access-token": `${token}`,
        },
      })
      .then(() => {
        fetchData();
      });
  }

  useEffect(() => {
    setEditedAvertissement({
      ...avertissement,
    });
  }, []);


  const handleInputChange = (event) => {
    setEditedAvertissement({
      ...editedAvertissement,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    console.log(editedAvertissement)
    const token = localStorage.getItem("token");
    event.preventDefault();
    axios
      .put(
        `http://localhost:3000/avertissement/update/${editedAvertissement.idAvertissement}`,
        editedAvertissement,
        {
          headers: {
            "Content-Type": "application/json",
            "x-access-token": `${token}`,
          },
        }
      )
      .then(() => {
        fetchData();
      });
    setEditing(false);
  };

  return (
      <div className="avertissement-wrapper-card">
            {editing ? (
              <>
              <div className="avertissement-wrapper-libelle-edit"><h3>Libelle de l'avertissement :</h3></div>
              <div className="avertissement-wrapper-libelle-edit">
              <input
                  type="text"
                  value={editedAvertissement.libAvertissement}
                  onChange={(e) =>
                    setEditedAvertissement({
                      ...editedAvertissement,
                      libAvertissement: e.target.value,
                    })
                  }
                />
              </div>
              <div className="avertissement-wrapper-commentaire-edit"><h3>Commentaire de l'avertissement :</h3></div>
              <div className="avertissement-wrapper-commentaire-edit">
              <input
                    type="text"
                    value={editedAvertissement.commentaireAvertissement}
                    onChange={(e) =>
                      setEditedAvertissement({
                        ...editedAvertissement,
                        commentaireAvertissement: e.target.value,
                      })
                    }
                  />
                  </div>
                  <div className="avertissement-wrapper-user-edit"><h3>Utilisateur :</h3></div>
                  <div className="avertissement-wrapper-user-edit">
                  <select
                    value={editedAvertissement.idUserAvertissement}
                    onChange={(e) =>
                      setEditedAvertissement({
                        ...editedAvertissement,
                        idUserAvertissement: e.target.value,
                      })
                    }
                  >
                    {users.map((user) => (
                      <option key={user.idUser} value={user.idUser}>
                        {user.nom} {user.prenom}
                      </option>
                    ))}
                  </select>
                  </div>
                  <div className="avertissement-wrapper-niveau-edit"><h3>Niveau :</h3></div>
                  <div className="avertissement-wrapper-niveau-edit">
                <select
                    value={editedAvertissement.idNiveauAvertissement}
                    onChange={(e) =>
                      setEditedAvertissement({
                        ...editedAvertissement,
                        idNiveauAvertissement: e.target.value,
                      })
                    }
                  >
                    {niveaux.map((niveau) => (
                      <option key={niveau.idNiveau} value={niveau.idNiveau}>
                        {niveau.libNiveau}
                      </option>
                    ))}
                  </select>
                  </div>
                  <div className="avertissement-wrapper-actions">
                    <button onClick={handleSubmit} className='avertissement-wrapper-edit'>Save</button>
                    <button onClick={() => setEditing(false)} className='avertissement-wrapper-edit'>Cancel</button>
                  </div>
                  
              </>
            ) : (
              <>
              <div className="avertissement-wrapper-libelle"><h3>Libelle de l'avertissement :</h3>
                {isLoggedIn() && isAdmin() ? (
                  <Link onClick={handleDelete}><CloseIcon></CloseIcon></Link>
                ) : null}
              </div>
              <div className="avertissement-wrapper-libelle">{avertissement.libAvertissement}</div>
              <br/>
              <div className="avertissement-wrapper-commentaire"><h3>Commentaire de l'avertissement :</h3></div>
              <div className="avertissement-wrapper-commentaire"><p>{avertissement.commentaireAvertissement}</p></div>
              <br/>
              <div className="avertissement-wrapper-user"><h3>Utilisateur :</h3></div>
              <div className="avertissement-wrapper-user">
                          {user
                            ? `${user.nom} ${user.prenom}`
                            : "Utilisateur non trouvé"}
                          </div>
              <br/>
              <div className="avertissement-wrapper-niveau"><h3>Niveau :</h3></div>
              <div className="avertissement-wrapper-niveau">
                          {niveau
                            ? `${niveau.libNiveau}`
                            : "Niveau non trouvée"}
                            {isLoggedIn() && isAdmin() ? (
                              <Link onClick={() => setEditing(true)} className='avertissement-wrapper-edit'>Edit</Link>
                            ) : null}
              </div>
              <br/>

              <br/>
          </>
          )}
          </div>
    )
}

export default Avertissement;
