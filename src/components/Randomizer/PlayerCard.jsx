import React, { useMemo, useRef, useEffect, useState } from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import {
  importAll,
  CHAMPIONS,
  ROLES,
  getChampNameforLink,
  wrToRank,
} from "../../utils";

import classnames from "classnames";
import { Link } from "react-router-dom";
import { v4 as uuid } from "uuid";
import { motion } from "framer-motion";

const positions = importAll(
  require.context("../../../assets/positions", false, /\.png/)
);
const rankImages = importAll(
  require.context("../../../assets/rankIcons", false, /\.svg/)
);

export default function PlayerCard({
  player,
  setTeam,
  team,
  index,
  color,
  socket,
  showAnimation,
  setShowAnimation
}) {
  const rank = useMemo(
    () => wrToRank(player?.rating, player?.wins + player?.loses),
    [player]
  );
  return showAnimation ? (
    <motion.div
      initial={{ opacity: 0, translateX: color === "blue" ? -10000 : 10000 }}
      animate={{ opacity: 1, translateX: 0 }}
      transition={{ duration: 2, delay: index * 2 }}
      key={`${player.name}-${index}`}
      className={classnames(
        "flex flex-col justify-between mb-1 w-96 rounded h-48  overflow-hidden bg-cover opacity-100 bg-gray-800 p-2",
        { "bg-darkRed": color === "red", "bg-darkBlue": color === "blue" }
      )}
      style={{
        backgroundImage: player.champion !== "Champion" ? `url('https://static.u.gg/assets/lol/riot_static/12.11.1/img/splash/${getChampNameforLink(
          player.champion
        )}_0.jpg')` : "",
      }}
    >
      <div className="flex justify-between items-start h-full p-4">
        <div className="flex justify-center items-center  bg-slate-900 opacity-90 rounded h-16 p-2">
          <div className="w-16">
            <img src={rankImages[`${rank}.svg`]} alt="" />
          </div>
          <Link to={`/lol/player/${player.id}/stats`}>
            <div className="text-3xl mr-2 ml-2 font-semibold opacity-100">
              {player.name}
            </div>
          </Link>
        </div>
        <div className="flex flex-col justify-center items-center justify-center">
          <div className="w-16 bg-slate-900 opacity-90 rounded">
            <div>
              {player.role === "Jungle" ? (
                <img alt="" src={
                  rank === "Unranked"
                    ? positions[`Position_Iron-Jungle.png`]
                    : positions[`Position_${rank}-Jungle.png`]
                } />
              ) : player.role === "Top" ? (
                <img alt="" src={
                  rank === "Unranked"
                    ? positions[`Position_Iron-Top.png`]
                    : positions[`Position_${rank}-Top.png`]
                } />
              ) : player.role === "Bot" ? (
                <img alt="" src={
                  rank === "Unranked"
                    ? positions[`Position_Iron-Bot.png`]
                    : positions[`Position_${rank}-Bot.png`]
                } />
              ) : player.role === "Support" ? (
                <img alt="" src={
                  rank === "Unranked"
                    ? positions[`Position_Iron-Support.png`]
                    : positions[`Position_${rank}-Support.png`]
                } />
               ) : player.role === "Mid" ? (
                  <img alt="" src={
                    rank === "Unranked"
                      ? positions[`Position_Iron-Mid.png`]
                      : positions[`Position_${rank}-Mid.png`]
                  } />
                ) : "" }
            </div>
          </div>
        </div>
      </div>
      <div className="flex m-2 space-x-2">
        <div className="flex-1 bg-slate-400 rounded">
          <Autocomplete
            value={player.role || ROLES[0]}
            onChange={(event, newInputValue) => {
              if (!ROLES.some((champion) => champion === newInputValue)) {
                return;
              }
              setTeam([
                ...team.slice(0, index),
                { ...team[index], role: newInputValue },
                ...team.slice(index + 1),
              ]);

              setShowAnimation(false);
              socket.emit(color === "red" ? "redUpdate" : "blueUpdate", [
                ...team.slice(0, index),
                { ...team[index], role: newInputValue },
                ...team.slice(index + 1),
              ]);
            }}
            options={ROLES}
            renderInput={(params) => (
              <TextField {...params} variant="outlined" />
            )}
          />
        </div>
        <div className="flex-1 bg-slate-400 rounded">
          <Autocomplete
            value={player.champion || CHAMPIONS[0]}
            onChange={(event, newInputValue) => {
              if (!CHAMPIONS.some((champion) => champion === newInputValue)) {
                return;
              }
              setTeam([
                ...team.slice(0, index),
                { ...team[index], champion: newInputValue },
                ...team.slice(index + 1),
              ]);

              setShowAnimation(false);
              socket.emit(color === "red" ? "redUpdate" : "blueUpdate", [
                ...team.slice(0, index),
                { ...team[index], champion: newInputValue },
                ...team.slice(index + 1),
              ]);
            }}
            options={CHAMPIONS}
            renderInput={(params) => (
              <TextField {...params} variant="outlined" />
            )}
          />
        </div>
      </div>
    </motion.div>
  ) : (
    <div
      key={`${player.name}-${index}`}
      className={classnames(
        "flex flex-col justify-between mb-1 w-96 rounded h-48 overflow-hidden bg-cover opacity-100 bg-gray-800 p-2",
        { "bg-darkRed": color === "red", "bg-darkBlue": color === "blue" }
      )}
      style={{
        backgroundImage: player.champion !== "Champion" ? `url('https://static.u.gg/assets/lol/riot_static/12.11.1/img/splash/${getChampNameforLink(
          player.champion
        )}_0.jpg')` : "",
      }}
    >
      <div className="flex justify-between items-start h-full p-4">
        <div className="flex justify-center items-center  bg-slate-900 opacity-90 rounded h-16 p-2">
          <div className="w-16">
            <img src={rankImages[`${rank}.svg`]} alt="" />
          </div>
          <Link to={`/lol/player/${player.id}/stats`}>
            <div className="text-3xl mr-2 ml-2 font-semibold opacity-100">
              {player.name}
            </div>
          </Link>
        </div>
        <div className="flex flex-col justify-center items-center justify-center">
          <div className="w-16 bg-slate-900 opacity-90 rounded">
          <div>
              {player.role === "Jungle" ? (
                <img alt="" src={
                  rank === "Unranked"
                    ? positions[`Position_Iron-Jungle.png`]
                    : positions[`Position_${rank}-Jungle.png`]
                } />
              ) : player.role === "Top" ? (
                <img alt="" src={
                  rank === "Unranked"
                    ? positions[`Position_Iron-Top.png`]
                    : positions[`Position_${rank}-Top.png`]
                } />
              ) : player.role === "Bot" ? (
                <img alt="" src={
                  rank === "Unranked"
                    ? positions[`Position_Iron-Bot.png`]
                    : positions[`Position_${rank}-Bot.png`]
                } />
              ) : player.role === "Support" ? (
                <img alt="" src={
                  rank === "Unranked"
                    ? positions[`Position_Iron-Support.png`]
                    : positions[`Position_${rank}-Support.png`]
                } />
               ) : player.role === "Mid" ? (
                  <img alt="" src={
                    rank === "Unranked"
                      ? positions[`Position_Iron-Mid.png`]
                      : positions[`Position_${rank}-Mid.png`]
                  } />
                ) : "" }
            </div>
          </div>
        </div>
      </div>
      <div className="flex m-2 space-x-2">
        <div className="flex-1 bg-slate-400 rounded">
          <Autocomplete
            value={player.role || ROLES[0]}
            onChange={(event, newInputValue) => {
              if (!ROLES.some((champion) => champion === newInputValue)) {
                return;
              }
              setTeam([
                ...team.slice(0, index),
                { ...team[index], role: newInputValue },
                ...team.slice(index + 1),
              ]);

              socket.emit(color === "red" ? "redUpdate" : "blueUpdate", [
                ...team.slice(0, index),
                { ...team[index], role: newInputValue },
                ...team.slice(index + 1),
              ]);
            }}
            options={ROLES}
            renderInput={(params) => (
              <TextField {...params} variant="outlined" />
            )}
          />
        </div>
        <div className="flex-1 bg-slate-400 rounded">
          <Autocomplete
            value={player.champion || CHAMPIONS[0]}
            onChange={(event, newInputValue) => {
              if (!CHAMPIONS.some((champion) => champion === newInputValue)) {
                return;
              }
              setTeam([
                ...team.slice(0, index),
                { ...team[index], champion: newInputValue },
                ...team.slice(index + 1),
              ]);

              socket.emit(color === "red" ? "redUpdate" : "blueUpdate", [
                ...team.slice(0, index),
                { ...team[index], champion: newInputValue },
                ...team.slice(index + 1),
              ]);
            }}
            options={CHAMPIONS}
            renderInput={(params) => (
              <TextField {...params} variant="outlined" />
            )}
          />
        </div>
      </div>
    </div>
  );
}
