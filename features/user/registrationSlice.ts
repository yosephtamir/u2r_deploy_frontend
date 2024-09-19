import { createSlice } from '@reduxjs/toolkit';
import { FormData, UserCompany, UserProfile } from '@/@types';

const initialState = {
    email: "",
    password: "",
    agree: false,
    user_profile: {
        userFirstName: "", 
        userMiddleName: "", 
        userLastName: "", 
        userCountry: "", 
        userRegion: "", 
        userZone: "", 
        userWoreda: "", 
        userKebele: "", 
        userPhoneNumber: "", 
        userRole: "",
        userRenewedIDFront: [],
        userRenewedIDBack: [],
        profilePic: [],
    },
    user_company: {
        companyName: "",
        companyCountry: "",
        companyRegion: "",
        companyZone: "",
        companyWoreda: "",
        companyKebele: "",
        companyHN: "",
        companyTIN: "",
        companyLicense: [],
        companyLogo: [],
    },
};

const registrationSlice = createSlice({
  name: 'registration',
  initialState,
  reducers: {
    userEmailEntered(state, action) {
        state.email = action.payload.email;
        state.password = action.payload.password;
        state.agree = action.payload.agree;
    },
    userProfileEntered(state, action) {
        state.user_profile.userFirstName = action.payload.userFirstName; 
        state.user_profile.userMiddleName = action.payload.userMiddleName; 
        state.user_profile.userLastName = action.payload.userLastName; 
        state.user_profile.userCountry = action.payload.userCountry; 
        state.user_profile.userRegion = action.payload.userRegion; 
        state.user_profile.userZone = action.payload.userZone; 
        state.user_profile.userWoreda = action.payload.userWoreda; 
        state.user_profile.userKebele = action.payload.userKebele; 
        state.user_profile.userPhoneNumber = action.payload.userPhoneNumber; 
        state.user_profile.userRole = action.payload.userRole;
        state.user_profile.userRenewedIDFront = action.payload.userRenewedIDFront;
        state.user_profile.userRenewedIDBack = action.payload.userRenewedIDBack;
        state.user_profile.profilePic = action.payload.profilePic;
    },
    companyProfileEntered(state, action) {
        state.user_company.companyName = action.payload.companyName;
        state.user_company.companyCountry = action.payload.companyCountry;
        state.user_company.companyRegion = action.payload.companyRegion;
        state.user_company.companyZone = action.payload.companyZone;
        state.user_company.companyWoreda = action.payload.companyWoreda;
        state.user_company.companyKebele = action.payload.companyKebele;
        state.user_company.companyHN = action.payload.companyHN;
        state.user_company.companyTIN = action.payload.companyTIN;
        state.user_company.companyLicense = action.payload.companyLicense;
        state.user_company.companyLogo = action.payload.companyLogo;
    },
  },
});

export const { userEmailEntered, userProfileEntered , companyProfileEntered } = registrationSlice.actions;
export default registrationSlice.reducer;