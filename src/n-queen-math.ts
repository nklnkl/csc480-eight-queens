export {
  NQueenMath,
  Queen
}

interface Queen {
  x: number;
  y: number;
}

class NQueenMath {

  public static isValid (x: number, y: number, queens: Array<Queen>): boolean {
    let valid: boolean = true;
    queens.forEach((queen) => {

      // If they are on the same horizontal plane.
      if (this.getSlope(x, y, queen.x, queen.y) == 0)
        valid = false;

      // If they are on the same vertical plane.
      if (this.getSlope(x, y, queen.x, queen.y) == Number.POSITIVE_INFINITY)
        valid = false;

      // If they are on the same diagonal plane.
      if (this.getSlope(x, y, queen.x, queen.y) == 1)
        valid = false;

      // If they are on the same exact position.
      if ((x == queen.x) && (y == queen.y))
        valid = false;

    });

    return valid;
  }

  private static getSlope (x1: number, y1: number, x2: number, y2: number): number {
    const deltaRow: number = Math.abs(x1-x2);
    const deltaCol: number = Math.abs(y1-y2);
    return deltaRow/deltaCol;
  }
  
}