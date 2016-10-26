const defaultOpts = {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  },
  body: null,
};

function remote(endpoint, options = defaultOpts) {
  /* global __DEV__, fetch */
  return fetch(endpoint, {
    ...options,
    headers: {
      ...defaultOpts.headers,
      ...options.headers,
    },
    body: options.body ? JSON.stringify(options.body) : null,
  }).then(r => r.json().then((json) => {
    if (__DEV__) {
      console.info('=>', options.method || defaultOpts.method, endpoint, options);
      console.info('<=', json);
    }

    if (!r.ok) {
      throw json;
    }

    return json;
  }));
}

export const get = (endpoint, data) => remote(endpoint, data);
export const post = (endpoint, data) => remote(endpoint, {
  ...data,
  method: 'POST',
});
export const put = (endpoint, data) => remote(endpoint, {
  ...data,
  method: 'PUT',
});
export const del = (endpoint, data) => remote(endpoint, {
  ...data,
  method: 'DELETE',
});
export const patch = (endpoint, data) => remote(endpoint, {
  ...data,
  method: 'PATCH',
});
