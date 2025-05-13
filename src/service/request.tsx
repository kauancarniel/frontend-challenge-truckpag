import axios from 'axios';

const api = axios.create({ baseURL: 'https://ghibliapi.vercel.app' })

export const requestData = async () => {
  const { data } = await api.get('/films');
  return data;
}
