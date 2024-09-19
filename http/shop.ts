import { MutationFunction } from '@tanstack/react-query';
import axios from 'axios';

// export const SHOP_HTTP_URL = 'http://localhost:8000/api/v1/';
export const SHOP_HTTP_URL = 'https://u2r.hightier.tech/api/v1/';

const $http = axios.create({
    baseURL: SHOP_HTTP_URL,
    headers: {
        'Content-Type': 'application/json; charset=UTF-8',
    },
});

const token = typeof window !== 'undefined' ? localStorage.getItem("token") : null
console.log(token)


export const getAllShops = async () => {
    try {
        const res = await $http.get('/shops/');
        console.log(res)
        return res?.data;
    } catch (e: any) {
        console.log("the error: ", e)
        throw e?.response?.data || { message: e.message };
    }
};

export const createCompanyShop = (companyId: any): MutationFunction<any, any> => {
  return async (shopData: any) => {
    try {
      const res = await $http.post(`/shops/company/${companyId}/`, shopData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res);

      return res.data;
    } catch (e: any) {
      console.log("the error: ", e);
      throw e?.response?.data || { message: e.message };
    }
  };
};

export const getCompanyShops = async (companyId: any) => {
    try {
        const res = await $http.get(`/shops/company/${companyId}/`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log(res)
        return res?.data;
    } catch (e: any) {
        console.log("the error: ", e)
        throw e?.response?.data || { message: e.message };
    }
};

export const updateShopDetails = (companyId: any, shopId: any): MutationFunction<any, any> => {
  return async (shopUpdateData: any) => {
    try {
        const res = await $http.patch(`shops/company/${companyId}/shop/${shopId}/`, shopUpdateData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log(res)
        return res?.data;
    } catch (e: any) {
        console.log("the error: ", e)
        throw e?.response?.data || { message: e.message };
    }
  };  
};

export const deleteShop = (companyId: any, shopId: any) => {
    return async () => {
        try {
            const res = await $http.delete(`/shops/company/${companyId}/shop/${shopId}/`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(res?.data)
            return res?.data;
        } catch (e: any) {
            console.log(e.message)
            throw e?.response?.data || { message: e.message };
        }
    };
};

export const getShopDetail = async (shopId: any) => {
    try {
        console.log(shopId)
        const res = await $http.get(`/shops/shop/${shopId}/`);
        return res?.data;
    } catch (e: any) {
        throw e?.response?.data || { message: e.message };
    }
};

export const getShopDetailAdmin = async (shopId: any, companyId: any) => {
    try {
        console.log(shopId, companyId)
        const res = await $http.get(`/shops/company/${companyId}/shop/${shopId}/`);
        return res?.data;
    } catch (e: any) {
        throw e?.response?.data || { message: e.message };
    }
};

export const getShopsAdmin = async (companyId: any) => {
    try {
        const res = await $http.get(`shops/company/${companyId}/`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return res?.data;
    } catch (e: any) {
        throw e?.response?.data || { message: e.message };
    }
};

export const createShopProduct = (shopId: any, companyId: any): MutationFunction<any, any> => {
  return async (productData: any) => {
    try {
      const res = await $http.post(`/shops/company/${companyId}/shop/${shopId}/products/`, productData, {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
        },
      });
      console.log(res);

      return res.data;
    } catch (e: any) {
      console.log(productData)
      console.log("the error: ", e);
      throw e?.response?.data || { message: e.message };
    }
  };
};


export const getShopProducts = async (shopId: any, page: number) => {
    try {
        const res = await $http.get(`/marketplace/shops/${shopId}/products?page=${page}`);
        return res?.data;
    } catch (e: any) {
        throw e?.response?.data || { message: e.message };
    }
};

export const getShopProductsForAdmin = async (shopId: any, companyId: any, page: number) => {
    try {
        const res = await $http.get(`shops/company/${companyId}/shop/${shopId}/products/?page=${page}`);
        return res?.data;
    } catch (e: any) {
        throw e?.response?.data || { message: e.message };
    }
};

export const updateProductDetails = (companyId: any, shopId: any, productId: any): MutationFunction<any, any> => {
  return async (productUpdateData: any) => {
    try {
        const res = await $http.patch(`shops/company/${companyId}/shop/${shopId}/products/${productId}/`, productUpdateData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(res)
        return res?.data;
    } catch (e: any) {
        console.log("the error: ", e)
        throw e?.response?.data || { message: e.message };
    }
  };
};

export const deleteProduct = (companyId: any, shopId: any, productId: any) => {
    return async () => {
        try {
            const res = await $http.delete(`shops/company/${companyId}/shop/${shopId}/products/${productId}/`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(res?.data)
            return res?.data;
        } catch (e: any) {
            console.log(e.message)
            throw e?.response?.data || { message: e.message };
        }
    };
};