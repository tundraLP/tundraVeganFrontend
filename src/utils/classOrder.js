export class Order {
  constructor(UserId, products, adress, total) {
    this.UserId = UserId;
    this.products = products;
    this.state = 'Pendiente';
    this.adress = adress;
    this.total = total;
  };
};
