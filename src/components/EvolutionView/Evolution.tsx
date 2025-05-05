type EvolutionProps = {
    onClick: () => void;
    alt: string;
    sprite: string;
    requirements?: string;
  };
  const Evolution = ({
    onClick,
    alt,
    sprite,
    requirements = "",
  }: EvolutionProps) => {
    return (
      <div
        className="rounded-md bg-neutral-700 p-1 text-center md:p-3"
        onClick={onClick}
      >
        <img
          src={sprite}
          alt={alt}
          className="m-auto aspect-square md: object-contain"
        />
        <p className="pkmnem-face-shadow max-w-20 text-center text-xs leading-3 md:text-sm">
          {requirements}
        </p>
      </div>
    );
  };
  
  export default Evolution;