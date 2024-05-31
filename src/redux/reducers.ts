import AsyncStorage from '@react-native-async-storage/async-storage';
import {PersistConfig, persistReducer } from 'redux-persist';
import autoMergeLevel1 from 'redux-persist/es/stateReconciler/autoMergeLevel1';
import { combineReducers } from 'redux';
import {TypedUseSelectorHook,useSelector} from 'react-redux'
import {reducer as network} from '../modules/network/reducer'


const reducers = combineReducers({
    network
});

export type RootState = ReturnType<typeof reducers>;

export const selectState: TypedUseSelectorHook<RootState> = useSelector;

export default reducers;