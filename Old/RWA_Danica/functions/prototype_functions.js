export function initialize() {

    HTMLElement.prototype.showElement = function () {
        this.style.display = "flex";
    }

    HTMLElement.prototype.showElementBlock = function () {
        this.style.display = "block";
    }

    HTMLElement.prototype.hideElement = function () {
        this.style.display = "none";
    }

}