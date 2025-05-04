import moveData from '../data/moveData.json';
import tmMoves from '../data/tmMoves.json';
import tutorMoves from '../data/tutorMoves.json';
import { MoveData, MoveMap } from '../types';

function getMoveData(id: number){

    return (moveData as MoveData)[id.toString()]
}

function getTMMove(index: number) {
    const moveId = (tmMoves as MoveMap)[index.toString()];
    return getMoveData(moveId);
}

function getTutorMove(index: number) {
    const moveId = (tutorMoves as MoveMap)[index.toString()];
    return getMoveData(moveId);
}

// Function to return move name given id
function getMoveName(id: number) {
    const move = getMoveData(id);
    return move ? move.name : 'Unknown Move';
}

export { getMoveData, getTMMove, getTutorMove, getMoveName };