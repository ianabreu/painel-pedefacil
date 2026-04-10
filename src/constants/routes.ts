const dashboardLink = "/painel";

export const ROUTES = {
  LOGIN: "/entrar",
  REGISTER: "/cadastro",

  DASHBOARD: dashboardLink,

  PRODUCTS: `${dashboardLink}/produtos`,
  CATEGORIES: `${dashboardLink}/categorias`,
  VARIATIONS: `${dashboardLink}/variacoes`,
  COMPLEMENTS: `${dashboardLink}/complementos`,
};

// PEDIDOS: {
//   LIST: "/pedidos",
//   DETAILS: (id: string) => `/pedidos/${id}`,
//   RASTREIO: (id: string) => `/pedidos/${id}/rastrear`,
// },
// CHECKOUT: "/finalizar-compra",
