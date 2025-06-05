import axios from "axios";


const apiIntance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
        'Accept': 'application/json',
    },
});

apiIntance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

apiIntance.interceptors.response.use(
    (response) => response.data,
    (error) => {
        if (import.meta.env.VITE_NODE_ENV !== 'production') {
            console.log(`[DEV] Axios error: `, {
                config: error.config || 'No config',
                response: error.response || 'No response',
                message: error.message || 'No message',
                stack: error.stack || 'No stack trace'
            });
        }

        const errorResponse = {
            status: error.response?.status || 500,
            message: '',
            data: error.response?.data || error.message
        };

        if (error.code === 'ECONNABORTED') {
            errorResponse.message = 'Request timed out. Please try again later.';
        }

        switch (errorResponse.status) {
            case 400:
                errorResponse.message = 'Bad request';
                break;
            case 401:
                errorResponse.message = 'Unauthorized - Please login again';
                localStorage.removeItem('token');
                break;
            case 403:
                errorResponse.message = 'Forbidden - You lack necessary permissions';
                break;
            case 404:
                errorResponse.message = 'Resource not found';
                break;
            case 500:
                errorResponse.message = 'Server error - Please try again later';
                break;
            default:
                errorResponse.message = error.message || 'An unexpected error occurred';
        }

        return Promise.reject(errorResponse);
    }
);

export { apiIntance };
