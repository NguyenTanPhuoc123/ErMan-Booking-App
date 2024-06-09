import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from 'redux-saga'
import reducers from "./reducers";
import rootSaga from "./sagas";
import { persistStore } from "redux-persist";

const sagaMiddleware = createSagaMiddleware();
const store = configureStore({
    reducer: reducers,
    middleware: getDefaultSagaMiddleware => getDefaultSagaMiddleware({thunk:false,immutableCheck: false,serializableCheck:false}).concat([sagaMiddleware])
})

 const persistor = persistStore(store,undefined, () =>{
    console.log("Persist Store complete!");
    
}

)

sagaMiddleware.run(rootSaga);
export {store, persistor};