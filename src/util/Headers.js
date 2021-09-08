const Constants = require('./Constants')

class Headers {

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

  static getFirebaseHeaders() {
    return {
      'X-Android-Package': Constants.FIREBASE_APP_PACKAGE_NAME,
      'X-Android-Cert': Constants.FIREBASE_APP_CERTIFICATE
    }
  }

}

module.exports = Headers;
