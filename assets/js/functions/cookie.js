export function cookie(name, value = undefined, options = {}) {
  if (value === undefined) {
    const cookies = document.cookie.split(";");
    for (const cookie of cookies) {
      const [k, v] = cookie.split("=");
      if (k === name) {
        return v;
      }
    }
    return null;
  }

  if (value === null) {
    value = "";
    options.expires = -365;
  } else {
    value = encodeURIComponent(value);
  }

  if (options.expires) {
    const d = new Date();
    d.setDate(d.getDate() + options.expires);
    value += "; expires=" + d.toUTCString();
  }

  document.cookie = name + "=" + value + "; path=/; secure; samesite=lax";
}
