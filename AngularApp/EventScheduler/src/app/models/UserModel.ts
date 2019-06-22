export class UserModel {
    id?: number;
    username: string;
    password: string;
    email: string;

    constructor() {

    }

    setAttributes(usernameValue: string, passwordValue: string, emailValue: string) {
        this.password = passwordValue;
        this.username = usernameValue;
        this.email = emailValue;
    }
}