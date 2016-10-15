const defaultOpts = {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  },
  body: null,
};

function remote(endpoint, options = defaultOpts) {
  return fetch(endpoint, {
    ...options,
    headers: {
      ...defaultOpts.headers,
      ...options.headers,
    },
    body: options.body ? JSON.stringify(options.body) : null,
  }).then(r => r.json()); /* global fetch */
}

export const get = (endpoint, data) => remote(endpoint, data);
export const post = (endpoint, data) => remote(endpoint, {
  ...data,
  method: 'POST',
});
