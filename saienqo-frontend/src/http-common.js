import axios from 'axios';

const httpCommon = axios.create({
    baseURL: "http://localhost:8080",
    headers: {'Content-Type': 'application/json'}
});

const requestHandler = request => {
    const token = localStorage.getItem('accessToken');
    request.headers.Authorization = 'Bearer ' + token;
    return request;
};

const responseHandler = response => {
    if (response.status === 401) {
        window.location = '/auth/login';
    }

    return response;
};

const errorHandler = error => {
    return Promise.reject(error);
};

httpCommon.interceptors.request.use(
    (request) => requestHandler(request),
    (error) => errorHandler(error)
);

httpCommon.interceptors.response.use(
    (response) => responseHandler(response),
    (error) => errorHandler(error)
);


export default httpCommon;