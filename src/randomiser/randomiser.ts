import { useRandomiserStore } from "@/stores/randomiserStore";
import { isAbilityAvialable } from "@/utils/abilityData";
import { getSpeciesData } from "@/utils/speciesUtils";

class Sfc32State {
  a: number;
  b: number;
  c: number;
  ctr: number;

  constructor(a: number, b: number, c: number, ctr: number) {
    this.a = a >>> 0; // Force to 32-bit unsigned
    this.b = b >>> 0;
    this.c = c >>> 0;
    this.ctr = ctr >>> 0;
  }

  nextStream(stream: number): number {
    const result = (this.a + this.b + this.ctr) >>> 0;
    this.ctr = (this.ctr + stream) >>> 0;
    this.a = (this.b ^ (this.b >>> 9)) >>> 0;
    this.b = (this.c * 9) >>> 0;
    this.c = (result + ((this.c << 21) | (this.c >>> 11))) >>> 0;
    return result;
  }
}

const RANDOMIZER_STREAM: number = 17;
const RANDOMIZER_REASON_ABILITIES: number = 9;

function randomizerRandSeed(
  reason: number,
  data1: number,
  data2: number,
  trainerId: number,
): Sfc32State {
  const state = new Sfc32State(
    (trainerId + reason) >>> 0,
    (trainerId ^ data2) >>> 0,
    data1 >>> 0,
    RANDOMIZER_STREAM,
  );

  // Warm up the generator
  for (let i = 0; i < 10; i++) {
    state.nextStream(RANDOMIZER_STREAM);
  }

  return state;
}

function randomizerNextRange(state: Sfc32State, range: number): number {
  if (range < 2) return 0;
  if (range === 0xffffffff) return state.nextStream(RANDOMIZER_STREAM);

  // Find next power of two
  let nextPowerOfTwo = range;
  nextPowerOfTwo--;
  nextPowerOfTwo |= nextPowerOfTwo >>> 1;
  nextPowerOfTwo |= nextPowerOfTwo >>> 2;
  nextPowerOfTwo |= nextPowerOfTwo >>> 4;
  nextPowerOfTwo |= nextPowerOfTwo >>> 8;
  nextPowerOfTwo |= nextPowerOfTwo >>> 16;
  nextPowerOfTwo++;

  const mask = nextPowerOfTwo - 1;

  // Rejection sampling
  let result: number;
  do {
    result = state.nextStream(RANDOMIZER_STREAM) & mask;
  } while (result >= range);

  return result;
}

function randomizeAbility(
  species: number,
  abilityNum: number,
  abilityWhitelist: number[],
  isRandomiserActive: boolean,
): [number, boolean] {
  // Check if randomiser is active
  if (!isRandomiserActive) {
    return [getSpeciesData(species).abilities[abilityNum], true]
  }

  const trainerId = useRandomiserStore.getState().trainerIdInfo?.fullId ?? 0;

  // Generate seed
  const seed = ((species << 8) | abilityNum) >>> 0;

  // Initialize RNG
  const state = randomizerRandSeed(
    RANDOMIZER_REASON_ABILITIES,
    seed,
    species,
    trainerId,
  );

  // Pick random ability from whitelist
  const newAbility =
    abilityWhitelist[randomizerNextRange(state, abilityWhitelist.length)];

  const isAvailable: boolean = isAbilityAvialable(species, abilityNum, isRandomiserActive)

  const result: [number, boolean] = [newAbility, isAvailable]

  return result;
}

export { randomizeAbility };
