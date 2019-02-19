import axios from 'axios';
export const IS_JAVA_API = 'IS_JAVA_API';
export const IS_PYTHON_API = 'IS_PYTHON_API';

// export const API_JAVA_URL = 'https://newsjavaapi.azurewebsites.net';
export const API_JAVA_URL = 'http://192.168.43.198:8080';
export const API_PYTHON_URL = 'http://192.168.43.198:8181/python_api';

export const BASE_URL = API_JAVA_URL;
const CancelToken = axios.CancelToken;
export const sourceCancel = CancelToken.source();

export const ApiJavaService = axios.create({
  baseURL: API_JAVA_URL,
  // timeout: 10000,
  cancelToken: sourceCancel.token
});

export const ApiPythonService = axios.create({
  baseURL: API_PYTHON_URL,
  // timeout: 10000,
  cancelToken: sourceCancel.token
});

export const isSuccessRequest = (status) => {
  return (+status && (200 <= +status <= 299)); 
}

export const ArticleApi = {
  getTopArticleByCategoryId: async (category_id = 1, params = { limit: 4, page: 1 }) => {
    try {
      const response = await ApiJavaService.get(`/article/category/${category_id}/top`, { params });
      if(response.data && isSuccessRequest(response.status)) {
        return response.data;
      }
      throw response;
    } catch (error) {
      throw error;
    }
  },
  getNewestListArticle: async (page, limit, userId = null) => {
    try {
      const url = `/article/newest?page=${page}&limit=${limit}`;
      const params = userId ? { userId } : null;
      const response = await ApiJavaService.get(url, { params });
      if(response.data && isSuccessRequest(response.status)) {
        return response.data;
      }
      throw response;
    } catch (error) {
      throw error;
    }
  },
  getTopArticleOrderByTimeDESC: async ({ category_id, limit, userId = null }) => {
    try {
      const url = `/article/category/${category_id}/top`;
      const params = userId ? { userId, limit } : { limit };
      const response = await ApiJavaService.get(url, { params });
      if(response.data && isSuccessRequest(response.status)) {
        return response.data;
      }
      throw error;
    } catch (error) {
      throw error;
    }
  },
  getArticleByCategoryId: async ({ category_id, limit, page, userId = null }) => {
    try {
      const url = `/article/category/${category_id}`;
      const params = userId ? { userId, limit, page } : { limit, page };
      const response = await ApiJavaService.get(url, { params });
      if(response.data && isSuccessRequest(response.status)) {
        return response.data;
      }
      throw response;
    } catch (error) {
      throw error;
    }
  },
  getDetailArticle: async (article_id, userId = null) => {
    try {
      const url = userId ? `/article/${article_id}?userId=${userId}` : `/article/${article_id}`;
      const response = await ApiJavaService.get(url);
      if(response.data && isSuccessRequest(response.status)) {
        return response.data;
      }
      throw response;
    } catch (error) {
      throw error;
    }
  },
  updateViewArticle: async (article_id) => {
    try {
      const url = `/article/updateView/${article_id}`;
      const response = await ApiJavaService.put(url);
      if(response.data && isSuccessRequest(response.status)) {
        return response.data;
      }
      throw response;
    } catch (error) {
      throw error;
    }
  },
  bookmarkArticle: async (article_id, user_id) => {
    try {
      const url = `/article/bookmark/${article_id}/${user_id}`;
      const response = await ApiJavaService.put(url);
      if(response.data && isSuccessRequest(response.status)) {
        return response.data;
      }
      throw response;
    } catch (error) {
      throw error;
    }
  },
  getRelativeArticles: async (article_id, startIndex = null) => {
    try {
      const url = `/recomendArticles/${article_id}`;
      const params = startIndex ? { startIndex, quantity: 17 } : { quantity: 17 };
      const response = await ApiPythonService.get(url, { params });
      if(response.data && isSuccessRequest(response.status)) {
        return response.data;
      }
      throw response;
    } catch (error) {
      throw error;
    }
  },
  getRecommendTopicArticles: async (user_id, { startIndex, limit }) => {
    try {
      const url = `/getRecommentTopicsForUser/${user_id}`;
      const params = { startIndex, limit };
      const response = await ApiPythonService.get(url, { params });
      if(response.data && isSuccessRequest(response.status)) {
        return response.data;
      }
      throw response;
    } catch (error) {
      throw error;
    }
  },
  getRecommendTagsArticles: async (tag, params) => {
    try {
      const url = `/article/getArticleByTag/${tag}`;
      const response = await ApiJavaService.get(url, { params });
      if(response.data && isSuccessRequest(response.status)) {
        return response.data;
      }
      throw response;
    } catch (error) {
      throw error;
    }
  },
  getBookmarkArticles: async (user_id, params = { page: 1, limit: 100 }) => {
    try {
      const url = `/article/bookmark/${user_id}`;
      const response = await ApiJavaService.get(url, { params });
      if(response.data && isSuccessRequest(response.status)) {
        return response.data;
      }
      throw response;
    } catch (error) {
      throw error;
    }
  },
  getHistoryArticles: async (user_id) => {
    try {
      const url = `/user/history/${user_id}`;
      const response = await ApiJavaService.get(url);
      if(response.data && isSuccessRequest(response.status)) {
        return response.data;
      }
      throw response;
    } catch (error) {
      throw error;
    }
  },
  getMostTopView: async (limit = 10) => {
    try {
      const url = `/article/topView?limit=${limit}`;
      const response = await ApiJavaService.get(url);
      if(response.data && isSuccessRequest(response.status)) {
        return response.data;
      }
      throw response;
    } catch (error) {
      throw error;
    }
  },
  likeDislikeArticle: async (type, userId, articleId) => {
    try {
      const url = `user/${type}/${userId}/${articleId}`;
      const response = await ApiJavaService.put(url);
      if(response.data && isSuccessRequest(response.status)) {
        return response.data;
      }
      throw response;
    } catch (error) {
      throw error;
    }
  },
};

export const CategoryApi = {
  getAllCategory: async () => {
    try {
      const url = `/category`;
      const response = await ApiJavaService.get(url);
      if(response.data && isSuccessRequest(response.status)) {
        return response.data;
      }
      throw response;
    } catch (error) {
      throw error;
    }
  },
  getAllCategoryForUserLogin: async (userId) => {
    try {
      const response = await ApiPythonService.get(`/category/${userId}`);
      if(response.data && isSuccessRequest(response.status)){
        return response.data;
      }
      throw response;
    } catch (error) {
      throw error;
    }
  }
};

export const UserApi = {
  login: async (params) => {
    try {
      const response = await ApiJavaService.post('token/login', params);
      if(response.data && isSuccessRequest(response.status)) {
        return response.data;
      }
      throw response;
    } catch (error) {
      throw error.response.data;
    }
  },
  getUserInfo: async (userId) => {
    try {
      const response = await ApiJavaService.post(`/user/${userId}`);
      if(response.data && isSuccessRequest(response.status)) {
        return response.data;
      }
      throw response;
    } catch (error) {
      throw error;
    }
  },
  updateUserInfo: async (userInfo) => {
    try {
      const response = await ApiJavaService.put(`/user`, userInfo);
      if(response.data && isSuccessRequest(response.status)) {
        return response.data;
      }
      throw response;
    } catch (error) {
      throw error;
    }
  },
  updateCategoryForUser: async (userId, categorieIds) => {
    try {
      const response = await ApiJavaService.put(`/user/${userId}`, { categorieIds });
      if(response.data && isSuccessRequest(response.status)) {
        return response.data;
      }
      throw response;
    } catch (error) {
      throw error;
    }
  },
  getFavoriteCategoryForUser: async (userId) => {
    try {
      // const url = `user/listCategory/${userId}`;
      const url = `/category/favorite/${userId}`;
      // const response = await ApiJavaService.get(url);
      const response = await ApiPythonService.get(url);
      if(response.data && isSuccessRequest(response.status)) {
        return response.data;
      }
      throw response;
    } catch (error) {
      throw error;
    }
  },
  
};