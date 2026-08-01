const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:3001';

export const api = {
  get: async (url: string, token?: string) => {
    const res = await fetch(`${API_BASE}${url}`, {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.msg || 'Request failed');
    return json;
  },
  post: async (url: string, body: any, token?: string) => {
    const res = await fetch(`${API_BASE}${url}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: JSON.stringify(body),
    });
    const json = await res.json();
    if (!res.ok) throw new Error(json.msg || 'Request failed');
    return json;
  },
};