import React from "react";
import { calculateRatingChange } from "../../utils";

const Randomizer = ({ redTeam, blueTeam }) => {
  const calculateTeamRating = () => {
    let sum = 0;
    let sum2 = 0;
    redTeam.forEach((player) => (sum += player.rating));
    blueTeam.forEach((player) => (sum2 += player.rating));
    const sumAvg = sum / redTeam.length;
    const sum2Avg = sum2 / blueTeam.length;
    const [blueWinRating, blueLoseRating, redWinRating, redLoseRating] =
      calculateRatingChange(sum2Avg, sumAvg);
    return [
      Math.round(sumAvg) || 0,
      Math.round(sum2Avg) || 0,
      blueWinRating,
      blueLoseRating,
      redWinRating,
      redLoseRating,
    ];
  };

  const [
    redRating,
    blueRating,
    blueWinRating,
    blueLoseRating,
    redWinRating,
    redLoseRating,
  ] = calculateTeamRating();

  return (
    <div className="flex justify-center p-4 space-x-4">
      <div className="space-y-4">
        <div className="text-lg mb-2 text-center">
          Average MMR: {`${blueRating} (+${blueWinRating} / ${blueLoseRating})`}
        </div>
        <div>
        {blueTeam.map((b) => (
          <div className="mb-2 h-20 items-center justify-center flex rounded-md bg-gradient-to-l from-black to-darkBlue text-2xl">{b.name}</div>
        ))}
        </div>
      </div>
      <div className="space-y-4">
        <div className="text-lg mb-2 text-center">
          Average MMR: {`${redRating} (+${redWinRating} / ${redLoseRating})`}
        </div>
        <div>
        {redTeam.map((r) => (
          <div className="mb-2 h-20 items-center justify-center flex rounded-md bg-gradient-to-l from-black to-darkRed text-2xl">{r.name}</div>
        ))}
        </div>
      </div>
    </div>
  );
};

export default Randomizer;
