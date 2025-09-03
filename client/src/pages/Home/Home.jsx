import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Event from "../../components/Home/Event"

export default function Home() {
  const navigate = useNavigate()
  const [user, setUser] = useState({})
  const [events, setEvents] = useState([])

  const getEvents = async () => {
    try {
      let dbres = await axios.get("http://localhost:3000/event", { withCredentials: true })
      setEvents(dbres.data.data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    let getUser = localStorage.getItem("user")
    if (!getUser || getUser.length === 0) {
      console.log("wapis jao")
      return navigate("/")
    }
    getUser = JSON.parse(getUser)
    setUser(getUser)
    getEvents()
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-indigo-600 text-white shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
          <h1 className="text-2xl font-bold">Event Hub</h1>
          <div className="text-sm text-gray-200">
            <p className="font-medium">Welcome, {user.username}</p>
            <p>{user.email}</p>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-6 py-10">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Upcoming Events</h2>

        {events.length === 0 ? (
          <p className="text-gray-500 text-center text-lg">No events available at the moment.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <Event event={event} key={event._id} />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
