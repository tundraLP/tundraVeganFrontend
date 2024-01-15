export class Client {
    constructor(name, lastName, mail, adress, image, password, type, UserId) {
        this.name = name;
        this.lastName = lastName;
        this.mail = mail;
        this.adress = adress;
        this.image = image;
        this.password = password;
        this.type = type;
        this.UserId = UserId == null ? null : UserId
    };
};