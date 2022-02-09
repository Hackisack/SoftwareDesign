export interface LoginData {

    Username: string;
    Password: string;
    ServerId: string;

}

export interface ServerId {

    ServerId: string;

}

export interface UserData {

    Username: string;
    Password: string;
    Admin: string;
    ServerId: string;

}

export interface AdminData {
    Username: string;
    Admin: string;
    }

export interface Product {
    ID: string;
    Description: string;
    MEDate: Date;
    Price: number;
    StandardDeliveryTime: number;
    MinBG: number;
    MaxBG: number;
    DiscountBG: number;
    Discount: number;
    ServerId: string;
}

export interface SearchTerm {
    SearchTerm: string;
    ServerId: string;
    }

export interface ChangeAdmin {
    Username: string;
    ServerId: string;
    }

export interface Customer {
    ID: string;
    Name: string;
    Adress: string;
    Discount: number;
    ServerId: string;
    }

export interface Amount {
        Amount: number;
        }

export interface Order {
    ID: string;
    Customer: string;
    Description: string;
    OrderDate: Date;
    DeliveryDate: Date;
    Price: number;
    OrderPositions?: [[Product, Amount]];
    ServerId: string;
    }
