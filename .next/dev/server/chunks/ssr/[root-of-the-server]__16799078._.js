module.exports = [
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
"[project]/lib/api/axios.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
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
    }
});
axiosInstance.interceptors.request.use((config)=>{
    const token = ("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : null;
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    return config;
});
axiosInstance.interceptors.response.use((response)=>response, (error)=>{
    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error);
});
const __TURBOPACK__default__export__ = axiosInstance;
}),
"[project]/lib/api/endpoint.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
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
"[project]/lib/api/auth.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getCurrentUser",
    ()=>getCurrentUser,
    "login",
    ()=>login,
    "register",
    ()=>register
]);
/* eslint-disable @typescript-eslint/no-explicit-any */ // Note: Actual backend API calls
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$axios$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api/axios.ts [app-rsc] (ecmascript)"); // info: axios instance with base URL
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$endpoint$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api/endpoint.ts [app-rsc] (ecmascript)");
;
;
const register = async (registerData)=>{
    try {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$axios$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].post(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$endpoint$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["API"].AUTH.REGISTER, registerData);
        return response.data; // response ko body (what backend returns)
    } catch (error) {
        // info: if 4xx/5xx error, axios throws error
        throw new Error(error.response?.data?.message // backend error message
         || error.message // general axios error message
         || "Registration Failed" // fallback message
        );
    }
};
const login = async (loginData)=>{
    try {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$axios$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].post(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$endpoint$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["API"].AUTH.LOGIN, loginData);
        return response.data; // response ko body (what backend returns)
    } catch (error) {
        // info: if 4xx/5xx error, axios throws error
        throw new Error(error.response?.data?.message // backend error message
         || error.message // general axios error message
         || "Login Failed" // fallback message
        );
    }
};
const getCurrentUser = async ()=>{
    try {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$axios$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].get(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$endpoint$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["API"].AUTH.ME);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || error.message || "Failed to fetch user");
    }
};
}),
"[project]/lib/cookie.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* eslint-disable @typescript-eslint/no-explicit-any */ /* __next_internal_action_entry_do_not_use__ [{"003f85425107420cea432a27337a4efabd469964cf":"getUserData","006d79c29b5b07a9730351cf2e5623880291d27356":"clearAuthCookies","00eb8ab877a62d4a4c124fedfef5594c5e6cedf7bf":"getAuthToken","40a4707b3544eb198e2e0c1fc690dfe0895bcbc562":"setUserData","40ac653c3aa2b423c5376d44dfd337fe0f4e00bfb7":"setAuthToken"},"",""] */ __turbopack_context__.s([
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
        value: token
    });
};
const getAuthToken = async ()=>{
    const cookieStore = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cookies"])();
    return cookieStore.get("auth_token")?.value || null;
};
const setUserData = async (userData)=>{
    const cookieStore = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["cookies"])();
    // cookie can only store string values
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
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(setAuthToken, "40ac653c3aa2b423c5376d44dfd337fe0f4e00bfb7", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getAuthToken, "00eb8ab877a62d4a4c124fedfef5594c5e6cedf7bf", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(setUserData, "40a4707b3544eb198e2e0c1fc690dfe0895bcbc562", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getUserData, "003f85425107420cea432a27337a4efabd469964cf", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(clearAuthCookies, "006d79c29b5b07a9730351cf2e5623880291d27356", null);
}),
"[project]/lib/action/auth-action.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* eslint-disable @typescript-eslint/no-explicit-any */ /* __next_internal_action_entry_do_not_use__ [{"40109a65e9e26eadb40c114ea920a026c8012f7cfa":"handleLogin","4099d4f433f1d8d83c99b3d4782d85ea9e8e970f24":"handleRegister"},"",""] */ __turbopack_context__.s([
    "handleLogin",
    ()=>handleLogin,
    "handleRegister",
    ()=>handleRegister
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api/auth.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$cookie$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/cookie.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
;
const handleRegister = async (formData)=>{
    try {
        // send data to backend API
        const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["register"])(formData);
        if (res.success) {
            // optionally, you could also set cookie after register if needed
            // e.g., automatically log in after register
            return {
                success: true,
                data: res.data,
                message: "Registration successful"
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
        const res = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["login"])(formData);
        if (res.success) {
            const token = res.token;
            // store JWT token in cookie
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$cookie$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["setAuthToken"])(token);
            // store user data in cookie
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$cookie$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["setUserData"])(res.data);
            return {
                success: true,
                data: res.data,
                message: "Login successful"
            };
        }
        return {
            success: false,
            message: res.message || "Login failed"
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
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(handleRegister, "4099d4f433f1d8d83c99b3d4782d85ea9e8e970f24", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(handleLogin, "40109a65e9e26eadb40c114ea920a026c8012f7cfa", null);
}),
"[project]/.next-internal/server/app/(auth)/login/page/actions.js { ACTIONS_MODULE0 => \"[project]/lib/action/auth-action.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$action$2f$auth$2d$action$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/action/auth-action.ts [app-rsc] (ecmascript)");
;
}),
"[project]/.next-internal/server/app/(auth)/login/page/actions.js { ACTIONS_MODULE0 => \"[project]/lib/action/auth-action.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "40109a65e9e26eadb40c114ea920a026c8012f7cfa",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$action$2f$auth$2d$action$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["handleLogin"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f28$auth$292f$login$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$lib$2f$action$2f$auth$2d$action$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i('[project]/.next-internal/server/app/(auth)/login/page/actions.js { ACTIONS_MODULE0 => "[project]/lib/action/auth-action.ts [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <locals>');
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$action$2f$auth$2d$action$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/action/auth-action.ts [app-rsc] (ecmascript)");
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__16799078._.js.map