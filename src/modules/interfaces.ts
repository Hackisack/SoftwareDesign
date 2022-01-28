export interface LoginData {

    Username: string;
    Password: string;
    ServerId: string;

}

export interface ServerRequest {

    ServerId: string;

}

export interface UserData {

    Username: string;
    Password: string;
    Admin: string;

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
}