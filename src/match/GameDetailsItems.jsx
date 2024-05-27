import React from "react";
import Item from "./Item";
const GameDetailsItems = (props) => {
  const currentVersion = props.currentVersion;
  const player = props.player;
  return (
    <div className="flex flex-row space-x-[1px]">
      {player &&
        Array.from({ length: 6 }).map((_, i) => (
          <Item
            key={i}
            item={`http://ddragon.leagueoflegends.com/cdn/${currentVersion}/img/item/${
              player[`item${i}`]
            }.png`}
            type={1}
          />
        ))}
    </div>
  );
};

export default GameDetailsItems;
