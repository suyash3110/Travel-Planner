import { useState } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import PlannerForm from "../components/PlannerForm";
import PreviewCard from "../components/PreviewCard";
import FeatureSection from "../components/FeatureSection";
import Stats from "../components/Stats";
import Footer from "../components/Footer";
import InspireModal from "../components/InspireModal";

function Home() {
  const [itineraryData, setItineraryData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isInspireModalOpen, setIsInspireModalOpen] = useState(false);

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
      <div className="absolute w-[500px] h-[500px] rounded-full bg-blue-600/20 blur-[180px] -top-24 -left-24"/>
      <div className="absolute w-[450px] h-[450px] rounded-full bg-cyan-500/20 blur-[180px] bottom-0 right-0"/>

      <Navbar onInspireClick={() => setIsInspireModalOpen(true)} />
      <InspireModal isOpen={isInspireModalOpen} onClose={() => setIsInspireModalOpen(false)} />
      
      <Hero />
      <PlannerForm setItineraryData={setItineraryData} setIsLoading={setIsLoading} />

      <div className="max-w-7xl mx-auto px-5 py-24">
        {isLoading ? (
          <div className="glass rounded-3xl p-12 text-center shadow-2xl">
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent animate-pulse">
              AI is planning your dream trip...
            </h2>
            <p className="text-slate-400">This usually takes about 5-10 seconds.</p>
          </div>
        ) : itineraryData ? (
          <PreviewCard data={itineraryData} />
        ) : (
          <PreviewCard /> 
        )}
      </div>

      <Stats />
      <FeatureSection />
      <Footer />
    </div>
  );
}

export default Home;