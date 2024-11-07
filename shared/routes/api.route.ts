export const apiRoutes = {
  login: "/auth/user",
  products: {
    productUnits: "/unit?order=ASC&page=1&take=50",
    productTypes: "/productType?order=ASC&page=1&take=50",
    addProduct: "/product",
    getProducts: (page: number = 1, take: number = 50) => `/product?order=DESC&page=${page}&take=${take}`
  }
};
