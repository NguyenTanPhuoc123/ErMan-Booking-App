import { RootState } from "../../redux/reducers";
import { select } from "redux-saga/effects";


export function* isNetworkAvailable() {
  const getNetworkStatus = (state: RootState) => state.network;
  const { isConnected } = yield select(getNetworkStatus);
  return { isConnected };
}



