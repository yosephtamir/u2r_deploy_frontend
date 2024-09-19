'use client';
import { MutationFunction } from '@tanstack/react-query';
import axios from 'axios';

// export const MARKETPLACE_HTTP_URL = 'http://localhost:8000/api/v1/';
export const MARKETPLACE_HTTP_URL = 'https://u2r.hightier.tech/api/v1/';

export const token = typeof window !== 'undefined' ? localStorage.getItem("token") : null
// export const token = localStorage.getItem("token") 


const $http = axios.create({
    baseURL: MARKETPLACE_HTTP_URL,
    headers: {
        'Content-Type': 'application/json; charset=UTF-8',
    },
});

console.log(token)

export const fetchLimitedOffers = async () => {
    try {
        const res = await $http.get('/marketplace/products/limited-offer/');
        console.log(res)
        return res?.data;
    } catch (e: any) {
        console.log("the error: ", e)
        throw e?.response?.data || { message: e.message };
    }
};

export const fetchRecommendation = async () => {
    try {
        const res = await $http.get('/marketplace/products/popular/');
        return res?.data;
    } catch (e: any) {
        throw e?.response?.data || { message: e.message };
    }
};

export const fetchRecentlyViewed = async () => {
    try {
        const res = await $http.get('/marketplace/products/recently-viewed/', {
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

export const fetchAllProducts = async () => {
    try {
        const res = await $http.get('/marketplace/products/');
        return res?.data;
    } catch (e: any) {
        throw e?.response?.data || { message: e.message };
    }
};

export const getCategoryNames = async () => {
    try {
        const res = await $http.get('/marketplace/categories/');
        return res?.data;
    } catch (e: any) {
        throw e?.response?.data || { message: e.message };
    }
};

export const getSubCategories = async (category_id: string) => {
    try {
        const res = await $http.get(`marketplace/categories/${category_id}/sub-category/`);
        return res?.data;
    } catch (e: any) {
        throw e?.response?.data || { message: e.message };
    }
};

export const getSubCategoryProducts = async (category_id: any, sub_category_id: any) => {
    try {
        const res = await $http.get(`marketplace/categories/${category_id}/sub-category/${sub_category_id}/products/`);
        return res?.data;
    } catch (e: any) {
        throw e?.response?.data || { message: e.message };
    }
};

export const getCategoryProducts = async (category_id: any) => {
    try {
        const res = await $http.get(`/marketplace/categories/${category_id}/products`);
        return res?.data;
    } catch (e: any) {
        throw e?.response?.data || { message: e.message };
    }
};

export const getProductDetail = async (productId: string) => {
    try {
        const res = await $http.get(`marketplace/products/${productId}/product-detail/`, {
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

export const fetchSimilarProducts = async (productId: string) => {
    try {
        const res = await $http.get(`marketplace/products/${productId}/similar-products/`);
        console.log(res?.data)
        return res?.data;
    } catch (e: any) {
        console.log(e.message)
        throw e?.response?.data || { message: e.message };
    }
};

export const searchProducts = async (queryParam: any, currentPage: number) => {
    try {
        let endpoint = `/marketplace/products/search/?page=${currentPage}`;

        // Add search query if it's not empty
        if (queryParam && queryParam !== "") {
            endpoint += `&searchQuery=${encodeURIComponent(queryParam)}`;
        }
        const res = await $http.get(endpoint);
        return res?.data;
    } catch (e: any) {
        throw e?.response?.data || { message: e.message };
    }
};

export const getShopDetail = async (shopId: any) => {
    try {
        const res = await $http.get(`/marketplace/shops/${shopId}/`);
        return res?.data;
    } catch (e: any) {
        throw e?.response?.data || { message: e.message };
    }
};

export const getUserCart = async () => {
    try {
        const res = await $http.get(`marketplace/me/cart/?page=1/`,{
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

export const updateDeliveryAddressDetails = () => {
  return async (DeliveryAddressUpdateData: any) => {
    try {
        const res = await $http.patch(`/marketplace/me/cart/`, DeliveryAddressUpdateData, {
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
};

export const getCartItems = async () => {
    try {
        const res = await $http.get(`marketplace/me/cart/items/`,{
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

export const removeCartItem = (productId: string): MutationFunction<string> => {
    return async () => {
        try {
            const res = await $http.delete(`marketplace/me/cart/remove-item/${productId}/`, {
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

export const clearUserCart = () => {
    return async () => {
        try {
            const res = await $http.delete(`marketplace/me/cart/dump/`, {
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

export const addItemToCart = (productId: string): MutationFunction<string> => {
    return async (data: any) => {
        try {
            const res = await $http.post(`marketplace/me/cart/add-item/${productId}/`, data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(res?.data, token)
            return res?.data;
        } catch (e: any) {
            console.log(e.message, token)
            throw e?.response?.data || { message: e.message };
        }
    };
};

export const updateQuantity = (productId: string): MutationFunction<string> => {
    return async (data: any) => {
        try {
            if (!token) {
                throw new Error('Authorization token is missing');
            }
            const res = await $http.patch(`marketplace/me/cart/update-quantity/${productId}/`, data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }); 
            return res?.data;
        } catch (e: any) {
            console.log(e.message)
            throw e?.response?.data || { message: e.message };
        }
    };
};

export const getUserWishList = async () => {
    try {
        const res = await $http.get(`marketplace/me/wish-list/?page=1/`,{
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

export const getWishListItems = async () => {
    try {
        const res = await $http.get(`marketplace/me/wish-list/items/`,{
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

export const removeWishListItem = (productId: string): MutationFunction<string> => {
    return async () => {
        try {
            const res = await $http.delete(`marketplace/me/wish-list/remove-item/${productId}/`, {
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

export const clearUserWishList = () => {
    return async () => {
        try {
            const res = await $http.delete(`marketplace/me/wish-list/dump/`, {
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

export const addItemToWishList = (productId: string): MutationFunction<string> => {
    return async (data: any) => {
        try {
            const res = await $http.post(`marketplace/me/wish-list/add-item/${productId}/`, data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(res?.data, token)
            return res?.data;
        } catch (e: any) {
            console.log(e.message, token)
            throw e?.response?.data || { message: e.message };
        }
    };
};

export const getUserOrder = async () => {
    try {
        const res = await $http.get(`marketplace/me/order/?page=1/`,{
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

export const getOrderItems = async () => {
    try {
        const res = await $http.get(`marketplace/me/order/items/`,{
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