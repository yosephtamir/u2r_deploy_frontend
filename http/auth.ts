import axios from 'axios';

// export const AUTH_HTTP_URL = 'http://localhost:8000/api/v1/';
export const AUTH_HTTP_URL = 'https://u2r.hightier.tech/api/v1/';

const $http = axios.create({
  baseURL: AUTH_HTTP_URL,
  headers: {
    'Content-Type': 'application/json; charset=UTF-8',
  },
});

type UserProfile = {
  managerFirstName: string;
  managerMiddleName: string;
  managerLastName: string;
  managerCountry: string;
  managerRegion: string;
  managerZone: string;
  managerWoreda: string;
  managerKebele: string;
  managerPhoneNumber: string;
  userRole: string;
}

type UserCompany = {
  companyName: string;
  companyCountry: string;
  companyRegion: string;
  companyZone: string;
  companyWoreda: string;
  companyKebele: string;
  companyHN: string;
  companyTIN: string;
};

type RegistrationRequirements = {
  email: string;
  password: string;
  user_profile: UserProfile;
  user_company: UserCompany;
}

// authentication related
export const signUpUserWithEmail = async (props: { email: string }) => {
  try {
    const res = await $http.post('/auth/check-email/', props);
    return res;
  } catch (e: any) {
    throw e?.response?.data || { message: e.message };
  }
};

export const authorizeToken = async (token: any) => {
  try {
      const res = await $http.post('/auth/authorize/', {token}, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      return res?.data;
    } catch (e: any) {
      throw e?.response?.data || { message: e.message };
    }
};

export const registerUser = async (props: RegistrationRequirements) => {
  try {
    const res = await $http.post('/auth/signup/', props, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log("right after sent", props)
    return res;
  } catch (e: any) {
    console.log("right after an error ", props)
    console.log("the error:", e)
    throw e?.response?.data || { message: e.message }
  }
};

export const loginUser = async (props: {email: string, password: string}) => {
  try {
    const res = await $http.post('/auth/login/', props);
    return res;
  } catch (e: any) {
    throw e?.response?.data || { message: e.message}
  }
};


// user related
export const getUserInfo = async (userId: string | null) => {
  try {
    if (userId) {
      const res = await $http.get(`/users/${userId}/profile/`);
      return res;
    } else {
      console.log("Please Provide User ID")
    }
  } catch (e: any) {
    throw e?.response?.data || { message: e.message}
  }
};