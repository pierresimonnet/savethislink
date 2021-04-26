import React, { forwardRef, useEffect } from "react";
import { useFetch } from "../api/websites_api";

export const CustomSelect = forwardRef(
  ({ name, error, user, children }, ref) => {
    const { load: fetchApi, items: options, isLoading } = useFetch(
      `/api/themes?owner=/api/users/${user}`
    );

    useEffect(() => {
      fetchApi();
    }, []);

    return (
      <div className={`${error ? "has-error" : ""}`}>
        <select name={name} id={name} ref={ref}>
          <option value="">{children}</option>
          {isLoading && <option value="">Loading...</option>}
          {options.map((option) => (
            <option value={option["@id"]} key={option.title}>
              {option.title}
            </option>
          ))}
        </select>
        {error && <span>{error}</span>}
      </div>
    );
  }
);
