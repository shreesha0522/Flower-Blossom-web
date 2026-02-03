module.exports = [
"[project]/lib/action/profile-action.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"407b9cea9b3bf907ce6408e4493ac40f1cf87ed0cc":"getCurrentUserProfile","60788c4db025b8cea59f601f7d805824ee7c1d1343":"handleUpdateProfile"},"",""] */ __turbopack_context__.s([
    "getCurrentUserProfile",
    ()=>getCurrentUserProfile,
    "handleUpdateProfile",
    ()=>handleUpdateProfile
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
async function handleUpdateProfile(userId, formData) {
    try {
        // Get the backend API URL from environment variable
        const apiUrl = ("TURBOPACK compile-time value", "http://localhost:8000") || "http://localhost:5000";
        // Make PUT request to backend with FormData
        const response = await fetch(`${apiUrl}/api/auth/${userId}`, {
            method: "PUT",
            body: formData,
            credentials: "include"
        });
        const data = await response.json();
        if (!response.ok) {
            return {
                success: false,
                message: data.message || "Failed to update profile"
            };
        }
        return {
            success: true,
            message: data.message || "Profile updated successfully",
            data: data.data || data.user
        };
    } catch (error) {
        console.error("Profile update error:", error);
        return {
            success: false,
            message: error.message || "An error occurred while updating profile"
        };
    }
}
async function getCurrentUserProfile(userId) {
    try {
        const apiUrl = ("TURBOPACK compile-time value", "http://localhost:8000") || "http://localhost:5000";
        const response = await fetch(`${apiUrl}/api/auth/${userId}`, {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            cache: "no-store"
        });
        const data = await response.json();
        if (!response.ok) {
            return {
                success: false,
                message: data.message || "Failed to fetch profile"
            };
        }
        return {
            success: true,
            data: data.data || data.user
        };
    } catch (error) {
        console.error("Fetch profile error:", error);
        return {
            success: false,
            message: error.message || "An error occurred while fetching profile"
        };
    }
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    handleUpdateProfile,
    getCurrentUserProfile
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(handleUpdateProfile, "60788c4db025b8cea59f601f7d805824ee7c1d1343", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getCurrentUserProfile, "407b9cea9b3bf907ce6408e4493ac40f1cf87ed0cc", null);
}),
"[project]/.next-internal/server/app/user/profile/client/page/actions.js { ACTIONS_MODULE0 => \"[project]/lib/action/profile-action.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$action$2f$profile$2d$action$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/action/profile-action.ts [app-rsc] (ecmascript)");
;
}),
"[project]/.next-internal/server/app/user/profile/client/page/actions.js { ACTIONS_MODULE0 => \"[project]/lib/action/profile-action.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "60788c4db025b8cea59f601f7d805824ee7c1d1343",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$action$2f$profile$2d$action$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["handleUpdateProfile"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f$user$2f$profile$2f$client$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$lib$2f$action$2f$profile$2d$action$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i('[project]/.next-internal/server/app/user/profile/client/page/actions.js { ACTIONS_MODULE0 => "[project]/lib/action/profile-action.ts [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <locals>');
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$action$2f$profile$2d$action$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/action/profile-action.ts [app-rsc] (ecmascript)");
}),
"[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/* eslint-disable import/no-extraneous-dependencies */ Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "registerServerReference", {
    enumerable: true,
    get: function() {
        return _server.registerServerReference;
    }
});
const _server = __turbopack_context__.r("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)"); //# sourceMappingURL=server-reference.js.map
}),
"[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This function ensures that all the exported values are valid server actions,
// during the runtime. By definition all actions are required to be async
// functions, but here we can only check that they are functions.
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ensureServerEntryExports", {
    enumerable: true,
    get: function() {
        return ensureServerEntryExports;
    }
});
function ensureServerEntryExports(actions) {
    for(let i = 0; i < actions.length; i++){
        const action = actions[i];
        if (typeof action !== 'function') {
            throw Object.defineProperty(new Error(`A "use server" file can only export async functions, found ${typeof action}.\nRead more: https://nextjs.org/docs/messages/invalid-use-server-value`), "__NEXT_ERROR_CODE", {
                value: "E352",
                enumerable: false,
                configurable: true
            });
        }
    }
} //# sourceMappingURL=action-validate.js.map
}),
];

//# sourceMappingURL=_2717b373._.js.map