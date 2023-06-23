import axios from 'axios';

export default axios.create({
  baseURL: 'https://api.rawg.io/api',
  params: {
    key: '6e67065e72b54d4eb21be6cc311e7391',
  },
});
