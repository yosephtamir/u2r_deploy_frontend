import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    userRole: "",
    is_verified: false,
    is_active: true,
    is_companyAdmin: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userInfoSuccess(state, action) {
        state.userRole = action.payload.user_info.userRole;
        state.is_verified = action.payload.data.is_verified;
        state.is_active = action.payload.data.is_active;
        state.is_companyAdmin = action.payload.data.is_companyAdmin;
    },
    userIsSellerCompanyAdmin(state) {
        state.userRole = 'seller'
        state.is_verified = true;
        state.is_active = true;
        state.is_companyAdmin = true;
    },
    userIsBuyerCompanyAdmin(state) {
        state.userRole = 'buyer'
        state.is_verified = true;
        state.is_active = true;
        state.is_companyAdmin = true;
    },
    userIsNotCompanyAdmin(state) {
        state.is_verified = false;
        state.is_active = false;
        state.is_companyAdmin = false;
    },
  },
});

export const { userInfoSuccess, userIsSellerCompanyAdmin , userIsBuyerCompanyAdmin, userIsNotCompanyAdmin} = userSlice.actions;
export default userSlice.reducer;