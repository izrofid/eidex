import { useEffect, useState } from "react";
import { animated } from "react-spring";
import { useAnimConfig } from "@/utils/animConfigs";
import getSprite from "@/utils/getSprite";

const PokemonSprite = ({
  spriteIndex,
  alt,
  isShiny,
}: {
  spriteIndex: number;
  alt: string;
  isOpen: boolean;
  isShiny: boolean;
}) => {
  const imgDir = `sprites/${isShiny ? "anim_shiny" : "anim"}/${spriteIndex}/anim_front.webp`;

  const [displaySprite, setDisplaySprite] = useState(imgDir);
  const [frame, setFrame] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [animeFrames, animeConfig] = useAnimConfig(spriteIndex, frame);

  const handleClick = () => {
    if (isRunning) return; // Prevent multiple clicks during sequence
    setIsRunning(true);
    setFrame(0); // Reset to first state
  };

  const handleSpriteError = ({
    currentTarget,
  }: React.SyntheticEvent<HTMLImageElement, Event>) => {
    currentTarget.onerror = null; // prevents looping
    setIsRunning(false);
    setDisplaySprite(getSprite(spriteIndex, isShiny));
  };
  /**
   * Need this incase user clicks Evo form so `displaySprite` changes
   */
  useEffect(() => {
    setDisplaySprite(imgDir);
  }, [spriteIndex, isShiny]);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    let isMounted = true;

    const runSequence = (index = 0) => {
      if (!imageLoaded || !isMounted || index >= animeFrames.length) {
        if (isMounted) setIsRunning(false); // End sequence
        return;
      }
      const [nextState, holdDuration] = animeFrames[index];
      setFrame(nextState);
      timeoutId = setTimeout(
        () => {
          runSequence(index + 1); // Move to next state
        },
        (holdDuration * 1000) / 60,
      ); // holdDuration * 10 ms
    };

    runSequence(0);

    return () => {
      isMounted = false;
      clearTimeout(timeoutId);
    };
  }, [isRunning, animeFrames, imageLoaded]);

  return (
    <div className={`sprite-box`} onClick={handleClick}>
      <animated.img
        src={displaySprite}
        alt={alt}
        className="pokemon-sprite"
        onError={handleSpriteError}
        onLoad={() => setImageLoaded(true)}
        style={{
          ...animeConfig,
          y: frame === 0 ? "0px" : "-50%",
        }}
      />
    </div>
  );
};

export default PokemonSprite;
