export const ROUTES = {
  LOGIN: "/entrar",
  REGISTER: "/cadastro",

  DASHBOARD: "/painel",
  CATEGORIES: "/painel/categorias",

  PRODUCTS: "/painel/produtos",

  PEDIDOS: {
    LIST: "/pedidos",
    DETAILS: (id: string) => `/pedidos/${id}`,
    RASTREIO: (id: string) => `/pedidos/${id}/rastrear`,
  },
  CHECKOUT: "/finalizar-compra",
};
