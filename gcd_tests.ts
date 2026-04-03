import { assertEquals } from "https://deno.land/std@0.218.0/testing/asserts.ts";
import { gcdBruteForce, gcdEuclid } from "./gcd.ts";

Deno.test("gcdBruteForce finds correct common divisors", () => {
  assertEquals(gcdBruteForce(1, 1), 1);
  assertEquals(gcdBruteForce(6, 9), 3);
  assertEquals(gcdBruteForce(81, 36), 9);
});

const gcdTests = [
  { a: 1, b: 1, gcd: 1 },
  { a: 1, b: 2, gcd: 1 },
  { a: 2, b: 2, gcd: 2 },
  { a: 3, b: 4, gcd: 1 },
  { a: 6, b: 9, gcd: 3 },
  { a: 81, b: 36, gcd: 9 },
];

Deno.test("gcdEuclid works correctly (Table-Driven Test)", () => {
  for (const { a, b, gcd } of gcdTests) {
    const actual = gcdEuclid(a, b);
    assertEquals(actual, gcd);
  }
});