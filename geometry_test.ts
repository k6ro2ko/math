import { assertAlmostEquals, assertEquals } from "@std/assert";
import { Circle, Point2D, Rectangle } from "./geometry.ts";

Deno.test("circumference of a circle with radius 5 is roughtly 31.416", () => {
  // Given (Arrange)
  const circle = new Circle(new Point2D(3, 4), 5);
  // When (Act)
  const actual = circle.circumference();
  // Then (Assert)
  assertAlmostEquals(actual, 31.416, 0.01);
});

Deno.test("looks if Circle.area works correctly", () => {
  // Arrange
  const radius = 3;
  const circle = new Circle(new Point2D(0, 0), radius);
  // Act
  const area = circle.area();
  // Assert
  assertAlmostEquals(area, Math.PI * (radius ** 2), 0.0001);
});

Deno.test("looks if Circle.diameter works correctly", () => {
  // Arrange
  const radius = 4.5;
  const circle = new Circle(new Point2D(0, 0), radius);
  // Act
  const diameter = circle.diameter();
  // Assert
  assertEquals(diameter, radius * 2);
});

Deno.test("Point2D.distanceTo calculates correct distance", () => {
  // Arrange
  const p1 = new Point2D(1, 1);
  const p2 = new Point2D(4, 5);
  // Act
  const distance = p1.distanceTo(p2);
  // Assert
  assertEquals(distance, 5);
});

Deno.test("Rectangle area is correct", () => {
  
  const rect = new Rectangle(new Point2D(0, 0), new Point2D(5, 4));
  
  const area = rect.area();
  
  assertEquals(area, 20);
});

Deno.test("Rectangle circumference is correct", () => {

  const rect = new Rectangle(new Point2D(0, 0), new Point2D(5, 4));

  const circumference = rect.circumference();

  assertEquals(circumference, 18);
});

Deno.test("Rectangle diagonal is correct", () => {
  
  const rect = new Rectangle(new Point2D(0, 0), new Point2D(3, 4));

  const diagonal = rect.diagonal();
  
  assertEquals(diagonal, 5);
});