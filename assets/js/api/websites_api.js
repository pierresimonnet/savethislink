function fetchJson(url, options) {
  return fetch(
    url,
    Object.assign(
      {
        credentials: "same-origin",
      },
      options
    )
  ).then((response) => {
    return response.json();
  });
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
    headers: {
      "Content-Type": "application/json",
    },
  });
}
