import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IActionSaveRatingPayload, IRatingState, Rating } from "./model";

const initialState:IRatingState = {
    ratings:[],
    hasNextPage:true,
    endCursor:''
}

const ratingSlice = createSlice({
    name:'rating',
    initialState,
    reducers:{
        SAVE_RATING : (state:IRatingState,action:PayloadAction<IActionSaveRatingPayload>)=>{
           state.ratings.push(action.payload.rating);
            return{
                ...state
            }
        }
    }
})

export const {reducer} = ratingSlice;
export const {SAVE_RATING:saveRating} = ratingSlice.actions; 