export function initialize() {

    HTMLElement.prototype.showElement = function () {
        this.style.display = "flex";
    }

    HTMLElement.prototype.hideElement = function () {
        this.style.display = "none";
    }

}