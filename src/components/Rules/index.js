import React from "react";
import { importAll } from "../../utils";

const images = importAll(
  require.context("../../../assets/rankIcons", false, /\.svg/)
);
const index = () => {
  return (
    <div className="w-full h-full flex justify-center text-center bg-gray-800 py-8 mt-12">
      <div>
        <h1 className="text-2xl font-bold">Season 3 - 6/1/2022 - 12/31/2022</h1>
        <div className="flex justify-center py-8">
          <table class="table-auto ">
            <thead>
              <tr>
                <th class="px-8">Rank</th>
                <th class="px-8">Rating</th>
              </tr>
            </thead>
            <tbody>
              <tr >
                <td className="py-2" >
                  <img src={images["Unranked.svg"]} alt="" />
                </td>
                <td>&lt; 10 games</td>
              </tr>
              <tr>
                <td className="py-2">
                  <img src={images["Iron.svg"]} alt="" />
                </td>
                <td> 0 - 1299</td>
              </tr>
              <tr>
                <td className="py-2">
                  <img src={images["Bronze.svg"]} alt="" />
                </td>
                <td>1300 - 1399</td>
              </tr>
              <tr>
                <td className="py-2">
                  <img src={images["Silver.svg"]} alt="" />
                </td>
                <td>1400 - 1499</td>
              </tr>
              <tr>
                <td className="py-4">
                  <img src={images["Gold.svg"]} alt="" />
                </td>
                <td>1500 - 1599</td>
              </tr>
              <tr>
                <td className="py-4">
                  <img src={images["Platinum.svg"]} alt="" />
                </td>
                <td>1600 - 1699</td>
              </tr>
              <tr>
                <td className="py-4">
                  <img src={images["Diamond.svg"]} alt="" />
                </td>
                <td>1700 - 1799</td>
              </tr>
              <tr>
                <td className="py-6">
                  <img src={images["Master.svg"]} alt="" />
                </td>
                <td>1800 - 1899</td>
              </tr>
              <tr>
                <td className="py-6">
                  <img src={images["Grandmaster.svg"]} alt="" />
                </td>
                <td>1900 - 1999</td>
              </tr>
              <tr>
                <td className="py-6">
                  <img src={images["Challenger.svg"]} alt="" />
                </td>
                <td>2000+</td>
              </tr>
            </tbody>
          </table>
        </div>
        <h2 className="text-xl font-bold my-4">FAQ</h2>
        <p className="text-lg font-bold">What is this?</p>
        <p>A league of legends inhouse match making system</p>
        <br />
        <p className="text-lg font-bold">How are teams picked?</p>
        <p>Fully random with no weighting</p>
        <br />
        <p className="text-lg font-bold">How does dodging work?</p>
        <p>Dodging only affects the rating of the player who dodged. </p>
        <p>You will lose 5 rating * the size of your team.</p>
        <p>If you dodge a 5v5 you lose 25 rating, 3v3 - 15 rating..etc</p>
        <br />
        <p className="text-lg font-bold">How is rating calculated?</p>
        <p>All players start the season with 1200 rating.</p>
        <p>
          It is calculated per match based off the sum of the team elos using
          the chess elo formula.
        </p>
        <p>
          I have 25% inflation to introduce rating into the system over the
          season.
        </p>
      </div>
    </div>
  );
};

export default index;
