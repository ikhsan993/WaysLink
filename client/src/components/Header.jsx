import React from 'react';
import {Link,useHistory} from "react-router-dom";
import Icon from '../assets/img/Icon.png';


export default function Header() {
  let history = useHistory() 
  const home = ()=>{history.push('/home')
    }
    return ( 
        <>
            <div className="row bg-white pb-3">
            <div className="col-3">
            <div className="logo mt-4 text-center">
              <img src={Icon} onClick={home} alt="WoW" width="150px" className="cursor-pointer" />
            </div>  
            </div>
            </div>
        </>

        )
    }

               