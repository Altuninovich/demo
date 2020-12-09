import * as axios from "axios";

const instance = axios.create({
    withCredentials: true,
    headers: {
        "API-KEY": "8e805153-fe66-4ffa-8c69-45f5efe14a41",
    },
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
});

export const authAPI = {
    authenticationGet() {
        return instance.get('auth/me').then(response => response.data);
    },
    authenticationDelite() {
        return instance.delete('auth/login').then(response => response.resultCode);
    },
    authenticationPost(email, password, rememberMe = false) {
        return instance.post('auth/login/', {email, password, rememberMe}).then(response => response.data);
    },
};

export const usersAPI = {
    getUsers(numPage = 1, maxNumberUsers = 10) { //maxNumberUsers нигде не вводится как аргумент
        return instance.get(`users?page=${numPage}&count=${maxNumberUsers}`).then(response => response.data);
    },
};

export const followAPI = {
    subscribe(userId) {
        return instance.post(`follow/${userId}`).then(response => response.data.resultCode);
    },
    unsubscribe(userId) {
        return instance.delete(`follow/${userId}`).then(response => response.data.resultCode);
    },
};

export const profileAPI = {
    getProfile(userId) {
        return instance.get(`profile/${userId}`).then(response => response.data);
    },
    getProfileStatus(userId) {
        return instance.get(`profile/status/${userId}`).then(response => response.data);
    },
    updateStatus(status) {
        return instance.put('profile/status', { status: status, });
    },
    savePhoto(photoFile) {
        const formData = new FormData();
        formData.append("image", photoFile);
        return instance.put('profile/photo', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    },
    saveProfile(profile) {
        return instance.put(`profile`, profile );
    }
};

export const securityAPI = {
    getCaptchaUrl() {
        return instance.get('/security/get-captcha-url');
    }
}