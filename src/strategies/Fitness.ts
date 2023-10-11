import { Vector2 } from "../utils/types.ts";

export class Fitness {
  public static getEuclideanDistance(a: Vector2, b: Vector2) {
    const [x1, y1] = a;
    const [x2, y2] = b;
    return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
  }

  public static getManhattanDistance(a: Vector2, b: Vector2) {
    const [x1, y1] = a;
    const [x2, y2] = b;
    return Math.abs(x1 - x2) + Math.abs(y1 - y2);
  }
}
