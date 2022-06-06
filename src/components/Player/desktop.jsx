import React, { useEffect, useState, useMemo } from "react";
import { v4 as uuid } from "uuid";
import axios from "axios";
import ChampCard from "./ChampCard";
import GameCard from "./GameCard";
import { importAll, wrToRank } from "../../utils";
import { PieChart } from "react-minimal-pie-chart";
import Pagination from "@material-ui/lab/Pagination";
import { makeStyles } from "@material-ui/core/styles";
import Stats from "./Stats";
import classnames from "classnames";

const ranks = importAll(require.context("../../../assets/ranks", false, /\.png/));
const borders = importAll(
  require.context("../../../assets/borders", false, /\.png/)
);
const positions = importAll(require.context("../../../assets/positions", false, /\.png/))
const jungleIcon = positions['jungle_icon.png'];
const laneIcon = positions['lane_icon.png'];
const LIMIT = 5;

const useStyles = makeStyles(() => ({
  ul: {
    "& .MuiPaginationItem-root": {
      color: "#fff",
      backgroundColor: "#1f2937",
    },
  },
}));

let API_URL = process.env.REACT_APP_API_URL;

const Player = ({playerId}) => {
  const classes = useStyles();
  const [playerData, setPlayerData] = useState([]);
  const [playerGames, setPlayerGames] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const gamesCount = useMemo(() => playerData.wins + playerData.loses, [
    playerData,
  ]);
  const overallWr = useMemo(
    () =>
      gamesCount ? Number((playerData.wins / gamesCount) * 100).toFixed(0) : 0,
    [playerData, gamesCount]
  );
  const rankImage = useMemo(
    () =>
      `${wrToRank(playerData.rating, playerData.wins + playerData.loses)}.png`,
    [playerData]
  );

  const borderImage = useMemo(
    () => `${wrToRank(playerData.lastSeasonRating)}.png`,
    [playerData]
  );

  useEffect(() => {
    axios.get(`${API_URL}/player/${playerId}/stats`).then(({ data }) => {
      data.champs.sort((a, b) => b.count - a.count || b.wins - a.wins);
      setPlayerData(data);
    });
    axios
      .get(
        `${API_URL}/player/${playerId}/map/SR/games?page=${page}&limit=${LIMIT}`
      )
      .then(({ data }) => {
        const { games, total } = data;
        setPlayerGames(games);
        setTotal(total);
      });
  }, [playerId, page]);

  const onPageChange = (event, page) => {
    setPage(page);
  };

  return (
    <div className="flex flex-col justify-start sm:ml-10 space-y-4 sm:mr-12 lg:ml-32 lg:mr-32 xl:ml-60 xl:mr-60 2xl:ml-96 2xl:mr-96 mb-12 h-auto">
      <div className="flex flex-col bg-gray-800 mt-3 rounded p-2 h-60">
        <div className="flex justify-start space-x-5 h-8 ml-3">
          {playerData?.prevRatings?.map((rating) =>
            rating.rating > 0 ? (
              <div className="bg-gray-700 rounded p-1 text-sm border-2 border-gray-800 shadow-lg">{`S${
                rating.season
              } ${wrToRank(rating.rating)} -  #${rating.rank} `}</div>
            ) : (
              ""
            )
          )}
        </div>
        <div className="flex justify-between bg-gradient-to-r rounded h-56 mr-4">
          <div className="flex p-2 w-48 h-auto items-center justify-center relative">
            <img
              className={classnames("w-36 absolute pr-2 pl-2", {
                "bg-gray-900": borders[borderImage],
                "w-40 mb-4": !borders[borderImage],
              })}
              alt=""
              src={ranks[rankImage]}
            />
            {borders[borderImage] ? (
              <img
                className="w-44 h-44 absolute"
                alt=""
                src={borders[borderImage]}
              />
            ) : (
              ""
            )}
          </div>
          <div className="flex items-center justify-center relative w-52">
            <div className="text-center">
              <div className="text-2xl font-semibold pl-2 truncate">
                {playerData.name}
              </div>
              <div className="font-semibold text-lg">
                {playerData.wins}-{playerData.loses} ({playerData.winrate}%)
              </div>
              <div>{playerData.rating} MMR</div>
            </div>
            <div className="absolute bottom-1 left-1">
              {
                <PieChart
                  lineWidth={25}
                  data={[
                    {
                      title: "Wins",
                      value: Number(overallWr),
                      color: "#1D3557",
                    },
                    {
                      title: "Loses",
                      value: Number(100 - overallWr),
                      color: "#640D14",
                    },
                  ]}
                />
              }
            </div>
          </div>
          <div className="flex flex-col items-center justify-center font-semibold">
            <div className="flex items-center justify-between">
              <img className="h-24 w-24" src={jungleIcon} alt="" />
              <div className="flex flex-col flex-1">
                <div className="text-left text-lg">
                  {playerData?.jungleWR}% WR
                </div>
                <div className="text-left text-lg">
                  {playerData?.jungle} Played
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="h-24 w-24 flex items-center justify-center">
                <img className="h-20 w-20" src={laneIcon} alt="" />
              </div>
              <div className="flex flex-col flex-1">
                <div className="text-left text-lg">
                  {playerData?.laneWR}% WR
                </div>
                <div className="text-left text-lg">
                  {playerData?.lane} Played
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex space-x-4 items-start">
        <div className="flex flex-col justify-between items-start w-2/5 overflow-hidden space-y-4">
          <div className="border-gray-500 divide-y divide-gray-500 w-full text-gray-200 bg-gray-800 p-2">
            {playerData?.champs?.length ? (
              playerData.champs
                .slice(0, 10)
                .map((champ) => <ChampCard key={uuid()} champ={champ} />)
            ) : (
              <div className="h-32 flex items-center justify-center">
                No Champion History
              </div>
            )}
          </div>
        </div>
        <div className="w-3/5 flex flex-col space-y-4">
          <div className="space-y-6">
            <div className="space-y-2">
              {playerGames.length ? (
                playerGames.map((game) => <GameCard key={uuid()} game={game} />)
              ) : (
                <div className="h-96 bg-gray-700 flex items-center justify-center font-bold">
                  Go play some games
                </div>
              )}
            </div>
            <div className="flex justify-center">
              <Pagination
                variant="outlined"
                shape="rounded"
                count={Math.ceil(total / LIMIT)}
                page={page}
                classes={{ ul: classes.ul }}
                onChange={onPageChange}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="text-3xl font-bold">Stats for {playerData.name}</div>
      <div className="w-full h-auto">
        <Stats playerId={playerId} />
      </div>
    </div>
  );
};

export default Player;
