'use strict';

const fetch = require('node-fetch');

class APIRequest {
  constructor(rest, method, route, options) {
    this.rest = rest;
    this.method = method;
    this.options = options;
    this.route = route;

    if(options.query) this.route += `?${new URLSearchParams(options.query).toString()}`;
  }

  make() {
    const url = (this.options.api || this.rest.options.api) + this.route;

    const headers = {
      Authorization: `Bot ${this.rest.APIKey}`
    };

    let body;

    if (this.options.data !== null && this.options.data !== undefined) {
      body = JSON.stringify(this.options.data);
      headers['Content-Type'] = 'application/json';
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), this.rest.options.timeout);
    return fetch(url, {
      method: this.method,
      headers,
      body,
      signal: controller.signal,
    }).finally(() => clearTimeout(timeout));
  }
}

module.exports = APIRequest;
