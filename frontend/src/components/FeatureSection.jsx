import {FaRobot,FaCloud,FaRoute} from "react-icons/fa";

const data=[

{

icon:<FaRobot size={36}/>,

title:"AI Itinerary",

desc:"Smart travel plans generated using LLMs."

},

{

icon:<FaCloud size={36}/>,

title:"AWS Powered",

desc:"Built using Bedrock, Lambda and S3."

},

{

icon:<FaRoute size={36}/>,

title:"Optimized Trips",

desc:"Travel more while spending less."

}

];

function FeatureSection(){

return(

<section className="max-w-7xl mx-auto py-28 px-5">

<div className="grid md:grid-cols-3 gap-8">

{data.map((item,index)=>(

<div

key={index}

className="glass rounded-3xl p-8 hover:-translate-y-3 transition"

>

<div className="text-blue-500">

{item.icon}

</div>

<h2 className="mt-5 text-2xl font-bold">

{item.title}

</h2>

<p className="mt-4 text-slate-400">

{item.desc}

</p>

</div>

))}

</div>

</section>

)

}

export default FeatureSection;