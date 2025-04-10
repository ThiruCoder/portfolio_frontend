import { configureStore } from "@reduxjs/toolkit";
import LibraryData from "./Reducer";


export const store = configureStore({
    reducer: {
        libs: LibraryData
    }
});