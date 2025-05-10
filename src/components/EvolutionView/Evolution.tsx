import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

type EvolutionProps = {
  onClick: () => void;
  alt: string;
  sprite: string;
  requirements?: string;
  details?: string;
};

const Evolution = ({
  onClick,
  alt,
  sprite,
  requirements = "",
  details = "",
}: EvolutionProps) => {
  return (
    <div
      className="flex flex-col items-center rounded-md bg-neutral-700 p-1 text-center md:p-3"
      onClick={onClick}
    >
      <div className="h-22 w-18">
        <img
          src={sprite}
          alt={alt}
          className="md: m-auto aspect-square object-contain"
        />
        {details ? (
          <Tooltip>
            <TooltipTrigger asChild>
              <p className="pkmnem-face-shadow max-w-20 text-center text-xs leading-3 cursor-help">
                {requirements}
              </p>
            </TooltipTrigger>
            <TooltipContent>
              <span>{details}</span>
            </TooltipContent>
          </Tooltip>
        ) : (
          <span className="max-w-20 text-center text-xs text-wrap">
            {requirements}
          </span>
        )}
      </div>
    </div>
  );
};

export default Evolution;