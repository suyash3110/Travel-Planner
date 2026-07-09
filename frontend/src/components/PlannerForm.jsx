import {FaMapMarkerAlt,FaWallet,FaCalendarAlt,FaPlane} from "react-icons/fa";

function PlannerForm(){

return(

<div className="max-w-5xl mx-auto px-5">

<div className="glass glow rounded-3xl p-10">

<div className="grid md:grid-cols-2 gap-6">

<div>

<p className="mb-2 flex gap-2 items-center">

<FaPlane/>

Starting City

</p>

<input

placeholder="Delhi"

className="w-full bg-slate-900 rounded-xl border border-slate-700 p-4 outline-none focus:border-blue-500"

/>

</div>

<div>

<p className="mb-2 flex gap-2 items-center">

<FaMapMarkerAlt/>

Destination

</p>

<input

placeholder="Goa"

className="w-full bg-slate-900 rounded-xl border border-slate-700 p-4 outline-none focus:border-blue-500"

/>

</div>

<div>

<p className="mb-2">

Days

</p>

<select className="w-full bg-slate-900 rounded-xl border border-slate-700 p-4">

{[...Array(15)].map((_,i)=>

<option key={i}>{i+1}</option>

)}

</select>

</div>

<div>

<p className="mb-2 flex gap-2 items-center">

<FaWallet/>

Budget

</p>

<select className="w-full bg-slate-900 rounded-xl border border-slate-700 p-4">

<option>₹10000</option>

<option>₹25000</option>

<option>₹50000</option>

<option>₹100000+</option>

</select>

</div>

<div>

<p className="mb-2">

Travel Style

</p>

<select className="w-full bg-slate-900 rounded-xl border border-slate-700 p-4">

<option>Adventure</option>

<option>Solo</option>

<option>Family</option>

<option>Luxury</option>

<option>Backpacking</option>

</select>

</div>

<div>

<p className="mb-2 flex gap-2 items-center">

<FaCalendarAlt/>

Start Date

</p>

<input

type="date"

className="w-full bg-slate-900 rounded-xl border border-slate-700 p-4"

/>

</div>

</div>

<button className="mt-10 w-full py-5 rounded-xl text-xl font-bold bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 hover:scale-105 transition">

Generate AI Trip ✨

</button>

</div>

</div>

)

}

export default PlannerForm;