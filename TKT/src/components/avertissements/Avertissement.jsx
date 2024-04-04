import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import deleteImgDark from '../../assets/deleteIconDark.png';
import { useContext } from 'react';
import deleteImgWhite from '../../assets/deleteIconWhite.png';
import { ThemeContext } from '../../context/ThemeContext';

const Avertissement = ({avertissement, users, niveaux, fetchData}) => {
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
    <div className="avertissement-wrapper">
      <div class="avertissement-wrapper-title">Libelle de l'avertissement</div>
      <div class="avertissement-wrapper-value">{avertissement.libAvertissement}</div>
      <div class="avertissement-wrapper-title">Commentaire de l'avertissement</div>
      <div class="avertissement-wrapper-value">{avertissement.commentaireAvertissement}</div>
      <div class="avertissement-wrapper-title">Utilisateur</div>
      <div class="avertissement-wrapper-value">
                  {user
                    ? `${user.nom} ${user.prenom}`
                    : "Utilisateur non trouvé"}
                  </div>
      <div class="avertissement-wrapper-title">Niveau</div>
      <div class="avertissement-wrapper-value">
                  {niveau
                    ? `${niveau.libNiveau}`
                    : "Niveau non trouvée"}
                  </div>
      <div class="avertissement-wrapper-title">Actions</div>

            {editing ? (
              <>
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
                  <button onClick={handleSubmit}>Save</button>
                  <button onClick={() => setEditing(false)}>Cancel</button>
              </>
            ) : (
              <>
                  <div class="avertissement-wrapper-value">
                <button onClick={() => setEditing(true)}>Edit</button></div>
                {useContext(ThemeContext).isDark == true?(
                  <div><img src={deleteImgWhite} onClick={handleDelete}></img></div>
                ) : (
                  <div><img src={deleteImgDark} onClick={handleDelete}></img></div>
                )}
            </>
            )}
    </div>
  )
}

export default Avertissement
