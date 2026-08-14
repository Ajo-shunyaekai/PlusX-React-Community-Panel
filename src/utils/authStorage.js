export const saveUserDetails = (details = {}) => {
    const normalized = {
        user_id      : details.user_id ?? details.id ?? null,
        manager_id   : details.manager_id ?? null,
        community_id : details.community_id ?? null,
        name         : details.name ?? details.manager_name ?? "",
        email        : details.email ?? details.manager_email ?? "",
        phone        : details.phone ?? details.manager_contact ?? "",
        image        : details.image ?? "",
        access_token : details.access_token ?? details.Token ?? "",
        base_url     : details.base_url ?? "",
    };

    const serialized = JSON.stringify(normalized);
    localStorage.setItem("userDetails", serialized);
    sessionStorage.setItem("userDetails", serialized);

    return normalized;
};

export const getUserDetails = () => {
    try {
        const raw =
            localStorage.getItem("userDetails") ||
            sessionStorage.getItem("userDetails");

        return raw ? JSON.parse(raw) : {};
    } catch {
        return {};
    }
};

export const clearUserDetails = () => {
    localStorage.removeItem("userDetails");
    sessionStorage.removeItem("userDetails");
};
