import { User } from "../user";

export class UserRepo{

    private users: User[] = [
        {id:1, username:'user1', password: 'user1'},
        {id:2, username:'user2', password: 'user2'},
        {id:3, username:'user3', password: 'user3'}
    ];
    private currUserId = 4;

    initUser(){
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

    isUserExists(username: string, password: string){
        for(let i=0;i<this.users.length; i++){
            if(this.users[i].username === username && this.users[i].password === password) return this.users[i];
        }
        return null;
    }

    getNextUserId(){
        this.currUserId++;
        return this.currUserId;
    }

    addUser(newUser: User){
        this.users.push(newUser);
    }
}

// eslint-disable-next-line prefer-const
let userRepo = new UserRepo();
export default userRepo;