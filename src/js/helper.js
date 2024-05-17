// Funkcije koje se ponavljaju kroz aplikaciju
import { TIMEOUT_SEC } from './config';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const AJAX = async function (url, uploadData = undefined) {
  try {
    const fetchPro = uploadData
      ? fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(uploadData),
        })
      : fetch(url);

    // Radimo Promise.race da vidimo hoce li prije isteci timeout ili ce se fetchat data
    const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} ${res.status}`);

    return data;
  } catch (error) {
    throw error;
  }
};

// export const getJSON = async function (url) {
//   try {
//     // Radimo Promise.race da vidimo hoce li prije isteci timeout ili ce se fetchat data
//     const res = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]);
//     const data = await res.json();

//     if (!res.ok) throw new Error(`${data.message} ${res.status}`);

//     return data;
//   } catch (error) {
//     throw error;
//   }
// };

// export const sendJSON = async function (url, uploadData) {
//   try {
//     //Za uploadanje na API preko fetcha, moramo dodat još jedan parametar, a to je objekt s opcijama
//     //method: "POST" - ocito
//     //headers: {
//     // "Content-Type": "application/json" -> govorimo da će podaci bit u json formatu
//     // } - snippeti teksta koji sadrže info o requestu
//     //body: {podaci u JSON formatu} - podaci
//     const fetchPro = fetch(url, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(uploadData),
//     });

//     const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
//     const data = await res.json();

//     if (!res.ok) throw new Error(`${data.message} ${res.status}`);

//     return data;
//   } catch (error) {
//     throw error;
//   }
// };
