import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Home";
import SearchResults from "./SearchResults";
import PandaLoLBackground from "./assets/PandaLoLBackground.png";
import { Header } from "./Header";

function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <Header />
        <img
          src={PandaLoLBackground}
          id="WebsiteBG"
          className="fixed scale-[215%] top-[140px] opacity-75"
        ></img>
        <Routes>
          <Route path="/search/:riotGameName/:riotTagLine" element={<SearchResults />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
