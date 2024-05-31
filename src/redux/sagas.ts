import { all, fork } from "redux-saga/effects";
import { networkSaga } from "../modules/network";

export default function* rootSaga(){
    yield all([
        fork(networkSaga)
    ]);
}