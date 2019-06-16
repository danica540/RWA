export function setErrorLabel(errorValue: string) {
    (document.getElementById("error") as HTMLLabelElement).innerHTML = errorValue;
}