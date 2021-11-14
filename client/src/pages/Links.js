// react components
import {React,useState,useContext }from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { useQuery } from "react-query";
import { API } from "../config/api";
import { UserContext } from "../context/userContext";

import LinkRow from '../components/LinkRow';

// assets
import phone1 from '../assets/img/phone1.png'
import phone2 from '../assets/img/phone2.png'
import phone3 from '../assets/img/phone3.png'
import phone4 from '../assets/img/phone4.png'
import { Link,useHistory } from 'react-router-dom';

export default function Links() {

  let history = useHistory();
  let api = API();
  let addLink = ()=>{history.push("/add-link")}
  const [state, dispatch] = useContext(UserContext)

    let { data: brands, refetch} = useQuery("brandsCache", async () => {
        const config = {
        method: "GET",
        headers: {Authorization: "Basic " + localStorage.token,},
        };

    const response = await api.get("/brands", config);
    return response.data.brands;

    });

  return (
    <>
      <div className="container-fluid main-bg">
      <Header/>
        <div className="row">
          <Sidebar/>
          <div className="col-9 home-container">
          <div className="row mt-5">
              <div className="col-3 ps-5 mt-3">          
              <h3> All Links <span className="px-2 fs-4 py-0 bg-yellow text-white round ">{brands?.length}</span> </h3>
              </div>
              <div className="col-7">
              <input type="text" className="form-link main-bg" placeholder="Find your link"/>
              </div>
              <div className="col-2 mt-3">
                <button className="btn bg-yellow text-white bold br px-4">Search</button>
              </div>
            <div className="templates mt-5">
            </div>

                  {brands?.map((item, index) => (
                    <div className="row px-4" key={item.id}>
                    <LinkRow item={item} idx={index} />
                    </div>
                  ))} 
                
            </div>
          </div>
        </div>
      </div>  
    </>
  )
}
