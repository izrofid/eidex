import {Pokemon} from "../../types";

export const matchesNfeFilter = (pokemon: Pokemon, nfeCycle: boolean | undefined): boolean => {

    if (nfeCycle === undefined) return true;

    else if (nfeCycle === true) {
    return !pokemon.evolutions ? true : false;
    }

    else if (nfeCycle === false) {
    return pokemon.evolutions ? true : false;
    }

    return true;
}