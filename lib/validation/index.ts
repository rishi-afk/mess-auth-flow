import xss from "xss";
export const isWebmail = (email: string) => {
    if (typeof email === "undefined") return false;
    const [user, domain] = email.split("@");
    return domain === "nitt.edu" && /\d/.test(user);
};

export const isValidPassword = (password: string) => {
    if (typeof password === "undefined") return false;
    return password.length > 7;
};

export const sanitize = (data: string): string => {
    if (data) {
        const text = data.trim();
        return xss(text);
    }
    return "";
};
