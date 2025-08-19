import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";

const axiosSecure = axios.create({
  baseURL: "https://assignment-12-sever.vercel.app",
  withCredentials: true,
});

const useAxiosSecure = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const requestInterceptor = axiosSecure.interceptors.request.use(
      async (config) => {
        const currentUser = getAuth().currentUser;
        if (currentUser) {
          const token = await currentUser.getIdToken(); // Don't force refresh
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseInterceptor = axiosSecure.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response?.status === 401 || error.response?.status === 403) {
          navigate("/login");
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosSecure.interceptors.request.eject(requestInterceptor);
      axiosSecure.interceptors.response.eject(responseInterceptor);
    };
  }, [navigate]);

  return axiosSecure;
};

export default useAxiosSecure;
