import { Injectable } from '@angular/core';
import { SettingsService } from './settings.service';


@Injectable()

export class NumberFormatter{


    private eurInUSD: number = 1.15;
    private eurInGBP: number = 0.89;
    private eurInCHF: number = 1.15;
    
    constructor(private settings: SettingsService){
    }

    public formatNumber(price: number): string{

        switch(this.settings.$defaultSettings.$currency){

            case "USD":
                price = price * this.eurInUSD;
                break;
            
            case "CHF":
                price = price * this.eurInCHF;
                break;

            case "GBP": 
                price = price * this.eurInGBP;
                break;
        }

        let cents: number;
        let euros: number;
        let centString: string;

        cents = Math.trunc((price % 1) * 100);

        euros = Math.trunc(price);


        if(cents == 0){
            centString = "00";
        }
        else if(cents < 10){
            centString = "0" + cents;
        }
        else{
            centString = "" + cents;
        }

        switch(this.settings.$defaultSettings.$currency){

            case "USD":
                return euros + "." + centString + " $";
            
            case "CHF":
                return euros + "." + centString + " CHF";

            case "GBP": 
                return euros + "." + centString + " £";

            default:
                return euros + "." + centString + " €";
        }
    }
}