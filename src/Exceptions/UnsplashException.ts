export class UnsplashException extends Error {
  constructor() {
    super("Coudn't fetch Image from Unsplash");

    Object.setPrototypeOf(this, UnsplashException.prototype);
  }

  getMessages() {
    return this.message;
  }
}
