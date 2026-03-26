import { assertAlmostEquals, assertEquals, assertThrows } from "@std/assert";
import { Fraction } from "./fraction.ts";

Deno.test("fraction of 1/1 is 1.0", () => {
  // Arrange
  const fraction = new Fraction(1, 1);
  // Act
  const float = fraction.toFloat(0.1);
  // Assert
  assertEquals(float, 1.0);
});

Deno.test("fraction of 2/3 is roughly 0.67", () => {
  // Arrange
  const fraction = new Fraction(2, 3);
  // Act
  const float = fraction.toFloat(0.01);
  // Assert
  assertAlmostEquals(float, 0.67);
});

Deno.test("1/3 + 2/6 = 2/3 is roughly 0.67", () => {
  // Arrange
  const left = new Fraction(1, 3);
  const right = new Fraction(2, 6);
  // Act
  left.add(right);
  // Assert
  assertAlmostEquals(left.toFloat(0.01), 0.67);
});

Deno.test("Fraction.subtract works correctly", () => {
  // Arrange
  const left = new Fraction(3, 4);
  const right = new Fraction(1, 2);
  // Act
  left.subtract(right);
  // Assert
  assertEquals(left.toString(), "2/8");
});

Deno.test("Fraction.multiply works correctly", () => {
  // Arrange
  const left = new Fraction(2, 3);
  const right = new Fraction(4, 5);
  // Act
  left.multiply(right);
  // Assert
  assertEquals(left.toString(), "8/15");
});

Deno.test("looks if Fraction.divide works correctly", () => {
  
  const left = new Fraction(2, 3);
  const right = new Fraction(4, 5);
  
  left.divide(right);
  
  assertEquals(left.toString(), "10/12");
});

Deno.test("Fraction.parse parses correctly", () => {
  
  const expression = " 3 / 4 ";
  
  const f = Fraction.parse(expression);
  
  assertEquals(f.toString(), "3/4");
});

Deno.test("Fraction.parse throws on invalid syntax", () => {
  
  assertThrows(() => Fraction.parse("5"), Error, 'illegal syntax: "[numerator]/[denominator]" required');
  assertThrows(() => Fraction.parse("a/b"), Error, "non-numeric numerator/denominator");
});