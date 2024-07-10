import { all, fork } from "redux-saga/effects";
import { networkSaga } from "../modules/network";
import { authSaga } from "../modules/auth";
import {serviceSaga} from "../modules/service"
import {userSaga} from "../modules/user";
import {branchSaga} from "../modules/branch";
import {workScheduleSaga} from "../modules/workschedule";
import {bookingSaga} from "../modules/booking";

export default function* rootSaga(){
    yield all([
        fork(networkSaga),
        fork(authSaga),
        fork(serviceSaga),
        fork(userSaga),
        fork(branchSaga),
        fork(workScheduleSaga),
        fork(bookingSaga)
    ]);
}