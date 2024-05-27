import React from "react";
import CleanPandaLoL from "./assets/CleanPandaLoL.png";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <div>
      <div className="h-[60px] bg-white opacity-80 shadow-xl flex items-center">
        <Link to={`/`}>
          <img src={CleanPandaLoL} className="h-24 w-24 mt-5" alt="Logo" />
        </Link>
      </div>
    </div>
  );
};
