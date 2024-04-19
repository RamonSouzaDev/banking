import axios from 'axios';
import router from './router'; 

const config = axios.create({
  baseURL: 'http://localhost:8000/',
});
config.interceptors.response.use(
  response => {
    console.log("Resposta bem-sucedida");
    return response;
  }, 
  error => {
    console.log("Erro interceptado");
    if (error.response && error.response.status === 401) {
      console.log("Redirecionando para autenticação");
      router.push('/auth');
    }
    return Promise.reject(error);
  }
);

export default config;
