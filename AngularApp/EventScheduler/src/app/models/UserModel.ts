export class UserModel {
    id: number;
    username: string;
    password: string;
    email: string;

    constructor() {
    }

    setAttributes(username: string, password: string, email: string) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.id = (Math.random() * 13 * 7) % 123;
    }
}