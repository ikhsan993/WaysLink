// react components
import {React} from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { useQuery } from "react-query";
import { API } from "../config/api";
// assets
import phone1 from '../assets/img/phone1.png'
import phone2 from '../assets/img/phone2.png'
import phone3 from '../assets/img/phone3.png'
import phone4 from '../assets/img/phone4.png'
import { Link,useHistory } from 'react-router-dom';

export default function Home() {
  let history = useHistory();
  let api = API();
  let addLink = ()=>{history.push("/add-link")}

  return (
    <>
      <div className="container-fluid main-bg ">
      <Header/>
        <div className="row">
          <Sidebar/>
          <div className="col-9 home-container">
            <div className="templates mt-5">
                <img className="template cursor-pointer" onClick={addLink} src={phone1} alt="" />
                <img className="template cursor-pointer" onClick={addLink} src={phone2} alt="" />
                <img className="template cursor-pointer" onClick={addLink} src={phone3} alt="" />
                <img className="template cursor-pointer" onClick={addLink} src={phone4} alt="" />
            </div>
          </div>
        </div>
      </div>  
    </>
  )
}
