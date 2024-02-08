export class Product {
    constructor(name, type, description, price, stock, image, ProductId) {
        this.name = name;
        this.type = type;
        this.description = description;
        this.price = Number(price);
        this.stock = Number(stock);
        this.image = image;
        this.ProductId = ProductId == null ? null : ProductId;
    };
};