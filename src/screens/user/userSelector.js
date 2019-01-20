export const userSelector = state => state.user.user;
export const isLoginSelector = state => state.user.isLogin;
export const loginStateSelector = state => state.user.loginState;
export const userFavoriteCategoriesSelector = state => state.user.favorite_categories;
export const isFetchedFavoriteCategoriesSelector = state => state.user.isFetchedFavoriteCategories;
export const isUpdatingFavoriteCategoriesSelector = state => state.user.isUpdattingFavoriteCategories;
export const bookmarkArticlesSelector = state => state.user.bookmarkArticles;
export const historyArticlesSelector = state => state.user.historyArticles;