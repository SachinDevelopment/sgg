import DesktopPlayer from "./desktop";
import MobilePlayer from "./mobile";
import { useViewport } from "../../context/ViewportProvider";
import { useParams } from "react-router-dom";


const Player = () => {
  const { width } = useViewport();
  const { id } = useParams();
  const breakpoint = 560;


  return (
   width > breakpoint ? <DesktopPlayer playerId={id}/>: <MobilePlayer playerId={id}/>
  );
};

export default Player;
