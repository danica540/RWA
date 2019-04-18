export class User {
    constructor(id, username, password) {
        this._id = id;
        this._username = username;
        this._password = password;
        this._subscriptions = new Array();
    }

    setSubscriptions(subscriptionArray) {
        this._subscriptions = subscriptionArray;
    }

    get returnSubscriptions() {
        return this._subscriptions;
    }

    setUserInformation(username, password) {
        this._password = password;
        this._username = username;
    }

    addSubscription(sub) {
        this._subscriptions.push(sub);
    }

    removeSubscription(sub) {
        this._subscriptions = this._subscriptions.filter(subscription => subscription !== sub);
    }
}