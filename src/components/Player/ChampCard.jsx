import React, { useMemo } from "react";
import { importAll } from "../../utils";

const images = importAll(
  require.context("../../../assets/champions", false, /\.png/)
);

function ChampCard({ champ }) {
  const winrate = useMemo(
    () => ((champ.wins / (champ.loses + champ.wins)) * 100).toFixed(0),
    [champ]
  );

  return (
    <div className="space-x-3 p-1 flex">
      <img
        className="rounded-full w-16 h-16 p-1"
        alt=""
        src={images[`${champ.name}Square.png`]}
      />
      <div className="flex justify-between flex-1">
        <div className="flex flex-col justify-between content-end">
          <div className="font-bold text-lg leading-6 text-left">
            {champ.name}
          </div>
          <div className="font-bold text-left">{`${champ.wins}-${champ.loses}`}</div>
        </div>
        <div className="flex flex-col items-end justify-between">
          <div className="text-right">{champ.count} Played</div>
          <div className="font-semibold text-right">{winrate}%</div>
        </div>
      </div>
    </div>
  );
}

ChampCard.propTypes = {};

export default ChampCard;
