import AsyncStorage from '@react-native-async-storage/async-storage';
import {PersistConfig, persistReducer} from 'redux-persist';
import autoMergeLevel1 from 'redux-persist/es/stateReconciler/autoMergeLevel1';
import {combineReducers} from 'redux';
import {TypedUseSelectorHook, useSelector} from 'react-redux';
import {reducer as network} from '../modules/network/reducer';
import {reducer as auth} from '../modules/auth/reducer';
import {reducer as service} from '../modules/service/reducer';
import {reducer as user} from '../modules/user/reducer';
import {reducer as branch} from '../modules/branch/reducer';
import {reducer as workSchedule} from '../modules/workschedule/reducer';
import {reducer as booking} from '../modules/booking/reducer';
import {reducer as rating} from '../modules/rate/reducer';
import {reducer as notification} from '../modules/notification/reducer';
import {IAuthState} from '../modules/auth/model';
import {IServiceState} from '../modules/service/model';
import {IUserState} from '../modules/user/model';
import {IBranchState} from '../modules/branch/model';
import {IWorkScheduleState} from '../modules/workschedule/model';
import {IBookingState} from '../modules/booking/model';
import {IRatingState} from '../modules/rate/model';
import {INotificationState} from '../modules/notification/model';

const authPersist: PersistConfig<IAuthState> = {
  key: 'auth',
  whitelist: ['isLogged', 'userData'],
  storage: AsyncStorage,
  stateReconciler: autoMergeLevel1,
};

const userPersist: PersistConfig<IUserState> = {
  key: 'user',
  whitelist: ['users', 'hasNextPage', 'endCursor'],
  storage: AsyncStorage,
  stateReconciler: autoMergeLevel1,
};

const servicePersist: PersistConfig<IServiceState> = {
  key: 'service',
  whitelist: ['services', 'hasNextPage', 'endCursor'],
  storage: AsyncStorage,
  stateReconciler: autoMergeLevel1,
};

const branchPersist: PersistConfig<IBranchState> = {
  key: 'branch',
  whitelist: ['branchs', 'hasNextPage', 'endCursor'],
  storage: AsyncStorage,
  stateReconciler: autoMergeLevel1,
};

const bookingPersist: PersistConfig<IBookingState> = {
  key: 'booking',
  whitelist: ['bookings', 'hasNextPage', 'endCursor'],
  storage: AsyncStorage,
  stateReconciler: autoMergeLevel1,
};

const ratingPersist: PersistConfig<IRatingState> = {
  key: 'rating',
  whitelist: ['ratings', 'hasNextPage', 'endCursor'],
  storage: AsyncStorage,
  stateReconciler: autoMergeLevel1,
};

const workSchedulePersist: PersistConfig<IWorkScheduleState> = {
  key: 'workschedule',
  whitelist: ['workschedules'],
  storage: AsyncStorage,
  stateReconciler: autoMergeLevel1,
};

const notificationPersist: PersistConfig<INotificationState> = {
  key: 'notification',
  whitelist: ['notifications,hasNextPage,endCursor'],
  storage: AsyncStorage,
  stateReconciler: autoMergeLevel1,
};

const reducers = combineReducers({
  network,
  auth: persistReducer(authPersist, auth),
  user: persistReducer(userPersist, user),
  service: persistReducer(servicePersist, service),
  branch: persistReducer(branchPersist, branch),
  workschedule: persistReducer(workSchedulePersist, workSchedule),
  booking: persistReducer(bookingPersist, booking),
  rating: persistReducer(ratingPersist, rating),
  notification: persistReducer(notificationPersist, notification),
});

export type RootState = ReturnType<typeof reducers>;

export const selectState: TypedUseSelectorHook<RootState> = useSelector;

export default reducers;
