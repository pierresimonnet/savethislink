import React, { forwardRef } from "react";

export const Text = forwardRef(
  ({ name, children, help, error, onChange, required, placeholder }, ref) => {
    return (
      <div className="input-group">
        {children && <label htmlFor={name}>{children}</label>}
        <input
          type="text"
          name={name}
          id={name}
          className="input input-text"
          ref={ref}
          onChange={onChange}
          required={required}
          placeholder={placeholder}
        />
        {help && <div className="help-text">{help}</div>}
        {error && <div className="input-error">{error}</div>}
      </div>
    );
  }
);

export const Url = forwardRef(
  ({ name, children, help, error, onChange, required, placeholder }, ref) => {
    return (
      <div className="input-group">
        {children && <label htmlFor={name}>{children}</label>}
        <input
          type="url"
          name={name}
          id={name}
          className="input input-text"
          ref={ref}
          onChange={onChange}
          required={required}
          placeholder={placeholder}
        />
        {help && <div className="help-text">{help}</div>}
        {error && <div className="input-error">{error}</div>}
      </div>
    );
  }
);

export const Textarea = forwardRef(
  (
    { name, children, help, error, onChange, required, placeholder, minLength },
    ref
  ) => {
    return (
      <div className="input-group">
        {children && <label htmlFor={name}>{children}</label>}
        <textarea
          name={name}
          id={name}
          onChange={onChange}
          required={required}
          ref={ref}
          class="input input-textarea"
          placeholder={placeholder}
          minLength={minLength}
          rows="5"
          is="textarea-autogrow"
        ></textarea>
        {help && <div className="help-text">{help}</div>}
        {error && <div className="input-error">{error}</div>}
      </div>
    );
  }
);

export const Checkbox = forwardRef(
  ({ name, children, help, error, onChange, required }, ref) => {
    return (
      <div className="input-group">
        <div className="input-checkbox">
          <input
            type="checkbox"
            name={name}
            id={name}
            ref={ref}
            onChange={onChange}
            required={required}
          />
          {children && <label htmlFor={name}>{children}</label>}
          {help && <div className="help-text">{help}</div>}
          {error && <div className="input-error">{error}</div>}
        </div>
      </div>
    );
  }
);

export const Toggle = forwardRef(
  ({ name, children, help, error, onChange, required }, ref) => {
    return (
      <div className="input-group">
        <div className="input-checkbox checkbox-toggle">
          <input
            type="checkbox"
            id={name}
            name={name}
            ref={ref}
            onChange={onChange}
            required={required}
          />
          <label htmlFor={name}>{children}</label>
        </div>
        {help && <div className="help-text">{help}</div>}
        {error && <div className="input-error">{error}</div>}
      </div>
    );
  }
);
