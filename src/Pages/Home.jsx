import React from "react";
import Header from "../Components/Header.jsx";
import TypingBox1 from "../Components/TypingBox1.jsx";
import Footer from '../Components/Footer.jsx';

export default function Home() {
  return (
    <div className="canvas">
      <Header />

      <TypingBox1 />

      <Footer />
    </div>
  );
}
