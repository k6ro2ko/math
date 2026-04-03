import { roundTo } from "./utils.ts";
import { gcdEuclid } from "./gcd.ts";

export class Fraction {
  constructor(
    public numerator: number,
    public denominator: number,
  ) {
    this.cancel(); 
  }

  public cancel() {
    const gcd = gcdEuclid(this.numerator, this.denominator);
    this.numerator /= gcd;
    this.denominator /= gcd;
  }

  public add(other: Fraction) {
    this.numerator = this.numerator * other.denominator + other.numerator * this.denominator;
    this.denominator = this.denominator * other.denominator;
    this.cancel();
  }

  public subtract(other: Fraction) {
    this.numerator = this.numerator * other.denominator - other.numerator * this.denominator;
    this.denominator = this.denominator * other.denominator;
    this.cancel();
  }

  public multiply(other: Fraction) {
    this.numerator = this.numerator * other.numerator;
    this.denominator = this.denominator * other.denominator;
    this.cancel();
  }

  public divide(other: Fraction) {
    this.numerator = this.numerator * other.denominator;
    this.denominator = this.denominator * other.numerator;
    this.cancel();
  }

  public toFloat(precision: number): number {
    return roundTo(this.numerator / this.denominator, precision);
  }

  public toString(): string {
    return `${this.numerator}/${this.denominator}`;
  }

  public static parse(expression: string): Fraction {
    const parts = expression.split("/");
    if (parts.length != 2) {
      throw new Error(`illegal syntax: "[numerator]/[denominator]" required`);
    }
    const numerator = Number.parseInt(parts[0].trim());
    const denominator = Number.parseFloat(parts[1].trim());
    if (Number.isNaN(numerator) || Number.isNaN(denominator)) {
      throw new Error(`non-numeric numerator/denominator`);
    }
    return new Fraction(numerator, denominator);
  }
}