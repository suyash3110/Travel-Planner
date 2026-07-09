import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import PlannerForm from "../components/PlannerForm";
import PreviewCard from "../components/PreviewCard";
import FeatureSection from "../components/FeatureSection";
import Stats from "../components/Stats";
import Footer from "../components/Footer";

function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-white">

      <div className="absolute w-[500px] h-[500px] rounded-full bg-blue-600/20 blur-[180px] -top-24 -left-24"/>

      <div className="absolute w-[450px] h-[450px] rounded-full bg-cyan-500/20 blur-[180px] bottom-0 right-0"/>

      <Navbar />

      <Hero />

      <PlannerForm />

      <div className="max-w-7xl mx-auto px-5 py-24">

        <PreviewCard />

      </div>

      <Stats />

      <FeatureSection />

      <Footer />

    </div>
  );
}

export default Home;