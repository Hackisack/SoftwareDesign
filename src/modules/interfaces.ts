// Interfaces are stored here --> Names show there usage

export interface LoginData {

    username: string;
    password: string;
    serverId: string;

}

export interface ServerId {

    serverId: string;

}

export interface AdminData {
    username: string;
    admin: string;
    }

export interface SearchTerm {
    searchTerm: string;
    serverId: string;
    }

export interface ChangeAdmin {
    username: string;
    serverId: string;
    }

export interface Amount {
    amount: number;
        }
