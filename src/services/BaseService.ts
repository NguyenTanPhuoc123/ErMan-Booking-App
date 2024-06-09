import {NetInfoState} from '@react-native-community/netinfo';
import { Store } from 'redux';
import { AppServiceAbstract } from './BaseServiceAbstract';
import { AuthService } from './AuthService';
export class BaseService {
    private static _instance? : BaseService;
    private appConnection: boolean;
    private baseServiceObserve: AppServiceAbstract[];
    private reduxStore?:Store;
    private auth:AuthService;
    constructor(store:Store){
        this.appConnection = true;
        this.baseServiceObserve = [
            (this.auth=AuthService.instance())
        ];
        this.setReduxStore(store)
    }

    setReduxStore(store?:Store){
        if(store){
            this.reduxStore = store;
            for(const obs of this.baseServiceObserve){
                obs.setReduxStore(store);
            }
        }
        
    }

    async onConnectionChange(state:NetInfoState){
        if(state.isInternetReachable !=null){
            const isConnected = state.isConnected === true && state.isInternetReachable ===true;
            const previousConnection = this.appConnection;
            this.appConnection = isConnected;
            if(isConnected!==previousConnection){
               for (const obs of this.baseServiceObserve){
                    await obs.onConnectionChange(isConnected);
               }
               
            }
        }
    }

    static instance(store:Store):BaseService{
        if(!BaseService._instance){
            BaseService._instance = new BaseService(store);
        }
        BaseService._instance.setReduxStore(store);
        return BaseService._instance;
    }
}