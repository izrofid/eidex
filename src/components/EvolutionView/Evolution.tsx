import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";

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
      <div className="h-23 w-20">
        <img
          src={sprite}
          alt={alt}
          className="aspect-square object-contain md:m-auto"
        />
        {details ? (
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="font-pixel inline-flex cursor-help text-center text-xs/3">
                {requirements}
              </span>
            </TooltipTrigger>
            <TooltipContent>
              <span>{details}</span>
            </TooltipContent>
          </Tooltip>
        ) : (
          <span className="font-pixel max-w-20 cursor-help text-center text-sm"></span>
        )}
      </div>
    </div>
  );
};

export default Evolution;
