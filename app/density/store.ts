export class Store {
  private store = {};

  constructor(data) {
    this.store = data;
  }
  set(store) {
    return this.store = Object.assign({}, this.store, store);
  }

  get() {
    return this.store;
  }
};
