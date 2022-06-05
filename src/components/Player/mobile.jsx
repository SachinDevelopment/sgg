import React, { useEffect, useState, useMemo } from "react";
import { v4 as uuid } from "uuid";
import axios from "axios";
import ChampCard from "./ChampCard";
import GameCard from "./GameCard";
import { importAll, wrToRank } from "../../utils";
import { PieChart } from "react-minimal-pie-chart";
import Pagination from "@material-ui/lab/Pagination";
import { makeStyles } from "@material-ui/core/styles";

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
    <div className="flex flex-col justify-start space-y-4 mb-12 h-auto p-2">
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
          <div className="flex items-center justify-center relative w-44">
            <div  className="text-center">
              <div className="font-bold">
                {playerData.name}
              </div>
              <div className="text-sm">
                {playerData.wins}-{playerData.loses} ({playerData.winrate}%)
              </div>
              <div className="text-sm">{playerData.rating} MMR</div>
            </div>
            <div className="absolute top-3 left-1">
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
              <img className="h-20 w-20" src={jungleIcon} alt="" />
              <div className="flex flex-col flex-1 text-sm">
                <div className="text-left ">
                  {playerData?.jungleWR}% WR
                </div>
                <div className="text-left">
                  {playerData?.jungle} Played
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="h-20 w-20 flex items-center justify-center">
                <img className="h-16 w-16" src={laneIcon} alt="" />
              </div>
              <div className="flex flex-col flex-1 text-sm">
                <div className="text-left">
                  {playerData?.laneWR}% WR
                </div>
                <div className="text-left">
                  {playerData?.lane} Played
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
        <div className="flex flex-col justify-between items-start overflow-hidden space-y-4">
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
        <div className="flex flex-col space-y-4">
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
  );
};

export default Player;
