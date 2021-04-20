function fetchJson(url, options) {
  let headers = { "Content-Type": "application/json" };
  if (options && options.headers) {
    headers = { ...options.headers, ...headers };
    delete options.headers;
  }

  return fetch(
    url,
    Object.assign(
      {
        credentials: "same-origin",
        headers: headers,
      },
      options
    )
  )
    .then(checkStatus)
    .then((response) => {
      return response.text().then((text) => (text ? JSON.parse(text) : ""));
    });
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 400) {
    return response;
  }
  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

export function getWebsites() {
  return fetchJson("/api/websites").then((data) => data["hydra:member"]);
}

export function deleteWebsite(id) {
  return fetchJson(`/api/websites/${id}`, {
    method: "DELETE",
  });
}

export function createWebsite(website) {
  return fetchJson("/api/websites", {
    method: "POST",
    body: JSON.stringify(website),
  });
}
