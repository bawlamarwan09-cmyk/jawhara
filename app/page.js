import Cursor from './components/Cursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Expertises from './components/Expertises';
import Gallery from './components/Gallery';
import References from './components/References';
import Contact from './components/Contact';
import Footer from './components/Footer';
import RevealObserver from './components/RevealObserver';

export default function Home() {
  return (
    <>
      <Cursor />
      <Navbar />
      <Hero />
      <About />
      <Expertises />
      <Gallery />
      <References />
      <Contact />
      <Footer />
      <RevealObserver />
    </>
  );
}
