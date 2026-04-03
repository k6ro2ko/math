export interface Shape {
  circumference(): number;
  area(): number;
  encompasses(other: Shape): boolean;  
}

export class Point2D {
  constructor(
    public x: number,
    public y: number,
  ) {}

  distanceTo(other: Point2D): number {
    return Math.sqrt(
      Math.abs(this.x - other.x) ** 2 + Math.abs(this.y - other.y) ** 2,
    );
  }

  isBetweenX(p: Point2D, q: Point2D): boolean {
    const minX = Math.min(p.x, q.x);
    const maxX = Math.max(p.x, q.x);
    return this.x >= minX && this.x <= maxX;
  }

  isBetweenY(p: Point2D, q: Point2D): boolean {
    const minY = Math.min(p.y, q.y);
    const maxY = Math.max(p.y, q.y);
    return this.y >= minY && this.y <= maxY;
  }
}

export class Circle implements Shape {
  constructor(
    public center: Point2D,
    public radius: number,
  ) {}

  circumference(): number { return 2 * Math.PI * this.radius; }
  area(): number { return Math.PI * this.radius ** 2; }
  diameter(): number { return 2 * this.radius; }

  north(): Point2D { return new Point2D(this.center.x, this.center.y + this.radius); }
  east(): Point2D { return new Point2D(this.center.x + this.radius, this.center.y); }
  south(): Point2D { return new Point2D(this.center.x, this.center.y - this.radius); }
  west(): Point2D { return new Point2D(this.center.x - this.radius, this.center.y); }

  encompasses(other: Shape): boolean {
    if (other instanceof Rectangle) {
      const bl = other.bottomLeft;
      const tr = other.topRight;
      const br = new Point2D(tr.x, bl.y);
      const tl = new Point2D(bl.x, tr.y);

      return this.center.distanceTo(bl) <= this.radius &&
             this.center.distanceTo(tr) <= this.radius &&
             this.center.distanceTo(br) <= this.radius &&
             this.center.distanceTo(tl) <= this.radius;
    }
    return false;
  }
}

export class Rectangle implements Shape {
  constructor(
    public bottomLeft: Point2D,
    public topRight: Point2D,
  ) {}

  circumference(): number { return 2 * (this.width() + this.height()); }
  area(): number { return this.width() * this.height(); }
  diagonal(): number { return this.bottomLeft.distanceTo(this.topRight); }
  private width(): number { return this.topRight.x - this.bottomLeft.x; }
  private height(): number { return this.topRight.y - this.bottomLeft.y; }

  encompasses(other: Shape): boolean {
    if (other instanceof Circle) {
      const points = [other.center, other.north(), other.east(), other.south(), other.west()];
      
      return points.every(p => 
        p.isBetweenX(this.bottomLeft, this.topRight) && 
        p.isBetweenY(this.bottomLeft, this.topRight)
      );
    }
    return false;
  }
}