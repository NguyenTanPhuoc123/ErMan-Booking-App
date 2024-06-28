import { all, fork } from "redux-saga/effects";
import { networkSaga } from "../modules/network";
import { authSaga } from "../modules/auth";
import {serviceSaga} from "../modules/service"
import userSaga from "../modules/user";
export default function* rootSaga(){
    yield all([
        fork(networkSaga),
        fork(authSaga),
        fork(serviceSaga),
        fork(userSaga)
    ]);
}