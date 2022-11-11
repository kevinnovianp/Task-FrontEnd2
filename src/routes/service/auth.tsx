import { User } from '../user';
import Swal from 'sweetalert2';

export class AuthService {
    private apiUrl = "http://localhost:8080/authenticate";
    private readonly JWT_TOKEN = 'JWT_TOKEN';

    async login(user: User){
        return fetch(this.apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        })
    }

    isLoggedIn() {
        if(this.getToken() !== "undefined" && this.getToken() !== null){
          console.log(this.getToken());
          return true;
        }else {
          return false;
        }
    }

    doLoginUser(username: string, token: string){
        this.storeToken(token);
        console.log(this.getToken());
    }

    storeToken(token: string){
        localStorage.setItem(this.JWT_TOKEN, token);
    }

    logout(){
        if(this.isLoggedIn()){
            this.removeToken();
            Swal.fire({
                title: 'Success',
                text: 'Logout Berhasil!',
                icon: 'success'
            }).then((result) => {
              if (result.isConfirmed) {
                location.pathname = ("/login");
              }
            });
        } else {
            Swal.fire({
                title: 'Error',
                text: 'Logout Gagal!',
                icon: 'error',
            })
        }
    }

    removeToken(){
        localStorage.removeItem(this.JWT_TOKEN);
    }
    
    getToken(){
        return localStorage.getItem(this.JWT_TOKEN);
    }
}

const AuthServiceProvider = new AuthService();
export default AuthServiceProvider;