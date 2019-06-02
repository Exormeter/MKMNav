import { AutoCompleteService } from 'ionic2-auto-complete';
import { Http } from '@angular/http';
import { Injectable } from "@angular/core";
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/toArray'
import { Observable } from '../../node_modules/rxjs';

@Injectable()
export class SearchAutocompleteService implements AutoCompleteService {
    labelAttribute = "name";
    private language: string = "en";
    private foreiginSearchActive: boolean = false;
    constructor(private http:Http) {

    }
  
    getResults(keyword:string) {
        if(keyword.length <= 2){
            return []
        }
        if(this.foreiginSearchActive){
            return this.foreignSearch(keyword)
        }
        else{
            return this.englishSearch(keyword)
        }
    }

    setLanguage(language: string){
        if(language == "d"){
            this.language = "de";
            this.foreiginSearchActive = true;
        }
        else if(language == "gb"){
            this.language = "en";
            this.foreiginSearchActive = false;
        }
        else{
            this.language = language;
            this.foreiginSearchActive = true;
        }
        
        
    }

    foreignSearch(keyword: string): Observable<any>{
        return this.http.get("https://api.scryfall.com/cards/search?q=lang%3A" + this.language + "+name%3A" + keyword)
            .map( result => result.json().data)
            .flatMap(result => result)
            .filter( (card: any) => {
                if(card.printed_name != undefined){
                    return card.printed_name.startsWith(keyword)
                }
                else{
                    return false
                }
            })            
            .map( (card: any) => {

                return {name: card.printed_name,
                        searchName: card.name
                    }
            })
            .toArray()
    }


    englishSearch(keyword: string): Observable<any>{ 
        return this.http.get("https://api.scryfall.com/cards/autocomplete?q="+keyword)
            .map( result =>{
                var cardNames = result.json().data;
                var cardNamesObjects =[];
                for(var i = 0; i < cardNames.length; i++){
                    cardNamesObjects.push({name: cardNames[i],
                                           searchName: cardNames[i] 
                                        });
                }
                return cardNamesObjects;
            });
    }
}