import {SET_COORDINATES} from './actionTypes';

export const setPlace = (coordinates)=>{
    console.log(coordinates)
    return {
        type: SET_COORDINATES,
        coordinates: coordinates
    };
};