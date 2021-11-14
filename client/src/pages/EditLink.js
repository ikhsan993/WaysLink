// React Components
import {React,useState,useContext,useEffect }from 'react'
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import {Link,useHistory,useParams} from "react-router-dom";
import { UserContext } from "../context/userContext";
import { useQuery,useMutation } from "react-query";
import {API} from '../config/api';
import phone1 from '../assets/img/phone1.png'
// Assets

export default function EditLink() {
    const [state, dispatch] = useContext(UserContext);

    let history = useHistory();
    let api = API();
    let {id} = useParams();
    const [preview, setPreview] = useState(null);
        const [profile, setLink] = useState({});
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

    let {dataLink, refetch} = useQuery("linkCache", async () => {
        const config = {
        method: "GET",
        headers: {Authorization: "Basic " + localStorage.token,},
        };

    const response = await api.get("/link/" + id, config);
      setForm({
        title : response.data.brand.title,
        facebook :response.data.facebook,
        instagram :response.data.instagram,
        twitter :response.data.twitter,
        youtube :response.data.youtube,
        whatsapp :response.data.whatsapp,
        thumbnail : response.data.thumbnail,
        description : response.data.brand.description,
    });
    setLink(response.data);

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
            console.log(form.cover.name)
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
                method : 'PATCH',
                headers : {
                    Authorization : "Basic " + localStorage.token
                },
                body : formData,
            };
            const response = await api.patch('/link/' + id, config);
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
        <div className="row ">
          <Sidebar/>
          <div className="col-9 home-container">
            <div className="row  ms-5 mt-5">
            <div className="col-9">
                <h2 className="bold"> Edit Link </h2>
             </div>
             <div className="col-3"><button onClick={(e) => handleSubmit.mutate(e)} className="btn bg-yellow py-2 px-3 bold text-light br">Update Link</button></div> 
             <div className="row mt-5">
                <div className="col-7 px-2 py-2 bg-white br px-4 py-5">
                    
                    <div className="row">
                    <div className="col-5">
                    {preview && (
                        <img src={preview} height="150px" width="150px" />
                    )}
                    
                    </div>
                    <div className="col-7 pt-5">
                    <label className="btn text-white bg-yellow px-4 mt-2">Upload<input onChange={handleChange} value={form.thumbnail} name="thumbnail" type="file" hidden /></label>
                    </div>
                     <form>
                        <div className="mt-5">
                            <label htmlFor="exampleInputEmail1" className="text-grey">Title</label>
                            <input type="text" onChange={handleChange} value={form.title} name="title" className="form-link text-black" id="title" aria-describedby="emailHelp" placeholder="Ex : Your Title Here" />
                        </div>
                        <div className="mt-5">
                            <label htmlFor="exampleInputPassword1" className="text-grey">Description</label>
                            <input type="text" onChange={handleChange} value={form.description} name="description" className="form-link" id="exampleInputPassword1" placeholder="Ex : Your Description Here" />
                        </div>
                        <div className="mt-5 mb-5">
                            <label htmlFor="exampleInputPassword1" className="text-grey">Facebook</label>
                            <input type="text" onChange={handleChange} value={form.facebook} name="facebook" className="form-link" id="exampleInputPassword1" placeholder="Facebook" />
                        </div>
                        <div className="mt-5 mb-5">
                            <label htmlFor="exampleInputPassword1" className="text-grey">Instagram</label>
                            <input type="text" onChange={handleChange} value={form.instagram} name="instagram" className="form-link" id="exampleInputPassword1" placeholder="Instagram" />
                        </div>
                        <div className="mt-5 mb-5">
                            <label htmlFor="exampleInputPassword1" className="text-grey">Twitter</label>
                            <input type="text" onChange={handleChange} value={form.twitter} name="twitter" className="form-link" id="exampleInputPassword1" placeholder="Twitter" />
                        </div>
                        <div className="mt-5 mb-5">
                            <label htmlFor="exampleInputPassword1" className="text-grey">Youtube</label>
                            <input type="text" onChange={handleChange} value={form.youtube} name="youtube" className="form-link" id="exampleInputPassword1" placeholder="Youtube" />
                        </div>
                        <div className="mt-5 mb-5">
                            <label htmlFor="exampleInputPassword1" className="text-grey">WhatsApp</label>
                            <input type="text" onChange={handleChange} value={form.whatsapp} name="whatsapp" className="form-link" id="exampleInputPassword1" placeholder="WhatsApp" />
                        </div>
                    </form>
                 </div>
                 </div>
                <div className="col-5 text-center"><img className="cursor-pointer mt-5 " src={phone1} alt=""  /></div>                 
             </div>

            </div>
          </div>
        </div>
      </div>  
    </>
    )
}
