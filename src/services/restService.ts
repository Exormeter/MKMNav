import * as CryptoJS from 'crypto-js/crypto-js';
import { Injectable } from '@angular/core';
import { URLSearchParams, Request, RequestOptions, Headers, RequestMethod, Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/switchMap';
import {ErrorObservable} from "rxjs/observable/ErrorObservable";
import { MetaProduct } from '../models/mkmApiResults/metaproduct.model';
import { Article } from '../models/mkmApiResults/article.model';
import { ScryfallCardResult } from '../models/scryfallResults/scryfallCardResult.model';
import { Product } from '../models/mkmApiResults/product.model';
import { ExpansionSet } from '../models/mkmApiResults/expansion.model';
import { CacheService } from 'ionic-cache';


@Injectable()
export class RestService {

    private baseURL = "https://api.cardmarket.com/ws/v2.0/output.json/";
    private appToken: string = "";
    private appSecret: string = "";
    private oauth_signature_method: string = "HMAC-SHA1";
    private oauth_version: string ="1.0";
    private lastUsedMTGApiResult: ScryfallCardResult;

    constructor(public http: Http, private cache: CacheService){

    }

    getCardByNameScryfall(name: string): Observable<ScryfallCardResult[]>{
        let url = "https://api.scryfall.com/cards/search?q=%2B%2B%21%22" + name + "%22";
        let response: Observable<any> = this.http.get(url)
            .map(response => response.json().data as ScryfallCardResult[])
        return response;
    }
    
    getExpansions(): Observable<ExpansionSet[]>{
        let url = this.baseURL + "games/1/expansions";
        let nonce: string = this.generateNonce(13);
        let timestamp: number = Date.now();
        let signature: string = this.calculateSignatur(url, nonce, timestamp);
        let headerString: string = this.concatHeaderFields(url, nonce, timestamp, signature);
        
        let requestOptions = new RequestOptions();
        requestOptions.url = url;
        requestOptions.method = RequestMethod.Get;
        requestOptions.headers = new Headers();
        requestOptions.headers.set("Authorization", headerString);
        let request = new Request(requestOptions);

        let expansions: Observable<any> = this.http.request(request)
            .map(response => response.json().expansion as ExpansionSet[])

        return expansions;
    }

    getAllSinglesInExpansion(expensionID: number): Observable<Product[]>{
        let url = this.baseURL + "expansions/" + expensionID + "/singles";
        let nonce: string = this.generateNonce(13);
        let timestamp: number = Date.now();
        let signature: string = this.calculateSignatur(url, nonce, timestamp);
        let headerString: string = this.concatHeaderFields(url, nonce, timestamp, signature);
        
        let requestOptions = new RequestOptions();
        requestOptions.url = url;
        requestOptions.method = RequestMethod.Get;
        requestOptions.headers = new Headers();
        requestOptions.headers.set("Authorization", headerString);
        let request = new Request(requestOptions);

        let expansions: Observable<any> = this.http.request(request)
            .map(response => response.json().single as Product[])
        return expansions;
    }

    getProductsById(id: number): Observable<Product>{
        let url: string = this.baseURL + "products/" + id;
        let cacheKey = url;
        let nonce: string = this.generateNonce(13);
        let timestamp: number = Date.now();
        let signature: string = this.calculateSignatur(url, nonce, timestamp);
        let headerString: string = this.concatHeaderFields(url, nonce, timestamp, signature);
        
        let requestOptions = new RequestOptions();
        requestOptions.url = url;
        requestOptions.method = RequestMethod.Get;
        requestOptions.headers = new Headers();
        requestOptions.headers.set("Authorization", headerString);
        let request = new Request(requestOptions);
        let product: Observable<any> = this.http.request(request)
        return this.cache.loadFromObservable(cacheKey, product).map(response => response.json().product as Product);
    }

    getArticleById(id: number): Observable<Article[]> {
        let url: string = this.baseURL + "articles/" + id + "?start=0&maxResults=500&isFoil=false";
        let nonce: string = this.generateNonce(13);
        let timestamp: number = Date.now();
        let signature: string = this.calculateSignatur(url, nonce, timestamp);
        let headerString: string = this.concatHeaderFields(this.baseURL + "articles/" + id, nonce, timestamp, signature);
        
        let requestOptions = new RequestOptions();
        requestOptions.url = url;
        requestOptions.method = RequestMethod.Get;
        requestOptions.headers = new Headers();
        requestOptions.headers.set("Authorization", headerString);
        let request = new Request(requestOptions);
        let response: Observable<any> = this.http.request(request)
            .map(response => {
                if(response.status == 200 || response.status == 206) { 
                    return response.json().article as Article[];
                }
            });
        return response;
    }

    getArticleByIdFoil(id: number): Observable<Article[]> {
        let url: string = this.baseURL + "articles/" + id + "?start=0&maxResults=500&isFoil=true";
        let nonce: string = this.generateNonce(13);
        let timestamp: number = Date.now();
        let signature: string = this.calculateSignatur(url, nonce, timestamp);
        let headerString: string = this.concatHeaderFields(this.baseURL + "articles/" + id, nonce, timestamp, signature);
        
        let requestOptions = new RequestOptions();
        requestOptions.url = url;
        requestOptions.method = RequestMethod.Get;
        requestOptions.headers = new Headers();
        requestOptions.headers.set("Authorization", headerString);
        let request = new Request(requestOptions);
        let response: Observable<any> = this.http.request(request)
            .map(response => {
                if(response.status == 200 || response.status == 206) { 
                    return response.json().article as Article[];
                }
            });
        return response;
    }

    getArticleByIdFoilAndNonFoil(id: number): Observable<any>{
        return Observable.forkJoin([
            this.getArticleById(id),
            this.getArticleByIdFoil(id)
        ]).map(response => {
            if(response[0] == undefined){
                return response[1];
            }
            else if(response[1] == undefined){
                return response[0];
            }
            return response[0].concat(response[1]);
        });
    }


    getCardsSearchByNameMKM(scryfallCardResult: ScryfallCardResult, exact: boolean): Observable<MetaProduct> {
        this.lastUsedMTGApiResult = scryfallCardResult;
        let url: string = this.baseURL + "metaproducts/find?search=" + scryfallCardResult.name + "&exact=" + exact;
        let nonce: string = this.generateNonce(13);
        let timestamp: number = Date.now();
        let signature: string = this.calculateSignatur(url, nonce, timestamp);
        let headerString: string = this.concatHeaderFields(this.baseURL + "metaproducts/find", nonce, timestamp, signature);
        
        let requestOptions = new RequestOptions();
        requestOptions.url = url;
        requestOptions.method = RequestMethod.Get;
        requestOptions.headers = new Headers();
        requestOptions.headers.set("Authorization", headerString);
        let request = new Request(requestOptions);
        let response: Observable<any> = this.http.request(request)
            .map(response => {
                return response.json().metaproduct[0] as MetaProduct
            })
            .catch(res => this.errorHandlerCardNames(res));
        return response;
    }



    calculateSignatur(url: string, nonce: string, timestamp: number): string{
        let parameterString: string = "";
        let signingString: string = "";
        let urlBase: string = url.substring(0,url.indexOf('?'));
        if(urlBase == ""){
            urlBase = url;
        }
        let rawURL: string = "GET&" + encodeURIComponent(urlBase) + "&";
        var parameterPairs = {
            'oauth_consumer_key': this.appToken,
            'oauth_nonce': nonce,
            'oauth_signature_method': this.oauth_signature_method,
            'oauth_timestamp': timestamp,
            'oauth_token': '',
            'oauth_version': this.oauth_version,
        }
        
        //Zieht alle Query Paramter aus der Url und packt sie in das parameterPairs Objekt
        //Kartenname müssen URIEncoded werden
        let queryParamsString: string = url.substr(url.indexOf('?') + 1);
        if( queryParamsString != urlBase){

            let queryParams: URLSearchParams = new URLSearchParams(queryParamsString);
            for (var entries of Array.from(queryParams.paramsMap)) {
                parameterPairs[entries[0]] = encodeURIComponent(entries[1][0]).replace("'", "%27");;
            }

        }

        //Ordnet alle Parameter Alphabetisch nach Key
        const parameterPairsOrdnerd = {};
        Object.keys(parameterPairs).sort().forEach(function(key) {
        parameterPairsOrdnerd[key] = parameterPairs[key];
        });
        
        //Bildet den Parameterstring, Werte werden mit '&' concarniert
        for (var key in parameterPairsOrdnerd) {
            if (parameterPairsOrdnerd.hasOwnProperty(key)) {
                parameterString += key + "=" + parameterPairsOrdnerd[key] + "&"
            }
        }

        //Schneidet überflüssiges '&' am Ende des Parameterstrings ab
        parameterString = parameterString.substring(0, parameterString.length - 1);

        signingString = rawURL + encodeURIComponent(parameterString);
        
        
        let signingKey = encodeURIComponent(this.appSecret) + "&"
        let signatur: string = CryptoJS.HmacSHA1(signingString, signingKey).toString(CryptoJS.enc.Base64);
        return signatur;
    }

    concatHeaderFields(realm: string, nonce: string, timestamp: number, signatur: string): string{
        let realmEncoded = encodeURIComponent(realm)
        let header: string = "OAuth realm=\"" + realmEncoded + "\","
                             +"oauth_consumer_key=\"" + this.appToken + "\","
                             +"oauth_token=\"" + '' + "\","
                             +"oauth_signature_method=\"" + this.oauth_signature_method + "\","
                             +"oauth_timestamp=\"" + timestamp + "\","
                             +"oauth_nonce=\"" + nonce + "\","
                             +"oauth_version=\"" + this.oauth_version + "\","
                             +"oauth_signature=\"" + signatur + "\"";
                             
        ;

        return header;
    }

    generateNonce(length: number): string{
        let nonce: string = "";
        let possible: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (var i = 0; i < 13; i++)
            nonce += possible.charAt(Math.floor(Math.random() * possible.length));

        return nonce;
    }

    private errorHandlerCardNames(errorResponse: Response): Observable<any> | ErrorObservable {
        console.log(errorResponse);
        var regex = /Ae/
        this.lastUsedMTGApiResult.name = this.lastUsedMTGApiResult.name.replace(regex, "Æ");

        if(this.lastUsedMTGApiResult.layout == "meld"){
            return this.getCardsSearchByNameMKM(this.lastUsedMTGApiResult, false);
        }
        if(this.lastUsedMTGApiResult.name.indexOf("//") >= 0){
            this.lastUsedMTGApiResult.name =  this.lastUsedMTGApiResult.name.replace('//', '/');
            return this.getCardsSearchByNameMKM(this.lastUsedMTGApiResult, true);
        }
        if(this.lastUsedMTGApiResult.name.indexOf("Æ") == -1){
            return new ErrorObservable("No Æ found");
        }
        
        return this.getCardsSearchByNameMKM(this.lastUsedMTGApiResult, true);
    }
}




