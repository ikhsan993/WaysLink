import {React,useState,useContext} from 'react'
import {Link,useHistory} from "react-router-dom";
import { UserContext } from "../context/userContext";
import { useQuery } from "react-query";
import { API } from "../config/api";

import logout1 from '../assets/img/logout 1.png'
import template from '../assets/img/template.png'
import user1 from '../assets/img/user.png'
import link from '../assets/img/link.png'

export default function Sidebar() {
 
  let api = API();
  const [state, dispatch] = useContext(UserContext);
  let history = useHistory()
  const logout = (e) => {
    e.preventDefault();
    dispatch({type: "LOGOUT"})
    }


  return (
    <>
      <div className="col-3 px-3 bg-white d-height">
          <div className="row d-flex ms-3 mt-5 ">
              <div className="col-2 text-left">
                  <img className="ico" src={template} alt="" />
              </div>
              <div className="col-9 text-left mb-5 link">
                  <Link to="/home">Template</Link>
              </div>
              <div className="col-2 text-left "> 
                  <img className ="ico" src={user1} alt="" />
              </div>
              <div className="col-9 text-left mb-5 link">
                  <Link to="/profile">Profile</Link>
              </div>
              <div className="col-2 text-left "> 
                  <img className ="ico" src={link} alt="" />
              </div>
              <div className="col-9 text-left mb-5 link">
                  <Link to="/links">Link</Link>
              </div>
          </div>
          <div className="row ms-3 logout">              
              <div className="col-2 text-left">
                  <img className ="ico" src={logout1} alt="" />
              </div>
              <div className="col-9 text-left link cursor-pointer">
                  <p onClick = {logout} >Logout</p>
              </div>
              </div>
      </div>        
    </>
  )
}
