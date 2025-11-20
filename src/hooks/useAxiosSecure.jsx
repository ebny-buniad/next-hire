import axios from 'axios';

const axiosSecure = axios.create({
    //https://next-hire-lac-beta.vercel.app
    baseURL: 'http://localhost:3000'
})

const useAxiosSecure = () => {
    return axiosSecure;
};

export default useAxiosSecure;