import {Pokemon} from "../../types";

export const matchesMegaFilter = (pokemon: Pokemon, megaCycle: boolean | undefined): boolean => {

    if (megaCycle === undefined) return true;

    else if (megaCycle === true) {
    return pokemon.forms ? pokemon.forms.includes("mega") : false;
    }

    else if (megaCycle === false) {
    return pokemon.forms ? !pokemon.forms.includes("mega") : true;
    }

    return true;
}