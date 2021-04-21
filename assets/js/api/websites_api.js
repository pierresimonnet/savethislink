import { useCallback, useState } from "react";

async function fetchJson(url, method = "GET", data = null) {
  const params = {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "same-origin",
  };

  if (data) {
    params.body = JSON.stringify(data);
  }

  return fetch(url, params)
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

export function useFetch(url) {
  const [items, setItems] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [count, setCount] = useState(0);
  const [next, setNext] = useState(null);

  const load = useCallback(
    async (more = false) => {
      try {
        const response = await fetchJson(more ? next : url);
        setItems((items) => [...items, ...response["hydra:member"]]);
        setCount(response["hydra:totalItems"]);
        if (response["hydra:view"] && response["hydra:view"]["hydra:next"]) {
          setNext(response["hydra:view"]["hydra:next"]);
        } else {
          setNext(null);
        }
      } catch (error) {
        console.error(response);
      }
      setIsLoaded(true);
    },
    [url, next]
  );

  return { load, items, setItems, isLoaded, count, hasMore: next !== null };
}

export function usePost(url, method = "POST", callback = null) {
  const [isSavingNewItem, setIsSavingNewItem] = useState(false);
  const [errors, setErrors] = useState({});

  const load = useCallback(
    async (data = null) => {
      setIsSavingNewItem(true);
      try {
        const response = await fetchJson(url, method, data);
        setIsSavingNewItem(false);
        if (callback) {
          callback(response);
        }
      } catch (error) {
        setIsSavingNewItem(false);
        error.response.json().then((errorsData) => {
          if (errorsData.violations) {
            setErrors(
              errorsData.violations.reduce((acc, violation) => {
                acc[violation.propertyPath] = violation.message;
                return acc;
              }, {})
            );
          } else {
            throw errorsData;
          }
        });
      }
    },
    [url, method, callback]
  );

  const clearErrors = useCallback(
    (name) => {
      if (errors[name]) {
        setErrors((errors) => ({ ...errors, [name]: null }));
      }
    },
    [errors]
  );

  return { load, isSavingNewItem, errors, clearErrors };
}
