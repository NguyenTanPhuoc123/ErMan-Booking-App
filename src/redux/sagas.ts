import { all, fork } from "redux-saga/effects";
import { networkSaga } from "../modules/network";
import { authSaga } from "../modules/auth";

export default function* rootSaga(){
    yield all([
        fork(networkSaga),
        fork(authSaga)
    ]);
}