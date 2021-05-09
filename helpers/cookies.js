export function setCookie(cnames, cvalues, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  const expires = `expires=${d.toUTCString()}`;
  const values = [];
  for (let i = 0; i < cnames.length; i += 1) {
    values.push(`${cnames[i]}=${cvalues[i]}`);
  }
  document.cookie = `${values.join("&")};${expires};path=/`;
}

export function getCookie(cname) {
  const name = `${cname}=`;
  let ca = document.cookie.split(";");
  ca = ca[0].split("&");
  for (let i = 0; i < ca.length; i += 1) {
    let c = ca[i];
    while (c.charAt(0) === " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
