export const API = {
  AUTH: {
    REGISTER:        "/api/auth/register",
    LOGIN:           "/api/auth/login",
    ME:              "/api/auth/me",
    FORGOT_PASSWORD: "/api/auth/forgot-password",
    RESET_PASSWORD:  "/api/auth/reset-password",
    UPDATE_USER:     "/api/auth",
  },
  ADMIN: {
    USERS:           "/api/admin/users",
    USER_BY_ID:      (id: string) => `/api/admin/users/${id}`,
  },
  PROFILE: {
    UPDATE:          "/api/profile/update",
    GET:             (userId: string) => `/api/profile/${userId}`,
  },
  UPLOAD: {
    PROFILE_IMAGE:         "/api/upload/profile-image",
    GET_PROFILE_IMAGE:     (userId: string) => `/api/upload/profile-image/${userId}`,
    DELETE_PROFILE_IMAGE:  (userId: string) => `/api/upload/profile-image/${userId}`,
  },
  PRODUCTS: {
    GET_ALL:         "/api/products",
    GET_BY_ID:       (id: string) => `/api/products/${id}`,
    CREATE:          "/api/products",
    UPDATE:          (id: string) => `/api/products/${id}`,
    DELETE:          (id: string) => `/api/products/${id}`,
  },
};