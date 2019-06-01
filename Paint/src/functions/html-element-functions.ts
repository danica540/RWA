export function enableButton(btn: HTMLButtonElement) {
    btn.disabled = false;
    btn.style.background = "transparent";
}

export function disableButton(btn: HTMLButtonElement) {
    btn.disabled = true;
    btn.style.background = "#dddddd";
}


export function hideButton (btn: HTMLButtonElement) {
    btn.style.display = "none";
}

export function makeButtonVisible (btn: HTMLButtonElement) {
    btn.style.display = "inline";
}