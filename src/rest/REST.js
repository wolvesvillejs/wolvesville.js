'use strict';

const APIRequest = require('./APIRequest');
const RESTOptions = require('./RESTOptions');

class REST {
  constructor(APIKey) {
    this.APIKey = APIKey;
    this.options = RESTOptions.createDefault();
  }

  get(route, options = {}) {
    return this.#request('GET', route, options);
  }

  post(route, options = {}) {
    return this.#request('POST', route, options);
  }

  put(route, options = {}) {
    return this.#request('PUT', route, options);
  }

  async #request(method, route, options) {
    const request = new APIRequest(this, method, route, options);

    const response = await request.make();

    switch (response.status) {
      case 401:
        throw new Error('INVALID_API_KEY');
      case 429:
        throw new Error('TOO_MANY_REQUESTS');
      default:
        if (response.status !== 200) return { code: response.status };
    }

    if (response.headers.get('Content-Type')?.startsWith('application/json')) {
      return response.json();
    } else {
      throw new Error('INVALID_RESPONSE');
    }
  }
}

module.exports = REST;
