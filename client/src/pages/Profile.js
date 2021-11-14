// react components
import {React,useState,useContext,useEffect }from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { useQuery } from "react-query";
import { API } from "../config/api";
import { useMutation } from "react-query";
import { Link,useHistory } from 'react-router-dom';

import { UserContext } from "../context/userContext";
import DeleteAccount from '../components/DeleteAccount';

// assets

export default function Profile() {


    let history = useHistory();
    let api = API();
    const [profile, setProfile] = useState({});

    const [form,setForm] = useState({
        name : '',
        email :'',
    });

    const [idDelete, setIdDelete] = useState(null);
    const [confirmDelete, setConfirmDelete] = useState(null);
    const [showDelete, setShowDelete] = useState(false);
    const handleCloseDelete = () => setShowDelete(false);
    const handleShowDelete = () => setShowDelete(true);
    const [state, dispatch] = useContext(UserContext);
    const logout = () => {
    dispatch({type: "LOGOUT"})
    }

    let {dataProfile, refetch} = useQuery("profileCache", async () => {
        const config = {
        method: "GET",
        headers: {Authorization: "Basic " + localStorage.token,},
        };

    const response = await api.get("/profile", config);
      setForm({
      name: response.data.name,
      email: response.data.email,
    });
    setProfile(response.data);
    });

 const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();
      const body = JSON.stringify(form);
      const config = {
        method: "PATCH",
        headers: {"Content-Type": "application/json",
        Authorization: "Basic " + localStorage.token,},
        body: body,
      };

      const response = await api.patch("/profile", config);

    } catch (error) {
      console.log(error)
     }
  });

  const id = profile?.id; 
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
      const response = await api.delete(`/profile/${id}`, config);
      logout();
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

const deleteId = (e) => {
  e.preventDefault();
 handleDelete(id);}

  return (
    <>
      <div className="container-fluid main-bg">
      <Header/>
        <div className="row">
          <Sidebar/>
          <div className="col-9 home-container">
          <div className="row mt-5 px-4">
           <h3> My Information </h3>
              <div className="col px-2 py-2 bg-white br px-4 py-5 mt-5">          
              <form>
                        <div className="">
                            <label htmlFor="exampleInputEmail1" className="text-grey">Name</label>
                            <input type="text"  onChange={handleChange} name="name" value={form.name} className="form-link text-black" id="title" aria-describedby="emailHelp" placeholder="Name" />
                        </div>
                        <div className="mt-5">
                            <label htmlFor="exampleInputPassword1" className="text-grey">Email</label>
                            <input type="email" onChange={handleChange} name="email" value={form.email} className="form-link" id="exampleInputPassword1" placeholder="Email" />
                        </div>
                    
                    <div className ="mt-5 right">
                    <button className="btn text-light bg-yellow me-5 bold py-2 px-4 br " onClick={(e) => handleSubmit.mutate(e)} >Save Account</button>
                    <DeleteAccount setConfirmDelete={setConfirmDelete} showDelete={showDelete} handleCloseDelete={handleCloseDelete}  deleteId={deleteId}/>
                    </div>
                    </form>
              </div>
            <div className="templates mt-5">
            </div>
            </div>
          </div>
        </div>
      </div>  
    </>
  )
}
