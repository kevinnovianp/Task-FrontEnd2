import { User } from "../user";

export class UserRepo{

    initUser(){
        if(localStorage.getItem('users')!=undefined) return
        const users = {
            items: [
                {id:1, username:'user1', password: 'user1'},
                {id:2, username:'user2', password: 'user2'},
                {id:3, username:'user3', password: 'user3'}
            ],
            nextId: 4
        }
        localStorage.setItem('users',JSON.stringify(users));
    }
}

// eslint-disable-next-line prefer-const
let userRepo = new UserRepo();
export default userRepo;