export default function headers() {
  const token = JSON.parse(localStorage.getItem('token'));
  if (token) {
    return { headers: { 'x-access-token': token.accessToken } };
  } else {
    return { headers : {} };
  }
}
