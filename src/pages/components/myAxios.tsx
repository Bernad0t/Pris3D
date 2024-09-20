import axios from 'axios';

export const instance = axios.create();

instance.interceptors.response.use(
(response) => response,
async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 410 && !originalRequest._retry) {
        originalRequest._retry = true;
        const refreshToken = localStorage.getItem("refresh_token")

        return axios.get<string>(`http://127.0.0.1:8000/accaunt/getAccessToken`, {params: {"refresh_token" : refreshToken}})
        .then((response) => {
            localStorage.setItem("token", response.data)
            console.log("token")
            return axios(originalRequest)
        })
    }

    return Promise.reject(error);
}
);