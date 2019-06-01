export function transformX(x: number, width: number, maxX: number) {
    return (x * (-1 * (width / 2.3 / maxX)) + width / 2);
}

export function transformY(x: number, height: number, maxY: number) {
    return (x * (-1 * (height / 2.3 / maxY)) + height / 2);
}

export function returnMaxCoordinates(arrayOfCoordinates) {
    let maxCoordinates = arrayOfCoordinates.reduce((acc, coordinate) => {
        if (acc.y < coordinate.y) {
            acc.y = coordinate.y;
        }
        if (acc.x < coordinate.x) {
            acc.x = coordinate.x;
        }
        return acc;
    }, { 'x': arrayOfCoordinates[0].x, 'y': arrayOfCoordinates[0].y });
    return maxCoordinates;
}