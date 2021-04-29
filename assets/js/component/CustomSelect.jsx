import React, { forwardRef, useEffect } from "react";
import { useFetch } from "../api/websites_api";

export const CustomSelect = forwardRef(
  ({ name, error, user, onChange, children, selected }, ref) => {
    const { load: fetchApi, items: options, isLoading } = useFetch(
      `/api/themes?owner=/api/users/${user}`
    );

    useEffect(() => {
      fetchApi();
    }, []);

    return (
      <div className={`form-group ${error ? "has-error" : ""}`}>
        <select
          className="form-select"
          name={name}
          id={name}
          ref={ref}
          defaultValue={selected}
          onChange={onChange}
        >
          <option>{children}</option>
          {isLoading && <option value="">Loading...</option>}
          {options.map((option) => (
            <option value={option["@id"]} key={option.id}>
              {option.title}
            </option>
          ))}
        </select>
        {error && <span>{error}</span>}
      </div>
    );
  }
);
