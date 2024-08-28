import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage/session"; //set to local Storage
import { encryptTransform } from "redux-persist-transform-encrypt";

// SLICE IMPORTING
import feedBackSlice from "./Slices/feedBackSlice";

const encryptor = encryptTransform({
    secretKey: "feedbackForm",
    onError: function (error) {

        console.error("Encryption error:", error);
    },
});

const feedBackFrom = {
    key: "feedbackForm",
    storage,
    transform: [encryptor]
}


const rootReducer = {
    feedBackform: persistReducer(feedBackFrom, feedBackSlice)
};


const Store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: true,
            thunk: true
        }),
})


export const persistor = persistStore(Store);
export default Store;