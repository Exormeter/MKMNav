export class SettingsModel {

    private isFoil: string;
    private allowedOriginCountries: string[];
    private cardLanguage: string;
	private condition: string;
	private currency: string;
	private languageToIdMap: Map<string, number> = new Map<string, number>([
		["English", 1],
		["French", 2],
		["German", 3],
		["Spanish", 4],
        ["Italian", 5],
        ["Simplifed Chinese",6],
        ["Japanese",7],
        ["Portugese",8],
        ["Russian",9],
        ["Korean",10],
        ["Traditional Chinese",11],
	])


	constructor($isFoil: boolean, $allowedOriginCountries: string[], $cardLanguage: string, $condition: string, $currency: string) {
		$isFoil? this.isFoil = "true" : this.isFoil = "false";
		this.allowedOriginCountries = $allowedOriginCountries;
		this.cardLanguage = $cardLanguage;
		this.condition = $condition;
		this.currency = $currency;
	}
	
	
    

	public get $isFoil(): boolean {
		return this.isFoil == "true" ? true : false;
	}

	public set $isFoil(value: boolean) {
		value? this.isFoil = "true" : this.isFoil = "false";
	}

	public get $allowedOriginCountries(): string[] {
		return this.allowedOriginCountries;
	}

	public set $allowedOriginCountries(value: string[]) {
		this.allowedOriginCountries = value;
	}

	public get $cardLanguage(): string {
		return this.cardLanguage;
	}

	public get $cardLanguageId(): number{
		return this.languageToIdMap.get(this.cardLanguage);
	}

	public set $cardLanguage(value: string) {
		this.cardLanguage = value;
	}

	public get $condition(): string {
		return this.condition;
	}

	public set $condition(value: string) {
		this.condition = value;
	}


	public get $currency(): string {
		return this.currency;
	}

	public set $currency(value: string) {
		this.currency = value;
	}
	
    
    
}