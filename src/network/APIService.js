import axios from 'axios';

const API_BASE_URL = 'https://fakestoreapi.com'; // Local API base URL

class APIService {
  constructor() {
    this.api = axios.create({
      baseURL: API_BASE_URL,
      // You can add additional Axios configuration options here, e.g. headers, timeout, etc.
    });
  }

  async submitOrder(order) {
    try {
      const response = await this.api.post('/orders', order);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  }
}

export default new APIService();
