import React from 'react'
import { importAll } from '../../utils';
import classNames from 'classnames';
import moment from 'moment';

const images = importAll(require.context('../../../assets/champions', false, /\.png/));

function GameCard({ game }) {
    return (
        <div className={classNames("h-32 flex justify-around space-x-8 p-3", { 'bg-darkBlue': game.winner, 'bg-darkRed': !game.winner })}>
            <div className="flex items-center justify-start w-1/2">
                <div className="flex flex-col justify-between flex-1">
                    <div className="font-bold text-gray-200">{game.map}</div>
                    <div className="text-gray-200">{moment(game.date).fromNow()}</div>
                    <div className={classNames("font-semibold text-red-300", { 'text-blue-300': game.winner })}>{game.winner ? `Victory (+${game.ratingChange})` : `Defeat (${game.ratingChange})`}</div>
                </div>
                <div className="flex flex-col justify-center flex-1 items-center p-1">
                    <img className="rounded-full w-14 h-14" alt="" src={images[`${game.myChamp}Square.png`]} />
                    <div className="text-gray-200">{game.myChamp}</div>
                </div>
            </div>
            <div className={classNames("hidden items-center justify-between w-1/2 md:flex p-2")}>
                <div className="flex w-full">
                    <div className="flex flex-col flex-1 truncate">
                        {game.blue.map(b =>
                            <div className="flex items-end space-x-1 space-y-1 text-sm text-gray-300 justify-start">
                                <img className="w-5 h-5" alt="" src={images[`${b.champ}Square.png`]} />
                                <div className={classNames({ 'font-bold text-gray-100': b.player === game.playerName })}>{b.player}</div>
                            </div>)}
                    </div>
                    <div className="flex flex-col flex-1 truncate">
                        {game.red.map(r =>
                            <div className="flex items-end space-x-1 space-y-1 text-sm text-gray-300 justify-start">
                                <img className="w-5 h-5" alt="" src={images[`${r.champ}Square.png`]} />
                                <div className={classNames({ 'font-bold text-gray-100': r.player === game.playerName })}>{r.player}</div>
                            </div>)}
                    </div>
                </div>
            </div>
        </div>
    )
}


export default GameCard

