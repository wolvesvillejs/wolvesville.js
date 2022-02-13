const Constants = require('./Constants')

class Headers {

  static getBodyHeaders(token) {
    return {
      'Content-Type': 'application/json'
    }
  }

  static getAuthenticationHeaders(token) {
    return {
      'Authorization': `Bearer ${token}`
    }
  }

  static getAuthenticationHeadersContainsBody(token) {
    return {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  }

}

module.exports = Headers;
