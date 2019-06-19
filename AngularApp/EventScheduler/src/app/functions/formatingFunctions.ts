export function returnFormatedDate(date: string) {
    let year: string = date.slice(0, 4);
    let month: string = date.slice(5, 7);
    let day: string = date.slice(8, 10);
    return `${day}.${month}.${year}.`;
}