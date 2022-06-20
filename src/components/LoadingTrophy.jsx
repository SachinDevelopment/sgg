import { useLottie } from "lottie-react";
import trophyAnimation from "./trophy.json";

const LoadingTrophy = () => {
  const options = {
    animationData: trophyAnimation,
    loop: true,
    autoplay: true,
  };

  const { View } = useLottie(options);
  return View;
};

export default LoadingTrophy;
