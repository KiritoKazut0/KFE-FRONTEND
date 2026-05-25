
export type UserRole = 'MANAGER' | 'CASHIER' | 'ADMIN';


export const ROUTES_PATH = {
  signin: "/signin",
  signup: "/signup",
  dashboard: "/dashboard",
  orders: "/dashboard/orders",
  products: "/dashboard/products",
  users: "/dashboard/users",
  post: "/post"
}

export const ROLE_ROUTES = {
  ADMIN: {
    allowed: [ROUTES_PATH.dashboard, ROUTES_PATH.post],
    forbidden: [],
  },
  MANAGER: {
    allowed: [ROUTES_PATH.dashboard, ROUTES_PATH.post],
    forbidden: [
      ROUTES_PATH.users,
      ROUTES_PATH.products,
    ],
  },
  CASHIER: {
    allowed: [ROUTES_PATH.post],
    forbidden: [],
  }
};

export const PUBLIC_ROUTES = [ROUTES_PATH.signin, ROUTES_PATH.signup];