async function request(path, options = {}) {
  const res = await fetch(`/api${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
    body: options.body ? JSON.stringify(options.body) : undefined
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || 'Something went wrong');
  return data;
}

export const api = {
  products: (params = {}) => request('/products?' + new URLSearchParams(params)),
  product: (id) => request(`/products/${id}`),
  categories: () => request('/categories'),
  subscribe: (email) => request('/newsletter', { method: 'POST', body: { email } }),
  contact: (body) => request('/contact', { method: 'POST', body }),
  order: (body) => request('/orders', { method: 'POST', body })
};

export const rupees = (n) => '₹' + Number(n).toLocaleString('en-IN');
