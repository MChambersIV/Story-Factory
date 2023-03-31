<<<<<<< HEAD
=======
import decode from 'jwt-decode'

>>>>>>> 171d139a5a1adbb0299a2b756d33d09e30b5cc8f
class TokenService {
    login(userToken) {
        localStorage.setItem('user_token', userToken);
        window.location.assign('/');
    }
    logout() {
        localStorage.removeItem('user_token');
        window.location.assign('/');
    }
<<<<<<< HEAD
=======
    retrieveToken() {
        return localStorage.getItem('user_token');
      }
    loggedIn() {
         const token = this.retrieveToken();
        return !!token && !this.isTokenExpired(token);
      }
    isTokenExpired(token) {
        try {
          const decoded = decode(token);
          if (decoded.exp < Date.now() / 10000) {
            return true;
          } else return false;
        } catch (err) {
          return false;
        }
    }
      getProfile() {
        return decode(this.retrieveToken());
      }
>>>>>>> 171d139a5a1adbb0299a2b756d33d09e30b5cc8f
}

export default new TokenService(); 