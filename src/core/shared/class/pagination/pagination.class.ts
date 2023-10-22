export class Pagination {
  readonly page: number;
  readonly quantity: number;

  offset() {
    return this.page * this._calculatedQuantity();
  }

  private _calculatedQuantity() {
    return this.quantity - this.quantity;
  }
}
