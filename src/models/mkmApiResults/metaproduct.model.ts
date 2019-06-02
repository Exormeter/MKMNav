export interface MetaProduct{

    idMetaproduct: number;
    localization: Array<SearchResultLocalization>;
    product: Array<ProductDetails>;
}

export interface ProductDetails{
	
	idProduct: number;
	idMetaproduct: number;
	countReprints: number;
	enName: string;
	locName: string;
	localization: Array<SearchResultLocalization>;
	webssite: string;
	image: string;
	gameName: string;
	categoryName: string;
	idGame: string;
	number: string;
	rarity: string;
	expansionName: string;
	expansionIcon: number;
	countArticles: number;
	countFoils: number;
}

export class SearchResultLocalization{
	
	name: string;
	id: string;
	languageName: string;
}
