import axios from "axios"
import { useEffect, useState } from "react"
import Swal from "sweetalert2"

export default function Admin() {
  const [events, setEvents] = useState([])
  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    capacity: 0,
  })

  const getEvents = async () => {
    try {
      let dbres = await axios.get("http://localhost:3000/event/getAll", {withCredentials:true})
      setEvents(dbres.data.data)
    } catch (error) {
      console.error(error)
    }
  }

  const handleInputChange = (e) => {
    setNewEvent({ ...newEvent, [e.target.name]: e.target.value })
  }

  const handleAddEvent = async (e) => {
    e.preventDefault()
    try {
      await axios.post("http://localhost:3000/event/register", newEvent, {withCredentials: true})
      Swal.fire("Success", "Event Added!", "success")
      setNewEvent({ title: "", description: "", date: "", location: "", capacity: 0 })
      getEvents()
    } catch (error) {
      Swal.fire("Error", error.response?.data?.message || "Something went wrong", "error")
    }
  }

  useEffect(() => {
    getEvents()
  }, [])

  // Calculate % registrations
  const eventsWithPercentage = events.map((ev) => {
    const percent =
      ev.capacity > 0 ? Math.round((ev.registeredCount / ev.capacity) * 100) : 0
    return { ...ev, percent }
  })

  // Sort by most registered %
  const topEvents = [...eventsWithPercentage]
    .sort((a, b) => b.percent - a.percent)
    .slice(0, 3)

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center text-indigo-700 mb-8">
        🎯 Admin Dashboard
      </h1>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* All Events */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">📋 All Events</h2>
          <div className="space-y-3 max-h-[400px] overflow-y-auto">
            {eventsWithPercentage.length === 0 ? (
              <p className="text-gray-500">No events found</p>
            ) : (
              eventsWithPercentage.map((ev) => (
                <div
                  key={ev._id}
                  className="border rounded-lg p-4 shadow-sm bg-gray-50 hover:shadow-md transition"
                >
                  <h3 className="text-lg font-bold text-indigo-600">{ev.title}</h3>
                  <p className="text-sm text-gray-700">{ev.description}</p>
                  <p className="text-sm">📍 {ev.location}</p>
                  <p className="text-sm">📅 {new Date(ev.date).toLocaleDateString()}</p>
                  <div className="mt-2">
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-indigo-500 h-3 rounded-full"
                        style={{ width: `${ev.percent}%` }}
                      ></div>
                    </div>
                    <p className="text-sm mt-1 text-gray-600">
                      {ev.registeredCount}/{ev.capacity} registered ({ev.percent}%)
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Top Events */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">🔥 Top Events</h2>
          {topEvents.length === 0 ? (
            <p className="text-gray-500">No data available</p>
          ) : (
            topEvents.map((ev) => (
              <div key={ev._id} className="mb-4 border-b pb-2">
                <h3 className="font-bold text-indigo-600">{ev.title}</h3>
                <p className="text-sm">{ev.percent}% filled</p>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Add Event */}
      <div className="mt-10 bg-white p-6 rounded-xl shadow-md max-w-3xl mx-auto">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">➕ Add New Event</h2>
        <form className="space-y-4" onSubmit={handleAddEvent}>
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={newEvent.title}
            onChange={handleInputChange}
            className="w-full border rounded-lg p-2"
            required
          />
          <textarea
            name="description"
            placeholder="Description"
            value={newEvent.description}
            onChange={handleInputChange}
            className="w-full border rounded-lg p-2"
          ></textarea>
          <input
            type="date"
            name="date"
            value={newEvent.date}
            onChange={handleInputChange}
            className="w-full border rounded-lg p-2"
            required
          />
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={newEvent.location}
            onChange={handleInputChange}
            className="w-full border rounded-lg p-2"
          />
          <input
            type="number"
            name="capacity"
            placeholder="Capacity"
            value={newEvent.capacity}
            onChange={handleInputChange}
            className="w-full border rounded-lg p-2"
          />
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white font-bold py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            Add Event
          </button>
        </form>
      </div>
    </div>
  )
}
