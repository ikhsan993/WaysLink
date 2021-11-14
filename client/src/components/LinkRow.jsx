// React Component
import { React ,useEffect, useState } from "react";
import Dropdown from 'react-bootstrap/Dropdown';
import { useQuery,useMutation } from "react-query";
import {useHistory,useParams} from "react-router-dom";
import { API } from "../config/api";
import {Modal} from 'react-bootstrap';

import DeleteBrand from '../components/DeleteBrand';

// Assests
import Visit from '../assets/img/View.png'
import Edit from '../assets/img/Edit.png'


export default function LinkRow({ item, idx}) {

  let api = API();
  let history = useHistory()
  const detailLink = ()=>{history.push("/detail-link/" + item.id)}
  const editLink = ()=>{history.push("/edit-link/" + item.id)}

  let id = item.id

  const [idDelete, setIdDelete] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);

  const [showDelete, setShowDelete] = useState(false);
  const handleCloseDelete = () => setShowDelete(false);
  const handleShowDelete = () => setShowDelete(true);
  const handleDelete = (id) => {
  setIdDelete(id);
  handleShowDelete();
  };

  const deleteById = useMutation(async (id) => {
    try {
      const config = {
        method: "DELETE",
        headers: {Authorization: "Basic " + localStorage.token,},
      };
      const response = await api.delete(`/brand/${id}`, config);
      console.log(response)
    } catch (error) {
      console.log(error);
    }
  });

  useEffect(() => {
    if (confirmDelete) {
      handleCloseDelete();
      deleteById.mutate(idDelete);
      setConfirmDelete(null);
    }
  }, [confirmDelete]);

const deleteId = () => {handleDelete(id);}

  return (
    <>
    <div className="col-2">
    <img src={item.thumbnail} height="100px" width="100px"/>
    </div>
    <div className="col-4">
      <p className="fs-4 bold">{item.title}</p>
      <p className="text-grey"> {item.link}</p>
    </div>
        <div className="col-3">
      <p className="fs-4 bold">{item.visits}</p>
      <p className="text-grey"> Visit</p>
    </div>
    <div className="col-1" onClick={detailLink}>
    <img src={Visit} className="cursor-pointer" />
    </div>
    <div className="col-1 cursor-pointer" onClick={editLink}>
    <img src={Edit} />
    </div>
    <div className="col-1 cursor-pointer">
    <DeleteBrand setConfirmDelete={setConfirmDelete} showDelete={showDelete} handleCloseDelete={handleCloseDelete}  deleteId={deleteId}/>
    </div>
  </>
)}
