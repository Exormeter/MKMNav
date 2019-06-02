import { LocalizationProduct } from "./product.model";

export interface ExpansionSet{
    idExpansion: number;
    enName: string;
    localization: LocalizationProduct;
    abbreviation: string;
    icon: number;
    releaseDate: Date;
    isReleased: boolean;
    idGame: number;
}