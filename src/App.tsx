import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Home from './pages/Home';
import MyWorks from './pages/MyWorks';
import About from './pages/About';
import ContactMe from './pages/ContactMe';
import Admin from './pages/Admin';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/myworks" element={<MyWorks />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<ContactMe />} />
        <Route path="/x7k9m-admin" element={<Admin />} />
      </Routes>
    </Router>
  );
}

export default App;