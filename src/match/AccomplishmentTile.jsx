import FireBackground from "../assets/BGFire.png";
import { Link } from "react-router-dom";

const AccomplishmentTile = (props) => {
  if (props.player) {
    const champIcon = props.player.championName;
    const currentVersion = props.currentVersion;
    const riotId = props.player.riotIdGameName;
    const tagLine = props.player.riotIdTagline;

    let bgColor;
    let text;

    switch (props.type) {
      case "dmg":
        bgColor = "from-red-500 to-yellow-500";
        text = "MOST DAMAGE";
        break;
      case "ast":
        bgColor = "from-blue-500 to-green-500";
        text = "MOST KP%";
        break;
      case "bld":
        bgColor = "from-purple-500 to-pink-500";
        text = "BAUSEN LAW";
        break;
      default:
        bgColor = "from-gray-500 to-gray-700";
        text = "ACCOMPLISHMENT";
    }

    return (
      <Link to={`/search/${riotId}/${tagLine}`}>
        <div className="relative w-[102px] transition-all duration-200 hover:translate-y-[-3px] overflow-hidden hover:scale-[1.005] bg-transparent">
          <h4
            className={`absolute top-0 left-0 text-white text-center w-full text-xs shadow-lg bg-gradient-to-r ${bgColor} py-1 rounded-t-xl rounded-b-md`}
          >
            {text}
          </h4>
          <div
            className={` bg-gradient-to-r ${bgColor} p-[3px] rounded-xl`}
          >
            <img
              className="w-[102px] h-[170px] rounded-lg"
              src={`https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champIcon}_0.jpg`}
              alt={`${champIcon}`}
            />
          </div>
        </div>
      </Link>
    );
  }
};

export default AccomplishmentTile;
