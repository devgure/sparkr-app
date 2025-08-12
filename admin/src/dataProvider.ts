// admin/src/dataProvider.ts
import { fetchUtils, DataProvider } from 'react-admin';
import { apiUrl } from './config';

const httpClient = (url: string, options: any = {}) => {
  if (!options.headers) options.headers = new Headers({ Accept: 'application/json' });
  const token = localStorage.getItem('admin_token');
  options.headers.set('Authorization', `Bearer ${token}`);
  return fetchUtils.fetchJson(url, options);
};

export const dataProvider: DataProvider = {
  getList: (resource, params) => httpClient(`${apiUrl}/${resource}`).then(({ json }) => ({ data: json, total: json.length })),
  getOne: (resource, { id }) => httpClient(`${apiUrl}/${resource}/${id}`).then(({ json }) => ({ data: json })),
  update: (resource, { id, data }) => httpClient(`${apiUrl}/${resource}/${id}`, { method: 'PUT', body: JSON.stringify(data) }).then(({ json }) => ({ data: json })),
  delete: (resource, { id }) => httpClient(`${apiUrl}/${resource}/${id}`, { method: 'DELETE' }).then(({ json }) => ({ data: json })),
  create: (resource, { data }) => httpClient(`${apiUrl}/${resource}`, { method: 'POST', body: JSON.stringify(data) }).then(({ json }) => ({ data: json })),
  // other methods...
};