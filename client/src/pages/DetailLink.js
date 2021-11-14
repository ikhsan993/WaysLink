// react components
import {React,useContext} from 'react';
import { useQuery } from "react-query";
import { API } from "../config/api";
import { UserContext } from "../context/userContext";
// assets
import facebook from '../assets/img/facebook.svg'
import twitter from '../assets/img/twitter.png'
import instagram from '../assets/img/instagram.png'
import youtube from '../assets/img/youtube.svg'
import whatsapp from '../assets/img/whatsapp.png'
import { Link,useHistory,useParams } from 'react-router-dom';

export default function DetailLink() {
  let history = useHistory();
  let api = API();
  let { id } = useParams();
  let addLink = ()=>{history.push("/add-link")}
  const [state, dispatch] = useContext(UserContext)

    let { data: link, refetch} = useQuery("linkCache", async () => {
        const config = {
        method: "GET",
        headers: {Authorization: "Basic " + localStorage.token,},
        };
    const response = await api.get("/link/" + id, config);
    return response.data;
    });

  return (
    <>
      <div className="container-fluid bg-white home-container mt-5 text-center ">
        <div className = "col-8 mx-auto my-auto">
          <img src={link?.thumbnail} width="100px" height="100px" className="round" />
          <h3 className="mt-2">{link?.brand.title}</h3>
          <p className="mt-2 "> {link?.brand.description} </p>

          <Link to={{ pathname: "https://" + link?.facebook}} target="_blank" >
            <div className="row bg-black text-white mt-3 ">
              <div className="col-2">
                <img src={facebook} width="50px" height="50px" />
              </div>
              <div className="col-9">
                <p className="text-center pt-2">facebook</p>
              </div>
            </div>
          </Link>

          <Link to={{ pathname: "https://" + link?.twitter}} target="_blank" >
            <div className="row bg-black text-white mt-3">
              <div className="col-2">
              <img src={twitter} width="50px" height="50px" />
              </div>
              <div className="col-9">
                <p className="text-center pt-2">twitter</p>
              </div>
            </div>
          </Link>

          <Link to={{ pathname: "https://" + link?.instagram}} target="_blank" >
            <div className="row bg-black text-white mt-3">
              <div className="col-2">
                <img src={instagram} width="50px" height="50px" />
              </div>
              <div className="col-9">
                <p className="text-center pt-2">instagram</p>
              </div>
            </div>
          </Link>

          <Link to={{ pathname: "https://" + link?.youtube}} target="_blank" >
            <div className="row bg-black text-white mt-3">
              <div className="col-2">
                <img src={youtube} width="50px" height="50px" />
              </div>
              <div className="col-9">
                <p className="text-center pt-2">youtube</p>
              </div>
            </div>
          </Link>

          <Link to={{ pathname: "https://wa.me/" + link?.whatsapp}} target="_blank" >
            <div className="row bg-black text-white mt-3">
              <div className="col-2">
                <img src={whatsapp} width="50px" height="50px" />
              </div>
              <div className="col-9">
                <p className="text-center pt-2">whatsapp</p>
              </div>
            </div>
          </Link>
          
        </div>
      </div>  
    </>
  )
}
