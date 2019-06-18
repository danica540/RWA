export class UserModel {
    id: number;
    username: string;
    password: string;
    email: string;

    constructor() {

    }

    setAttributes(usernameValue: string, passwordValue: string, emailValue: string) {
        this.id = parseInt((Math.random() * 7 * 13 * 17).toString());
        this.password = passwordValue;
        this.username = usernameValue;
        this.email = emailValue;
    }
}