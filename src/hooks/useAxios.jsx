import axios from 'axios';

//http://localhost:3000
// https://next-hire-lac-beta.vercel.app
const axiosInstance = axios.create({
    baseURL: 'https://next-hire-lac-beta.vercel.app'
})

const useAxios = () => {
    return axiosInstance
};

export default useAxios;