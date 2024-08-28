import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    fromData: {
        title: "",
        formFields: {}
    },
    loading: false,
};

const feedBackForm = createSlice({
    name: "feedBackForm",
    initialState,
    reducers: {
        formData: (state, action) => {
            state.fromData.title = action.payload.title;
            state.fromData.formFields = action.payload.formFields;
        },
    }
})


export const {
    formData
} = feedBackForm.actions;

export default feedBackForm.reducer;