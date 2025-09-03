import axios from "axios"
import { useEffect } from "react"
import { useParams } from "react-router-dom"



export default function ShowDetails() {
    const {id}=useParams()

    const getDetails=async()=>{
        try {
            const dbres = await axios.get(`http://localhost:3000/event/id/${id}`)
            console.log(dbres.data.data)
        } catch (error) {
            console.error(error)
        }
    }


    useEffect(()=>{
        getDetails()
    },[])


    return (
    <div>
      <p>{id}</p>
    </div>
  )
}

 
