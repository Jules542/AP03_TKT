import React, { useContext, useEffect, useState } from "react";
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import { redirect, useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import { Slide } from 'react-toastify';


const NouveauAvertissement = () => {
    
    const notify = () => toast.success("Avertissement ajouté avec succès !", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Slide,
    });
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [niveaux, setNiveaux] = useState([]);
    const [formData , setFormData] = useState({
        libAvertissement: "",
        commentaireAvertissement: "",
        idUserAvertissement: users[0]?.idUser,
        idNiveauAvertissement: niveaux[0]?.idNiveau,
    });
    const handleChange = (event) => {
        const value =
        event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;
        setFormData({
        ...formData,
        [event.target.name]: value,
    });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .post("http://localhost:3000/avertissement/add", formData, {
                headers: {
                    "x-access-token": `${token}`,
                },
            })
            .then((response) => {
                console.log(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
            console.log(formData)
            navigate("/avertissements")
    }

    useEffect(() => {
        axios
            .get("http://localhost:3000/users", {
                headers: {
                  "Content-Type": "application/json",
                  "x-access-token": token,
                },
            })
            .then((response) => {
                setUsers(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
        axios
            .get("http://localhost:3000/niveaux", {
                headers: {
                    "Content-Type": "application/json",
                    "x-access-token": token,
                },
            })
            .then((response) => {
                setNiveaux(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="libAvertissement"
        value={formData.libAvertissement}
        onChange={handleChange}
      />
      <input
        type="text"
        name="commentaireAvertissement"
        value={formData.commentaireAvertissement}
        onChange={handleChange}
      />
      <select
        name="idUserAvertissement"
        value={formData.idUserAvertissement}
        onChange={handleChange}
      >
        <option value="0">-- Selectionner un utilisateur </option>
        {Array.isArray(users) &&
          users.map((user, index) => (
            <option key={index} value={user.idUser}>
              {user.nom} {user.prenom}
            </option>
          ))}
      </select>
      <select
        name="idNiveauAvertissement"
        value={formData.idNiveauAvertissement}
        onChange={handleChange}
      >
        <option value="0">-- Selectionner un niveau </option>
        {Array.isArray(niveaux) &&
          niveaux.map((niveau, index) => (
            <option key={index} value={niveau.idNiveau}>
              {niveau.libNiveau}
            </option>
          ))}
      </select>
      <button onClick={notify} type="submit">Submit</button>
    </form>
  );
};

export default NouveauAvertissement
