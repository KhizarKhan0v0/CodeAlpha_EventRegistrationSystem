import axios from "axios"
import { useNavigate } from "react-router-dom"
import Swal from 'sweetalert2'


const Event = ({event}) => {
  const navigate = useNavigate()
  const showDetails=(id)=>{
    navigate(`/home/show/${id}`)
    
  }  

  const handleRegister=async(id)=>{
      let user=localStorage.getItem('user')
      user=JSON.parse(user)
      if (!user) {
        console.log('no user found')
        return navigate('/login')
      }
      
      try {
        const dbres = await axios.post('http://localhost:3000/reg/', {userId : user._id, eventId: id}, {withCredentials:true})
        console.log(dbres.data)
        navigate('/home')
      } catch (error) {
        console.error(error)
        console.log(error.response.data.message)
        Swal.fire({
          title: 'Error!',
          text: `${error.response.data.message}`,
          icon: 'error',
          confirmButtonText: 'Cool'
        })
      }
      
    }

  return (
    <div key={event._id} className="text-white flex justify-between w-2/3 mb-5 rounded-2xl p-5 cursor-pointer" style={{backgroundColor:'#775cff'}}>
      <div onClick={()=>showDetails(event._id)}> 
        <h3>Title : {event.title}</h3>
        <p>capacity : {event.capacity}</p>
        <p>Registered : {event.registeredCount}</p>
      </div>
      <div className="actions">
        <button onClick={()=>handleRegister(event._id)} className="bg-blue-400 rounded-2xl p-2 hover:bg-blue-950 hover:text-white">Register</button>
      </div>
      
    </div>
  )
}

export default Event
