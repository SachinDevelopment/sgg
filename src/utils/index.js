export const calculateWinrate = (wins, loses) => {
  if(wins > 0 && loses === 0) return 100;
  return Math.round((wins/(wins+loses))*100);
};
export const winrateColor = (winrate, wins, loses) => {
  return winrate > 50
    ? "SeaGreen"
    : winrate < 50 && (wins > 0 || loses > 0)
    ? "indianred"
    : winrate === 50
    ? "SandyBrown"
    : "";
};

export const tailwindWinratecolor = (winrate) => {
  if (winrate >= 70) return "yellow-500";
  if (winrate >= 60) return "blue-500";
  return "gray-500";
};

export const CHAMPIONS = [
  "Champion",
  "Aatrox",
  "Ahri",
  "Akali",
  "Akshan",
  "Alistar",
  "Amumu",
  "Anivia",
  "Annie",
  "Aphelios",
  "Ashe",
  "Aurelion Sol",
  "Azir",
  "Bard",
  "Bel'Veth",
  "Blitzcrank",
  "Brand",
  "Braum",
  "Caitlyn",
  "Camille",
  "Cassiopeia",
  "Cho'Gath",
  "Corki",
  "Darius",
  "Diana",
  "Dr.Mundo",
  "Draven",
  "Ekko",
  "Elise",
  "Evelynn",
  "Ezreal",
  "Fiddlesticks",
  "Fiora",
  "Fizz",
  "Galio",
  "Gangplank",
  "Garen",
  "Gnar",
  "Gragas",
  "Graves",
  "Gwen",
  "Hecarim",
  "Heimerdinger",
  "Illaoi",
  "Irelia",
  "Ivern",
  "Janna",
  "Jarvan",
  "Jax",
  "Jayce",
  "Jhin",
  "Jinx",
  "Kai'Sa",
  "Kalista",
  "Karma",
  "Karthus",
  "Kassadin",
  "Katarina",
  "Kayle",
  "Kayn",
  "Kennen",
  "Kha'Zix",
  "Kindred",
  "Kled",
  "Kog'Maw",
  "LeBlanc",
  "Lee Sin",
  "Leona",
  "Lillia",
  "Lissandra",
  "Lucian",
  "Lulu",
  "Lux",
  "Malphite",
  "Malzahar",
  "Maokai",
  "Master Yi",
  "Miss Fortune",
  "Mordekaiser",
  "Morgana",
  "Nami",
  "Nasus",
  "Nautilus",
  "Neeko",
  "Nidalee",
  "Nocturne",
  "Nunu",
  "Olaf",
  "Orianna",
  "Ornn",
  "Pantheon",
  "Poppy",
  "Pyke",
  "Qiyana",
  "Quinn",
  "Rakan",
  "Rammus",
  "Rek'Sai",
  "Rell",
  "Renata Glasc",
  "Renekton",
  "Rengar",
  "Riven",
  "Rumble",
  "Ryze",
  "Samira",
  "Sejuani",
  "Senna",
  "Seraphine",
  "Sett",
  "Shaco",
  "Shen",
  "Shyvana",
  "Singed",
  "Sion",
  "Sivir",
  "Skarner",
  "Sona",
  "Soraka",
  "Swain",
  "Sylas",
  "Syndra",
  "Tahm Kench",
  "Taliyah",
  "Talon",
  "Taric",
  "Teemo",
  "Thresh",
  "Tristana",
  "Trundle",
  "Tryndamere",
  "Twisted Fate",
  "Twitch",
  "Udyr",
  "Urgot",
  "Varus",
  "Vayne",
  "Veigar",
  "Vel'Koz",
  "Vex",
  "Vi",
  "Viego",
  "Viktor",
  "Vladimir",
  "Volibear",
  "Warwick",
  "Wukong",
  "Xayah",
  "Xerath",
  "Xin Zhao",
  "Yasuo",
  "Yone",
  "Yorick",
  "Yuumi",
  "Zac",
  "Zed",
  "Zeri",
  "Ziggs",
  "Zilean",
  "Zoe",
  "Zyra",
];

export const ROLES = ["Role", "Mid", "Top", "Bot", "Support", "Jungle"];

export const MAPS = ["Summoner's Rift"];

export const importAll = (r) => {
  let images = {};
  r.keys().forEach((item, index) => {
    images[item.replace("./", "")] = r(item);
  });
  return images;
};

export const wrToRank = (rating, games = 10) => {
  if(rating === 0)  return "Unranked";
  
  if (!rating) return null;
 
  if (games < 10) {
    return "Unranked";
  }

  if (rating >= 2000) {
    return "Challenger";
  }

  if (rating >= 1900) {
    return "Grandmaster";
  }

  if (rating >= 1800) {
    return "Master";
  }

  if (rating >= 1700) {
    return "Diamond";
  }

  if (rating >= 1600) {
    return "Platinum";
  }

  if (rating >= 1500) {
    return "Gold";
  }

  if (rating >= 1400) {
    return "Silver";
  }

  if (rating >= 1300) {
    return "Bronze";
  }

  return "Iron";
};

export const getRankColor = (rating, games) => {
  if (games < 10) {
    return "#363636";
  }

  if (rating >= 2000) {
    return "Gold";
  }

  if (rating >= 1900) {
    return "FireBrick";
  }

  if (rating >= 1800) {
    return "Orchid";
  }

  if (rating >= 1700) {
    return "DodgerBlue";
  }

  if (rating >= 1600) {
    return "DarkCyan";
  }

  if (rating >= 1500) {
    return "GoldenRod";
  }

  if (rating >= 1400) {
    return "Silver";
  }

  if (rating >= 1300) {
    return "SaddleBrown";
  }

  return "RosyBrown";
};

const k = 40;
const diff = 1200;
const inflationRate = 1.25;

export const calculateRatingChange = (winnerSum, loserSum) => {
  if (!winnerSum || !loserSum) return [0, 0, 0, 0];
  const probability1 = 1 / (1 + Math.pow(10, (loserSum - winnerSum) / diff));
  const blueWinRating = Number(k * (1 - probability1)).toFixed(0);
  const blueLoseRating = -1 * (k - blueWinRating);
  const redWinRating = k - blueWinRating;
  const redLoseRating = -1 * blueWinRating;
  const arr = [blueWinRating*inflationRate, blueLoseRating/inflationRate, redWinRating*inflationRate, redLoseRating/inflationRate];
  return arr.map((rating) => Number(rating).toFixed(0));
};

export const getChampNameforLink = (champName) => {
  if(!champName) return "";
  if(champName === 'Jarvan') return 'JarvanIV'
  if(champName === 'Master Yi') return 'MasterYi'
  if(champName === 'Tahm Kench') return 'TahmKench'
  if(champName === 'Xin Zhao') return 'XinZhao'
  if(champName === 'Aurelion Sol') return 'AurelionSol'
  if(champName === 'Renata Glasc') return 'Renata'
  if(champName === 'Fiddlesticks') return 'FiddleSticks'
  if(champName==="Dr.Mundo") return 'DrMundo'
  if(champName==="Miss Fortune") return 'MissFortune'
  if(champName==="Wukong") return 'MonkeyKing'
  champName = champName.replace("'","").toLowerCase();
  if(champName === 'reksai') return 'RekSai'
  if(champName === 'kogmaw') return 'KogMaw'
  return champName[0].toUpperCase() + champName.substring(1);
};