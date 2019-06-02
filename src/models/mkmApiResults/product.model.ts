export interface Product{
    idProduct: number;
    idMetaproduct: number;
    countReprints: number;
    enName: string
    localization: [LocalizationProduct];
    website: string;
    image: string;
    gameName: string;
    categoryName: string;
    number: string;
    rarity: string;
    expansion: ExpansionProduct;
    priceGuide: PriceGuideProduct;
    reprint: [ReprintsProduct]
}

export interface LocalizationProduct{
    idLanguage: number;
    languageName: string;
    productName: string;
}

export interface ExpansionProduct{
    idExpansion: number;
    enName: string;
    expansionIcon: number;
}

export interface PriceGuideProduct{
    SELL: number;
    LOW: number;
    LOWEX: number;
    LOWFOIL: number;
    AVG: number;
    TREND: number;
}

export interface ReprintsProduct{
    idProduct: number;
    expansion: string;
    expansionIcon: number;
}