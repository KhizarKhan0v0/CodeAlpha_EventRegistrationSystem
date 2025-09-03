import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import Swal from "sweetalert2"

export default function ShowDetails() {
  const navigate = useNavigate()
  const { id } = useParams()
  const [event, setEvent] = useState({})
  const [user, setUser] = useState({})

  const getDetails = async () => {
    try {
      const dbres = await axios.get(`http://localhost:3000/event/id/${id}`)
      setEvent(dbres.data.data)
    } catch (error) {
      console.error(error)
    }
  }

  const handleRegister = async () => {
    let userData = localStorage.getItem("user")
    userData = JSON.parse(userData)
    setUser(userData)

    try {
      const data = { userId: userData._id, eventId: id }
      const dbres = await axios.post("http://localhost:3000/reg/", data, { withCredentials: true })

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Successfully Registered 🎉",
        showConfirmButton: false,
        timer: 2000,
      })

      navigate("/home")
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: `${error.response?.data?.message || "Something went wrong"}`,
        icon: "error",
        confirmButtonText: "Okay",
      })
    }
  }

  useEffect(() => {
    getDetails()
  }, [])

  const isFull = event.registeredCount >= event.capacity

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6 py-10">
      <div className="max-w-3xl w-full bg-white shadow-lg rounded-2xl p-8">
        {/* Title */}
        <h1 className="text-3xl font-extrabold text-indigo-600 text-center mb-6">
          {event.title}
        </h1>

        {/* Event Details */}
        <div className="space-y-4 text-gray-700">
          <p>
            <span className="font-semibold text-gray-900">Description: </span>
            {event.description}
          </p>
          <p>
            <span className="font-semibold text-gray-900">Date: </span>
            {new Date(event.date).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
          <p>
            <span className="font-semibold text-gray-900">Location: </span>
            {event.location}
          </p>
          <p>
            <span className="font-semibold text-gray-900">Capacity: </span>
            {event.capacity}
          </p>
          <p>
            <span className="font-semibold text-gray-900">Registered Users: </span>
            {event.registeredCount}
          </p>
        </div>

        {/* Register Button */}
        <div className="mt-8 text-center">
          <button
            onClick={handleRegister}
            disabled={isFull}
            className={`px-6 py-3 rounded-xl font-semibold shadow-md transition-all 
              ${
                isFull
                  ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                  : "bg-indigo-600 text-white hover:bg-indigo-700"
              }`}
          >
            {isFull ? "Registration Full ❌" : "Register Now 🚀"}
          </button>
        </div>
      </div>
    </div>
  )
}
