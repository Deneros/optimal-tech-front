import { BACKEND_URL } from "../config";

const fetchApi = async (endpoint, method = 'GET', body = null, token = null) => {
  const headers = {
    'Content-Type': 'application/json',
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
      let errorMessage = `Error: ${response.statusText}`;
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorMessage;
      } catch (e) {
        console.error('Error al intentar analizar el cuerpo de la respuesta:', e);
      }
      throw new Error(errorMessage);
    }

    if (response.status === 204 || response.status === 205) {
      return null; 
    }

    const contentType = response.headers.get('Content-Type');
    if (contentType && contentType.includes('application/json')) {
      return await response.json();
    } else {
      return await response.text();
    }
  } catch (error) {
    console.error('Error en la solicitud:', error);
    throw error;
  }
};

export const get = (endpoint, token = null) => fetchApi(endpoint, 'GET', null, token);
export const post = (endpoint, body, token = null) => fetchApi(endpoint, 'POST', body, token);
export const put = (endpoint, body, token = null) => fetchApi(endpoint, 'PUT', body, token);
export const remove = (endpoint, token = null) => fetchApi(endpoint, 'DELETE', null, token);
