import { BACKEND_URL } from "../config";

const fetchApi = async (endpoint, method = 'GET', body = null, token = null) => {
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {})
  };

  const config = {
    method,
    headers,
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(`${BACKEND_URL}${endpoint}`, config);
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error en la solicitud:', error);
    throw error;
  }
};

export const get = (endpoint, token = null) => fetchApi(endpoint, 'GET', null, token);
export const post = (endpoint, body, token = null) => fetchApi(endpoint, 'POST', body, token);
export const put = (endpoint, body, token = null) => fetchApi(endpoint, 'PUT', body, token);
export const remove = (endpoint, token = null) => fetchApi(endpoint, 'DELETE', null, token);
