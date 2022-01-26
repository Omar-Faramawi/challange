export class ModelException extends Error {
  constructor(msg: string) {
    super(msg);

    Object.setPrototypeOf(this, ModelException.prototype);
  }

  getMessages() {
    return this.message;
  }
}
