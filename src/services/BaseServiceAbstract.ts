import {Store} from 'redux';
import {AppStateStatus} from 'react-native';
import {RootState} from '../redux/reducers';

export abstract class BaseServiceAbstract {
  protected reduxStore?: Store;

  constructor() {}

  setReduxStore(store?: Store) {
    if (store) {
      this.reduxStore = store;
    }
  }

  abstract onAppStateChange(
    currentState: AppStateStatus,
    nextState: AppStateStatus,
  ): Promise<void>;
  abstract onConnectionChange(isConnected: boolean): Promise<void>;
  abstract destroyService(): void;

  getReduxState(): RootState | undefined {
    if (!this.reduxStore) {
      return undefined;
    }
    const state: RootState = this.reduxStore.getState();
    return state;
  }
}

export abstract class  AppServiceAbstract extends BaseServiceAbstract {
    
}