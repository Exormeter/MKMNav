export interface Article{
    idArticle: number;
    idProduct: number;
    language: Language;
    comments: string;
    price: number;
    count: number;
    inShoppingCart: boolean;
    seller: Seller;
    condition: string;
    isFoil: boolean;
    isSigned: boolean;
    isPlayset: boolean;
    isAltered: boolean;
}

export interface Seller{
    idUser: number;
    username: string;
    registrationDate: Date;
    isCommercial: number;
    isSeller: boolean;
    name: Name;
    address: Address;
    phone: string;
    email: string;
    vat: string;
    legalInformation: string;
    riskGroup: number;
    lossPercentage: string;
    unsentShipments: string;
    reputation: number;
    shipsFast: number;
    sellCount: number;
    soldItems: number;
    avgShippingTime: number;
    onVacation: boolean;
}

export interface Name{
    firstName: string;
}

export interface Address{
    country: string;
}

export interface Language{
    idLanguage: number;
    languageName: string;
}


export class HoldPlace implements Article{
    idArticle: number = 0;
    idProduct: number = 0;
    language: Language = {
        idLanguage: 0,
        languageName: ''
    };
    comments: string = '';
    price: number = 0;
    count: number = 0;
    inShoppingCart: boolean = false;
    seller: Seller = {
        idUser: 0,
        username: 'N.A',
        registrationDate: new Date(),
        isCommercial: 0,
        isSeller: false,
        name: {
            firstName: 'N.A'
        },
        address: {
            country: 'N.A'
        },
        phone: '',
        email: '',
        vat: '',
        legalInformation: '',
        riskGroup: 0,
        lossPercentage: '',
        unsentShipments: '',
        reputation: 0,
        shipsFast: 0,
        sellCount: 0,
        soldItems: 0,
        avgShippingTime: 0,
        onVacation: true
    };
    condition: string;
    isFoil: boolean;
    isSigned: boolean;
    isPlayset: boolean;
    isAltered: boolean;
}