import Navbar from './Navbar';
import Footer from './Footer';

export default function PageFrame({ children }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
