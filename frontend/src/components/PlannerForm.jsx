import { useState } from "react";
import { FaMapMarkerAlt, FaWallet, FaCalendarAlt, FaPlane } from "react-icons/fa";

function PlannerForm({ setItineraryData, setIsLoading }) {
  const [formData, setFormData] = useState({
    startingCity: "",
    destination: "",
    days: "1",
    budget: "₹10000",
    travelStyle: "Adventure",
    startDate: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!formData.startingCity || !formData.destination) {
      alert("Please enter starting city and destination.");
      return;
    }
    
    setIsLoading(true);
    setItineraryData(null);
    
    try {
      const response = await fetch("http://localhost:8000/api/generate-trip", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ...formData,
          days: parseInt(formData.days)
        })
      });
      
      if (!response.ok) {
        throw new Error("Failed to generate trip");
      }
      
      const data = await response.json();
      setItineraryData(data);
    } catch (error) {
      console.error(error);
      alert("An error occurred while generating the trip.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-5">
      <div className="glass glow rounded-3xl p-10">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <p className="mb-2 flex gap-2 items-center"><FaPlane/>Starting City</p>
            <input
              name="startingCity"
              value={formData.startingCity}
              onChange={handleChange}
              placeholder="Delhi"
              className="w-full bg-slate-900 rounded-xl border border-slate-700 p-4 outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <p className="mb-2 flex gap-2 items-center"><FaMapMarkerAlt/>Destination</p>
            <input
              name="destination"
              value={formData.destination}
              onChange={handleChange}
              placeholder="Goa"
              className="w-full bg-slate-900 rounded-xl border border-slate-700 p-4 outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <p className="mb-2">Days</p>
            <select name="days" value={formData.days} onChange={handleChange} className="w-full bg-slate-900 rounded-xl border border-slate-700 p-4">
              {[...Array(15)].map((_,i) => <option key={i} value={i+1}>{i+1}</option>)}
            </select>
          </div>
          <div>
            <p className="mb-2 flex gap-2 items-center"><FaWallet/>Budget</p>
            <select name="budget" value={formData.budget} onChange={handleChange} className="w-full bg-slate-900 rounded-xl border border-slate-700 p-4">
              <option value="₹10000">₹10000</option>
              <option value="₹25000">₹25000</option>
              <option value="₹50000">₹50000</option>
              <option value="₹100000+">₹100000+</option>
            </select>
          </div>
          <div>
            <p className="mb-2">Travel Style</p>
            <select name="travelStyle" value={formData.travelStyle} onChange={handleChange} className="w-full bg-slate-900 rounded-xl border border-slate-700 p-4">
              <option value="Adventure">Adventure</option>
              <option value="Solo">Solo</option>
              <option value="Family">Family</option>
              <option value="Luxury">Luxury</option>
              <option value="Backpacking">Backpacking</option>
            </select>
          </div>
          <div>
            <p className="mb-2 flex gap-2 items-center"><FaCalendarAlt/>Start Date</p>
            <input
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              type="date"
              className="w-full bg-slate-900 rounded-xl border border-slate-700 p-4"
            />
          </div>
        </div>
        <button onClick={handleSubmit} className="mt-10 w-full py-5 rounded-xl text-xl font-bold bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 hover:scale-105 transition">
          Generate AI Trip ✨
        </button>
      </div>
    </div>
  );
}

export default PlannerForm;