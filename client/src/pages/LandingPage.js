import React from 'react'
import Icon from '../assets/img/Icon.png'
import SignIn from '../components/SignIn';
import SignUp from '../components/SignUp';
import Register from '../components/Register';

import landing from '../assets/img/landing.png'
export default function LandingPage() {
  return (
    <>
    <div className="container-fluid main-bg home-container pb-0">
                <div className="row px-5">
                    <div className="col-1 px-5 mt-3">
                    <img src={Icon} alt="" width="150px" />
                    </div>
                <div className="col-5"></div>
                <div className="col-6 mt-3">
                <div className="row"> 
                <div className="col-7 mt-2 px-5 right">  <SignIn /> </div> 
                <div className="col-5 px-5 right"> <SignUp /></div> 
                </div>
                </div>

            </div>
            <div className="Wrapper row mt-4">
            <div className="content-wrapper px-5">
            <div className="row px-5">
            <div className="col-6 px-5 text-light me-auto">
              <h1>The Only Link You’ll Ever Need</h1>
              <p className="mt-5">Add a link for your Social Bio and optimize your social media traffic.</p>
              <p className="mt-3">
                safe, fast and easy to use
              </p>
              <div className="my-5"></div>
              <Register />
            </div>
            <div className="col-6"><img src={landing}/></div>
            </div>
            </div>
            </div>
        </div>
    </>
  )
}
