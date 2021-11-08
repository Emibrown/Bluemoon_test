export interface appState  {
    inventory: any;
    loading: boolean;
    name: string;
}

export interface inventoryData  {
    _id: string;
    name: string;
    stock: number;
    price: number;
    description: string
}