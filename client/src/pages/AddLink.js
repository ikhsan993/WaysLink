// React Components
import {React,useState,useContext,useEffect }from 'react'
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import {Link,useHistory} from "react-router-dom";
import { UserContext } from "../context/userContext";
import { useMutation } from "react-query";
import {API} from '../config/api';
import phone1 from '../assets/img/phone1.png'
// Assets

export default function AddLink() {

    let history = useHistory();
    let api = API();
    const [state, dispatch] = useContext(UserContext);
    const [preview, setPreview] = useState(null);
    const [form,setForm] = useState({
        title : '',
        facebook :'',
        instagram :'',
        twitter :'',
        youtube :'',
        whatsapp :'',
        thumbnail : '',
        description : '',
    });

    const handleChange = (e)=> {
        setForm({
            ...form,
            [e.target.name]:
            e.target.type === 'file' ? e.target.files : e.target.value, 
        });
        if (e.target.type === 'file'){
            let url = URL.createObjectURL(e.target.files[0]);
            setPreview(url);
        }
    };

    const handleSubmit = useMutation(async (e)=>{
        try {
            e.preventDefault();
            const formData = new FormData();
            formData.set('thumbnail', form?.thumbnail[0], form?.thumbnail[0]?.name);
            formData.set('title', form.title);
            formData.set('facebook', form.facebook);
            formData.set('twitter', form.twitter);
            formData.set('instagram', form.instagram);
            formData.set('youtube', form.youtube);
            formData.set('whatsapp', form.whatsapp);
            formData.set('description', form.description);
            const config = {
                method : 'POST',
                headers : {
                    Authorization : "Basic " + localStorage.token
                },
                body : formData,
            };
            const response = await api.post('/link', config);
            console.log (response);
            history.push('/links');
        } catch(error){
            console.log(error)
        }
    });

    return (
        <>
            <div className="container-fluid main-bg ">
                <Header/>
                <div className="row">
                <Sidebar/>
                    <div className="col-9 home-container">
                        <div className="row  ms-5 mt-5">
                            <div className="col-9">
                                <h2 className="bold"> Create Link </h2>
                            </div>
                            <div className="col-3"><button onClick={(e) => handleSubmit.mutate(e)} className="btn bg-yellow py-2 px-3 bold text-light br">Publish Link</button></div> 
                            <div className="row mt-5">
                                <div className="col-7 px-2 py-2 bg-white br px-4 py-5">
                                    <div className="row">
                                        <div className="col-5">
                                            {preview && (
                                            <img src={preview} height="150px" width="150px" />
                                            )}
                                        </div>
                                        <div className="col-7 pt-5">
                                            <label className="btn text-white bg-yellow px-4 mt-2">Upload<input onChange={handleChange} name="thumbnail" type="file" hidden /></label>
                                        </div>
                                        <form>
                                            <div className="mt-5">
                                                <label htmlFor="exampleInputEmail1" className="text-grey">Title</label>
                                                <input type="text" onChange={handleChange} name="title" className="form-link text-black" id="title" aria-describedby="emailHelp" placeholder="Ex : Your Title Here" />
                                            </div>
                                            <div className="mt-5">
                                                <label htmlFor="exampleInputPassword1" className="text-grey">Description</label>
                                                <input type="text" onChange={handleChange} name="description" className="form-link" id="exampleInputPassword1" placeholder="Ex : Your Description Here" />
                                            </div>
                                            <div className="mt-5 mb-5">
                                                <label htmlFor="exampleInputPassword1" className="text-grey">Facebook</label>
                                                <input type="text" onChange={handleChange} name="facebook" className="form-link" id="exampleInputPassword1" placeholder="Facebook" />
                                            </div>
                                            <div className="mt-5 mb-5">
                                                <label htmlFor="exampleInputPassword1" className="text-grey">Instagram</label>
                                                <input type="text" onChange={handleChange} name="instagram" className="form-link" id="exampleInputPassword1" placeholder="Instagram" />
                                            </div>
                                            <div className="mt-5 mb-5">
                                                <label htmlFor="exampleInputPassword1" className="text-grey">Twitter</label>
                                                <input type="text" onChange={handleChange} name="twitter" className="form-link" id="exampleInputPassword1" placeholder="Twitter" />
                                                </div>
                                            <div className="mt-5 mb-5">
                                                <label htmlFor="exampleInputPassword1" className="text-grey">Youtube</label>
                                                <input type="text" onChange={handleChange} name="youtube" className="form-link" id="exampleInputPassword1" placeholder="Youtube" />
                                            </div>
                                            <div className="mt-5 mb-5">
                                                <label htmlFor="exampleInputPassword1" className="text-grey">WhatsApp</label>
                                                <input type="text" onChange={handleChange} name="whatsapp" className="form-link" id="exampleInputPassword1" placeholder="WhatsApp" />
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                <div className="col-5 text-center"><img className="cursor-pointer mt-5 " src={phone1} alt=""  />
                                </div>                 
                            </div>
                        </div>
                    </div>
                </div>
            </div>  
        </>
    )
}
