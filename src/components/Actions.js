import axios from 'axios';

const API = 'http://localhost:3500';

export function getAllBooks() {
  return new Promise((resolve, reject) => {
    axios
      .get(`${API}/api/books`)
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        console.log(error);
        reject(error);
      });
  });
}
export function saveBooks(body) {
  return new Promise((resolve, reject) => {
    axios
      .post(`${API}/api/books`, body)
      .then(function(res) {
        if (res.data.success) {
          resolve(res.data);
        }
        resolve(res.data);
      })
      .catch(function(error) {
        reject(error);
        console.log(error);
      });
  });
}
export function signUp(body) {
  return new Promise((resolve, reject) => {
    axios
      .post(`${API}/api/user`, body)
      .then(function(res) {
        if (res.data.success) {
          resolve(res.data);
        }
        resolve(res.data);
      })
      .catch(function(error) {
        reject(error);
        console.log(error);
      });
  });
}

export function login(body) {
  return new Promise((resolve, reject) => {
    axios
      .post(`${API}/api/user/login`, body)
      .then(function(res) {
        if (res.data.success) {
          resolve(res.data);
        }
        resolve(res.data);
      })
      .catch(function(error) {
        reject(error);
        console.log(error);
      });
  });
}

export function getUser(body) {
  return new Promise((resolve, reject) => {
    axios
      .get(`${API}/api/user/${body}`)
      .then(function(res) {
        if (res.data.success) {
          resolve(res.data);
        }
        resolve(res.data);
      })
      .catch(function(error) {
        reject(error);
        console.log(error);
      });
  });
}

export function buyBook(body) {
  return new Promise((resolve, reject) => {
    axios
      .post(`${API}/api/purchase`, body)
      .then(function(res) {
        if (res.data.success) {
          resolve(res.data);
        }
        resolve(res.data);
      })
      .catch(function(error) {
        reject(error);
        console.log(error);
      });
  });
}
export function isLoggedIn() {
  const token = localStorage.getItem('token');
  return new Promise((resolve, reject) => {
    if (token != null) {
      resolve(token);
    } else {
      reject('');
    }
  });
}
