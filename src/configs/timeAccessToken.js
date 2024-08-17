export const saveToken = (accessToken, name, role) => {
    const decodeToken = JSON.parse(atob(accessToken.split(".")[1]));
    const expirateTime = decodeToken.exp * 1000;
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("expirateTime", expirateTime);
    localStorage.setItem("name", name);
    localStorage.setItem("role", role);
};
export const isTokenExpired = () => {
    const accessToken = localStorage.getItem("accessToken");
    const expirateTime = localStorage.getItem("expirateTime");
    if (!accessToken || !expirateTime) {
        return true;
    }
    const currentTime = new Date().getTime();
    if(currentTime > expirateTime) {
        return true;
    }
    return false;
};
export const removeToken = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("expirateTime");
    localStorage.removeItem("name");
    localStorage.removeItem("role");
};