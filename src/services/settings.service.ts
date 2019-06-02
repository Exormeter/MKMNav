import { Injectable } from '@angular/core';
import { SettingsModel } from '../models/settingsModel';
import { NativeStorage} from '@ionic-native/native-storage';
import { Platform } from 'ionic-angular';


@Injectable()
export class SettingsService{

    private defaultSettings: SettingsModel;
    public currentSettings: SettingsModel;

    private originCountries: Map<string, string> = new Map<string, string>([
        ["D", "Germany"],
        ["GB", "United Kingdom"],
        ["IT", "Italy"],
        ["FR", "France"],
        ["ES", "Spain"],
        ["AT", "Austria"],
        ["CH", "Switzerland"],
        ["SE", "Sweden"],
        ["BE", "Belgium"],
        ["BG", "Bulgaria"],
        ["HR", "Croatia"],
        ["CY", "Cyprus"],
        ["CZ", "Czech Republic"],
        ["DK", "Denmark"],
        ["EE", "Estonia"],
        ["FI", "Finland"],
        ["GR", "Greece"],
        ["HU", "Hungary"],
        ["IS", "Iceland"],
        ["IE", "Ireland"],
        ["LV", "Latvia"],
        ["LI", "Liechtenstein"],
        ["LT", "Lithuania"],
        ["LU", "Luxembourg"],
        ["MT", "Malta"],
        ["NL", "The Netherlands"],
        ["NO", "Norway"],
        ["PL", "Poland"],
        ["PT", "Portugal"],
        ["RO", "Romania"],
        ["SK", "Slovakia"],
        ["SI", "Slovenia"]
    ]);

    private cardLanguages: string[] = [
        "English",
        "French",
        "German",
        "Spanish",
        "Italian",
        "Simplifed Chinese",
        "Japanese",
        "Portugese",
        "Russian",
        "Korean",
        "Traditional Chinese"
    ];

    private originCountriesNames: string[] = [
        "All Countries",
        "Germany",
        "United Kingdom",
        "Ireland",
        "France",
        "Italy",
        "Spain",
        "The Netherlands",
        "Sweden",
        "Norway",
        "Austria",
        "Belgium",
        "Estonia",
        "Finland",
        "Bulgaria",
        "Croatia",
        "Cyprus",
        "Czech Republic",
        "Denmark",
        "Greece",
        "Hungary",
        "Iceland",
        "Latvia",
        "Liechtenstein",
        "Lithuania",
        "Luxembourg",
        "Malta",
        "Poland",
        "Portugal",
        "Romania",
        "Slovakia",
        "Slovenia",
    ];

    private currency: string[] = [
        "EUR",
        "USD",
        "GBP",
        "CHF"
    ]

	constructor(private nativeStorage: NativeStorage, private platform: Platform) {
        this.platform.ready().then(()=>{
            this.nativeStorage.getItem('defaultSettings')
            .then(
              (settings: SettingsModel) => {
                  this.defaultSettings = settings;
              },
              error => {
                  this.defaultSettings = new SettingsModel(false, ["Germany"], "English", "NM", "EUR");
              });
        });
        
    }
    
    writeNewDefaultSettingToStorage(): Promise<void>{
        return this.nativeStorage.setItem('defaultSettings', this.defaultSettings);
    }

    public setCurrentSettings(){
        this.currentSettings = new SettingsModel(this.defaultSettings.$isFoil, 
            this.defaultSettings.$allowedOriginCountries,
            this.defaultSettings.$cardLanguage,
            this.defaultSettings.$condition,
            this.defaultSettings.$currency);
    }

	public get $defaultSettings(): SettingsModel {
		return this.defaultSettings;
	}

	public set $defaultSettings(value: SettingsModel) {
		this.defaultSettings = value;
	}

	public get $currentSettings(): SettingsModel {
		return this.currentSettings;
	}

	public set $currentSettings(value: SettingsModel) {
		this.currentSettings = value;
	}

	public get $originCountries(): Map<string, string>  {
		return this.originCountries;
	}

	public set $originCountries(value: Map<string, string> ) {
		this.originCountries = value;
	}

	public get $cardLanguages(): string[]  {
		return this.cardLanguages;
	}

	public set $cardLanguages(value: string[] ) {
		this.cardLanguages = value;
    }
    
	public get $originCountriesNames(): string[]  {
		return this.originCountriesNames;
	}

	public set $originCountriesNames(value: string[] ) {
		this.originCountriesNames = value;
	}
    
	public get $currency(): string[]  {
		return this.currency;
	}

	public set $currency(value: string[] ) {
		this.currency = value;
	}
    

    
}