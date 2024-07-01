import AsyncStorage from '@react-native-async-storage/async-storage';
import {PersistConfig, persistReducer } from 'redux-persist';
import autoMergeLevel1 from 'redux-persist/es/stateReconciler/autoMergeLevel1';
import { combineReducers } from 'redux';
import {TypedUseSelectorHook,useSelector} from 'react-redux'
import {reducer as network} from '../modules/network/reducer'
import {reducer as auth} from '../modules/auth/reducer'
import {reducer as service} from '../modules/service/reducer'
import {reducer as user} from '../modules/user/reducer'
import {reducer as branch} from '../modules/branch/reducer'
import { IAuthState } from '../modules/auth/model';
import { IServiceState } from '../modules/service/model';
import { IUserState } from '../modules/user/model';
import { IBranchState } from '../modules/branch/model';

const authPersist: PersistConfig<IAuthState>={
    key:'auth',
    whitelist:['isLogged','userData'],
    storage: AsyncStorage,
    stateReconciler: autoMergeLevel1
};

const userPersist: PersistConfig<IUserState>={
    key:'user',
    whitelist:['users'],
    storage: AsyncStorage,
    stateReconciler: autoMergeLevel1
};

const servicePersist: PersistConfig<IServiceState>= {
    key: 'service',
    whitelist:['services'],
    storage:AsyncStorage,
    stateReconciler:autoMergeLevel1
}

const branchPersist: PersistConfig<IBranchState>= {
    key: 'branch',
    whitelist:['branchs'],
    storage:AsyncStorage,
    stateReconciler:autoMergeLevel1
}

const reducers = combineReducers({
    network,
    auth: persistReducer(authPersist,auth),
    user: persistReducer(userPersist,user),
    service: persistReducer(servicePersist,service),
    branch: persistReducer(branchPersist,branch)
});

export type RootState = ReturnType<typeof reducers>;

export const selectState: TypedUseSelectorHook<RootState> = useSelector;

export default reducers;