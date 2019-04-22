import { from } from "rxjs";

export class UserService {

    constructor() {
        this._user = null;
    }

    getUser(username, password) {
        return from(
            fetch("http://localhost:3000/users?username=" + username + "&password=" + password)
                .then(res => { return res.json() })
        )
    }

    getUserSubscriptions(id) {
        return from(
            fetch("http://localhost:3000/subscriptions?user_id=" + id)
                .then(res => { return res.json() })
        )
    }

}