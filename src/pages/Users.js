
import Footer from "../components/Common/Footer/footer";
import { useEffect, useState } from "react";
import axios from "axios";
import RowDetails from "../components/RowDetails";
import Alert from "../components/Alert";
import NavbarAdmin from "../components/Common/NavbarAdmin/navbarAdmin";
import FooterAdmin from "../components/Common/Footer/footerAdmin";
// stocker le token dans localStorage


// récupérer le token depuis localStorage
const token = localStorage.getItem('token');
localStorage.setItem('token', 'votre_token_jwt');


const Users = () => {
  const [users,setUsers]=useState([])
  const [form ,setForm]=useState({}); 
const [errors,setErrors]= useState({})
const[show,setShow]=useState(false) ; 
const[message,setMessage]=useState("") ; 





//delete
  const OnDelete=(id__)=>{
   axios.delete(`/list/users/${id__}`) ; 
  
   }

   //ban
   const OnBan=(id__)=>{
    if(window.confirm("are you sur to ban this user "))
  {axios.put(`/list/users/ban/${id__}`)
  .then(res=>{
    setShow(true)
    setTimeout(()=>{
      setMessage(res.data.message)
      setShow(false)
    },4000);
     
  })
   }} 
  
   const fetchData = async () => {
    const token = localStorage.getItem('token'); // Récupère le token stocké dans le local storage du navigateur
  
    const response = await axios.get('/list/users', {
      headers: {
        Authorization: `Bearer ${token}` , 
        'Ma-Cle-Secrete': process.env.SECRET 
      }
    })
    setUsers(response.data) 
    console.log(response.data); 
   
  }

/* find all users */
 useEffect(()=>{
    const fetchData = async () => {
      const token = localStorage.getItem('token'); // Récupère le token stocké dans le local storage du navigateur
    
      const response = await axios.get('/list/users', {
        headers: {
          Authorization: `Bearer ${token}` , 
          'Ma-Cle-Secrete': process.env.SECRET 
        }
      })
      setUsers(response.data) 
      console.log(response.data); 
     
    }
    fetchData()
  },[])


   // const {user} = useAuthContext()
    return (
        <div>
          
       <NavbarAdmin/>
       <Alert message={message} show={show}/>
       <div class="row">
       <div  class="col  align-self-start">                                          
       
       
       </div>
       <div  class="col align-self-center">
  <table className="table table-hover " style={{color: '#2F4F4F '}} >
  <thead className="thead-light">
    <tr>
      <th scope="col">#</th>
      <th scope="col">email</th>
      <th scope="col">paswword</th>
      <th scope="col">role</th>
     
      <th scope="col">status</th>
      <th scope="col">created</th>
      <th scope="col">Banned</th>
     <th scope="col">Actions</th>
    </tr>
  </thead>
  <tbody>
{
    users.map(({email,password,role,created,status,isBanned,_id}) =>(
     
        <RowDetails key={_id} email={email} password={password} role={role} status={status} isBanned={isBanned} created ={created} id={_id} OnDelete={OnDelete} OnBan={OnBan} fetchData={fetchData}/>
    
    ))
}
  </tbody>
</table>
</div>
<div class="col align-self-end"></div>
</div>
            <FooterAdmin/>
        </div>
    )
}

export default Users