class ProductToUpdate {
    constructor(input, original) {
        this.ProductId = original.id;
        this.name = original.name == input.name ? undefined : input.name;
        this.type = original.type == input.type ? undefined : input.type;
        this.description = original.description == input.description ? undefined : input.description;
        this.price = original.price == input.price ? undefined : input.price;
        this.stock = original.stock == input.stock ? undefined : input.stock;
        this.image = original.image == input.image ? undefined : input.image;
        this.readyToUpdate = (this.name != undefined || this.type != undefined || this.description != undefined || this.price != undefined || this.stock != undefined || this.image != undefined) ? true : false;
    };
};

export default ProductToUpdate;