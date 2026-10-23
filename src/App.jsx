
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Works from "./components/Works";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Inquiries from "./components/Inquiries";
import Admin from "./components/Admin";

function Home() {
  return (
    <main>
      <Hero />
      <Services />
      <Works />
      <Contact />
    </main>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/inquiries" element={<Inquiries />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}
