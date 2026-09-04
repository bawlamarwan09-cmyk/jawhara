import Navbar from './components/Navbar';
import Hero from './components/Hero';
import HomeProofAndPaths from './components/HomeProofAndPaths';
import HomeCapabilities from './components/HomeCapabilities';
import FeaturedProjects from './components/FeaturedProjects';
import HomeEquipment from './components/HomeEquipment';
import HomeTeamStory from './components/HomeTeamStory';
import HomeProcess from './components/HomeProcess';
import HomeEventTypes from './components/HomeEventTypes';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <HomeProofAndPaths />
        <HomeCapabilities />
        <FeaturedProjects />
        <HomeEquipment />
        <HomeTeamStory />
        <HomeProcess />
        <HomeEventTypes />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
