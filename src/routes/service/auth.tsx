import { User } from '../user';
import Swal from 'sweetalert2';
import userRepo from './userRepo';

export class AuthService {

    login(user: User){
        return userRepo.isUserExists(user.username, user.password);
    }

    // isLoggedIn() {
    //     if(this.getToken() !== "undefined" && this.getToken() !== null){
    //       console.log(this.getToken());
    //       return true;
    //     }else {
    //       return false;
    //     }
    // }

    // doLoginUser(username: string, token: string){
    //     this.storeToken(token);
    //     console.log(this.getToken());
    // }

    // storeToken(token: string){
    //     localStorage.setItem(this.JWT_TOKEN, token);
    // }

    logout(){
        Swal.fire({
            title: 'Success',
            text: 'Logout Berhasil!',
            icon: 'success'
        }).then((result) => {
          if (result.isConfirmed) {
            location.pathname = ("/login");
          }
        });
    }

    // removeToken(){
    //     localStorage.removeItem(this.JWT_TOKEN);
    // }
    
    // getToken(){
    //     return localStorage.getItem(this.JWT_TOKEN);
    // }
}

const auth = new AuthService();
export default auth;