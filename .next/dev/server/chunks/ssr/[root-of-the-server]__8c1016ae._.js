module.exports = [
"[project]/src/lib/cookie.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use server";
// import { cookies } from "next/headers";
// export const setAuthToken = async (token: string) => {
//     const cookieStore = await cookies();
//     cookieStore.set({name: "auth_token", value: token});
// }
// export const getAuthToken = async () => {
//     const cookieStore = await cookies();
//     return cookieStore.get("auth_token")?.value || null;
// }
// export const setUserData = async (userData: any ) => {
//     const cookieStore = await cookies();
//     // cookie can only store string values
//     cookieStore.set({name: "user_data", value: JSON.stringify(userData)});
// }
// export const getUserData = async () => {
//     const cookieStore = await cookies();
//     const data = cookieStore.get("user_data")?.value || null;
//     return data ? JSON.parse(data) : null;
// }
// export const clearAuthCookies = async () => {
//     const cookieStore = await cookies();
//     cookieStore.delete("auth_token");
//     cookieStore.delete("user_data");
// }
/* eslint-disable @typescript-eslint/no-explicit-any */ /* __next_internal_action_entry_do_not_use__ [{"001fc3448a68559b1e82c7e4e07787c7dca6929425":"clearAuthCookies","009c5c3af8341fdabc5ee4cb283a21f9e57f174d99":"getUserData","00dbd36ea2cabccd170b18008c15ac8572898e40e2":"getAuthToken","402d44d9e97e00efbbff657c34958fd5db4fa6694f":"setAuthToken","40f23794833d85f1301206118fa0ef908b8f0d084d":"setUserData"},"",""] */ __turbopack_context__.s([
    "clearAuthCookies",
    ()=>clearAuthCookies,
    "getAuthToken",
    ()=>getAuthToken,
    "getUserData",
    ()=>getUserData,
    "setAuthToken",
    ()=>setAuthToken,
    "setUserData",
    ()=>setUserData
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/headers.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
const setAuthToken = async (token)=>{
    const cookieStore = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cookies"])();
    cookieStore.set({
        name: "auth_token",
        value: token,
        httpOnly: false,
        path: "/",
        sameSite: "lax"
    });
};
const getAuthToken = async ()=>{
    const cookieStore = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cookies"])();
    return cookieStore.get("auth_token")?.value || null;
};
const setUserData = async (userData)=>{
    const cookieStore = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cookies"])();
    cookieStore.set({
        name: "user_data",
        value: JSON.stringify(userData)
    });
};
const getUserData = async ()=>{
    const cookieStore = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cookies"])();
    const data = cookieStore.get("user_data")?.value || null;
    return data ? JSON.parse(data) : null;
};
const clearAuthCookies = async ()=>{
    const cookieStore = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cookies"])();
    cookieStore.delete("auth_token");
    cookieStore.delete("user_data");
};
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    setAuthToken,
    getAuthToken,
    setUserData,
    getUserData,
    clearAuthCookies
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(setAuthToken, "402d44d9e97e00efbbff657c34958fd5db4fa6694f", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getAuthToken, "00dbd36ea2cabccd170b18008c15ac8572898e40e2", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(setUserData, "40f23794833d85f1301206118fa0ef908b8f0d084d", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getUserData, "009c5c3af8341fdabc5ee4cb283a21f9e57f174d99", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(clearAuthCookies, "001fc3448a68559b1e82c7e4e07787c7dca6929425", null);
}),
"[externals]/stream [external] (stream, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("stream", () => require("stream"));

module.exports = mod;
}),
"[externals]/http [external] (http, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("http", () => require("http"));

module.exports = mod;
}),
"[externals]/https [external] (https, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("https", () => require("https"));

module.exports = mod;
}),
"[externals]/url [external] (url, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("url", () => require("url"));

module.exports = mod;
}),
"[externals]/fs [external] (fs, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("fs", () => require("fs"));

module.exports = mod;
}),
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[externals]/http2 [external] (http2, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("http2", () => require("http2"));

module.exports = mod;
}),
"[externals]/assert [external] (assert, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("assert", () => require("assert"));

module.exports = mod;
}),
"[externals]/tty [external] (tty, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("tty", () => require("tty"));

module.exports = mod;
}),
"[externals]/os [external] (os, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("os", () => require("os"));

module.exports = mod;
}),
"[externals]/zlib [external] (zlib, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("zlib", () => require("zlib"));

module.exports = mod;
}),
"[externals]/events [external] (events, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("events", () => require("events"));

module.exports = mod;
}),
"[project]/src/lib/api/axios.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/axios/lib/axios.js [app-rsc] (ecmascript)");
;
const BASE_URL = ("TURBOPACK compile-time value", "http://localhost:8000") || "http://localhost:5000";
const axiosInstance = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json"
    },
    withCredentials: true
});
// Helper function to get token from cookie
const getTokenFromCookie = ()=>{
    if ("TURBOPACK compile-time truthy", 1) return null;
    //TURBOPACK unreachable
    ;
    const cookies = undefined;
    const cookie = undefined;
};
axiosInstance.interceptors.request.use((config)=>{
    const token = getTokenFromCookie();
    if (token) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});
axiosInstance.interceptors.response.use((response)=>response, (error)=>{
    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error);
});
const __TURBOPACK__default__export__ = axiosInstance;
}),
"[project]/src/lib/api/endpoint.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "API",
    ()=>API
]);
const API = {
    AUTH: {
        REGISTER: "/api/auth/register",
        LOGIN: "/api/auth/login",
        ME: "/api/auth/me"
    }
};
}),
"[project]/src/lib/api/auth.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getCurrentUser",
    ()=>getCurrentUser,
    "login",
    ()=>login,
    "register",
    ()=>register
]);
/* eslint-disable @typescript-eslint/no-explicit-any */ var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cookie$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/cookie.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$axios$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/api/axios.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$endpoint$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/api/endpoint.ts [app-rsc] (ecmascript)");
;
;
;
const register = async (registerData)=>{
    try {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$axios$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].post(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$endpoint$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["API"].AUTH.REGISTER, registerData, {
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        throw new Error(error?.response?.data?.message || error?.message || "Registration Failed");
    }
};
const login = async (loginData)=>{
    try {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$axios$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].post(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$endpoint$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["API"].AUTH.LOGIN, loginData, {
            withCredentials: true
        });
        // ✅ Save token + user in cookies
        const token = response.data?.data?.token;
        const user = response.data?.data;
        if (token) {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cookie$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["setAuthToken"])(token);
        }
        if (user) {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cookie$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["setUserData"])(user);
        }
        return response.data;
    } catch (error) {
        throw new Error(error?.response?.data?.message || error?.message || "Login Failed");
    }
};
const getCurrentUser = async ()=>{
    try {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$axios$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].get(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$endpoint$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["API"].AUTH.ME, {
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        throw new Error(error?.response?.data?.message || error?.message || "Failed to fetch user");
    }
};
}),
"[project]/src/lib/action/auth-action.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* eslint-disable @typescript-eslint/no-explicit-any */ /* __next_internal_action_entry_do_not_use__ [{"40124750b708925b07bf03f2875b290ce435e2635a":"handleRegister","40e5fee560dba4750a1ad45bd35ad5e7118bbd0487":"handleLogin"},"",""] */ __turbopack_context__.s([
    "handleLogin",
    ()=>handleLogin,
    "handleRegister",
    ()=>handleRegister
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/api/auth.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cookie$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/cookie.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
;
const handleRegister = async (formData)=>{
    try {
        const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["register"])(formData);
        if (res.success) {
            return {
                success: true,
                data: res.data,
                message: res.message || "Registration successful"
            };
        }
        return {
            success: false,
            message: res.message || "Registration failed"
        };
    } catch (error) {
        console.error("Register error:", error);
        return {
            success: false,
            message: error.message || "Registration failed"
        };
    }
};
const handleLogin = async (formData)=>{
    try {
        const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["login"])(formData);
        console.log("Backend login response:", res);
        if (!res.success) {
            return {
                success: false,
                message: res.message || "Login failed"
            };
        }
        // ✅ token is in res.token (your backend response)
        const token = res.token;
        if (!token) {
            return {
                success: false,
                message: "Token missing from backend response"
            };
        }
        // ✅ Save token + user in cookies
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cookie$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["setAuthToken"])(token);
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cookie$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["setUserData"])(res.data);
        return {
            success: true,
            data: res.data,
            message: res.message || "Login successful",
            user: {
                id: res.data?._id,
                email: res.data?.email,
                name: res.data?.username || res.data?.name,
                role: res.data?.role || "user"
            }
        };
    } catch (error) {
        console.error("Login error:", error);
        return {
            success: false,
            message: error.message || "Login failed"
        };
    }
};
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    handleRegister,
    handleLogin
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(handleRegister, "40124750b708925b07bf03f2875b290ce435e2635a", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(handleLogin, "40e5fee560dba4750a1ad45bd35ad5e7118bbd0487", null);
}),
"[project]/.next-internal/server/app/(auth)/register/page/actions.js { ACTIONS_MODULE0 => \"[project]/src/lib/action/auth-action.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$action$2f$auth$2d$action$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/action/auth-action.ts [app-rsc] (ecmascript)");
;
}),
"[project]/.next-internal/server/app/(auth)/register/page/actions.js { ACTIONS_MODULE0 => \"[project]/src/lib/action/auth-action.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "40124750b708925b07bf03f2875b290ce435e2635a",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$action$2f$auth$2d$action$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["handleRegister"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f28$auth$292f$register$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$src$2f$lib$2f$action$2f$auth$2d$action$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i('[project]/.next-internal/server/app/(auth)/register/page/actions.js { ACTIONS_MODULE0 => "[project]/src/lib/action/auth-action.ts [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <locals>');
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$action$2f$auth$2d$action$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/action/auth-action.ts [app-rsc] (ecmascript)");
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__8c1016ae._.js.map