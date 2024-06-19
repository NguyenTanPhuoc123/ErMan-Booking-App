import AsyncStorage from '@react-native-async-storage/async-storage';
import {PersistConfig, persistReducer } from 'redux-persist';
import autoMergeLevel1 from 'redux-persist/es/stateReconciler/autoMergeLevel1';
import { combineReducers } from 'redux';
import {TypedUseSelectorHook,useSelector} from 'react-redux'
import {reducer as network} from '../modules/network/reducer'
import {reducer as auth} from '../modules/auth/reducer'
import {reducer as service} from '../modules/service/reducer'
import { IAuthState } from '../modules/auth/model';
import { IServiceState } from '../modules/service/model';

const authPersist: PersistConfig<IAuthState>={
    key:'auth',
    whitelist:['isLogged','userData'],
    storage: AsyncStorage,
    stateReconciler: autoMergeLevel1
};

const servicePersist: PersistConfig<IServiceState>= {
    key: 'service',
    whitelist:['services'],
    storage:AsyncStorage,
    stateReconciler:autoMergeLevel1
}

const reducers = combineReducers({
    network,
    auth: persistReducer(authPersist,auth),
    service: persistReducer(servicePersist,service)
});

export type RootState = ReturnType<typeof reducers>;

export const selectState: TypedUseSelectorHook<RootState> = useSelector;

export default reducers;