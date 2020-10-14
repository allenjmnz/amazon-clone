import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://us-central1-clone-4m4z0n.cloudfunctions.net/api'
  // 'http://localhost:5001/clone-4m4z0n/us-central1/api' Local function URL
});

export default instance;
