import React from "react";
import classnames from "classnames";

export default function WinrateBar({ winrate, count }) {
  return (
    <div className="flex flex-col justify-center items-center text-sm">
      <div className="flex space-x-2 mb-1 justify-center">
        <div className="">{winrate}%</div>
        <div>/</div>
        <div className="">
          {count}
          {count > 1 ? " games" : " game"}
        </div>
      </div>
      <div className="h-2 w-32 bg-gray-500 rounded">
        <div
          className={classnames("h-full bg-gray-200 rounded-l", {
            "bg-blue-500": winrate >= 60 && winrate < 70,
            "bg-yellow-500": winrate >= 70,
            "rounded-r": winrate === 100 || !winrate,
          })}
          style={{ width: `${winrate}%` }}
        ></div>
      </div>
    </div>
  );
}
