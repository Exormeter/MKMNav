import { Component, ViewChild } from '@angular/core';
import * as FuzzySet from 'fuzzyset.js';
import { IonicPage, NavController, NavParams, Slides, Platform, ToastController, Toast } from 'ionic-angular';
import { RestService } from '../../services/restService';
import { Article, HoldPlace } from '../../models/mkmApiResults/article.model';
import { SettingsService } from '../../services/settings.service';
import { TradeListService } from '../../services/tradeList.service';
import { ArticleAndCardContainer } from '../../models/articleAndCardContainer';
import { ScryfallCardResult } from '../../models/scryfallResults/scryfallCardResult.model';
import { ProductDetails, MetaProduct } from '../../models/mkmApiResults/metaproduct.model';
import { NumberFormatter} from '../../services/numberFormatter.service'
import { Product } from '../../models/mkmApiResults/product.model';
/**
 * Generated class for the ShowCardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-show-card',
  templateUrl: 'show-card.html',
})
export class ShowCardPage {

  @ViewChild(Slides) slides: Slides;

  private cardArticleList: Array<Article> = new Array<Article>();
  private currentShownArticle: Array<Article> = [new HoldPlace];
  private currentProduct: Product;
  private searchedCard: ScryfallCardResult;
  private toastNotFound: Toast;
  private itemExpandHeight: number = 210;
  private imageURLfront: string = undefined;
  private imageURLback: string = undefined;


  constructor(public toastCtrl: ToastController, public platform: Platform, public navCtrl: NavController, private navParams: NavParams, 
              private restService: RestService, public settingsService: SettingsService, 
              private tradeListService: TradeListService, public numberFormat: NumberFormatter) {
  }

  ionViewWillEnter() {
    
  }

  ionViewDidEnter(){
    if(this.searchedCard === undefined || this.searchedCard.id != this.navParams.get('card').productId){
      this.searchedCard = this.navParams.get('card');
      if(this.searchedCard.layout == "normal"){
        this.imageURLfront = this.searchedCard.image_uris.normal;
      }
      else{
        this.imageURLfront = this.searchedCard.card_faces[0].image_uris.normal;
        this.imageURLback = this.searchedCard.card_faces[1].image_uris.normal;
      }
      

      this.loadCardAndArticle();
    };
  }

  settingsChange(){
    this.searchCheapestCard();
  }

  searchCheapestCard(){
    let indexCheapest: number;
    let articleFound: boolean = this.cardArticleList.some((article, index) =>{
      let articleCountry: string = this.settingsService.$originCountries.get(article.seller.address.country);
      if( article.isFoil == this.settingsService.$currentSettings.$isFoil && article.condition == this.settingsService.$currentSettings.$condition && article.language.idLanguage == this.settingsService.$currentSettings.$cardLanguageId ){
        if(this.settingsService.$currentSettings.$allowedOriginCountries.indexOf(articleCountry) != -1 || this.settingsService.$currentSettings.$allowedOriginCountries.indexOf("All Countries") != -1){
          indexCheapest = index;
          return true;
        }
      }
    });

    if(!articleFound){
      setTimeout(()=>{
        this.toastNotFound = this.toastCtrl.create({
          message: 'No card was found',
          duration: 2000,
          position: 'top'
      });
        this.toastNotFound.present();
      }, 400);
    }
    else{
      this.prepareSlides(indexCheapest);
    }
  }

  addToList(){
    let currentViewedArticle: Article = this.currentShownArticle[this.slides.getActiveIndex()];
    if(currentViewedArticle != undefined){
      this.tradeListService.addItemToList(new ArticleAndCardContainer(currentViewedArticle, this.searchedCard));
    }
  }
  


  private loadCardAndArticle(){
    this.restService.getCardsSearchByNameMKM(this.searchedCard, true).subscribe(metaProduct =>{
      let productId = this.matchCardmarketToScryfall(metaProduct);
      this.restService.getArticleByIdFoilAndNonFoil(productId).subscribe(article =>{
        this.cardArticleList = article;
        this.searchCheapestCard();
      });
      this.restService.getProductsById(productId).subscribe(product =>{
        this.currentProduct = product;
      })
      
    });
  }

  private prepareSlides(index: number){
    this.currentShownArticle = [];
    let slideTo: number;
    let startSlice: number;
    let endSlice: number;
    index < 10 ? startSlice = 0 : startSlice = index - 10;
    index > this.cardArticleList.length + 10 ? endSlice = this.cardArticleList.length : endSlice = index + 10;
    index < 10 ? slideTo = index : slideTo = 10; 
    this.currentShownArticle = this.cardArticleList.slice(startSlice, endSlice);
    setTimeout(()=>{
      this.slides.slideTo(1, 0);
      setTimeout(()=>{
        this.slides.slideTo(slideTo, 1000);
      }, 100)
      
    }, 200);
  }

  prepareNextSlide(){
    let lastElement = this.currentShownArticle[this.slides.getActiveIndex()]; 
    if(lastElement == undefined){
      return;
    }
    this.cardArticleList.some((article, index)=>{
      if(lastElement.idArticle == article.idArticle){
        if(index + 2 > this.cardArticleList.length){
          return true;
        }
        else{
          this.currentShownArticle.push(this.cardArticleList[index + 2]);
          this.slides.update();
          return true;
        }
      }
    });
  }

  matchCardmarketToScryfall(metaProduct: MetaProduct): number{
    let productId: number;

    switch(this.searchedCard.set_name){

      case "Limited Edition Alpha":
        this.searchedCard.set_name = "Alpha";
        break;

      case "Limited Edition Beta":
        this.searchedCard.set_name = "Beta";
        break;
    }


    let setVersions: Map<string, ProductDetails> = new Map<string, ProductDetails>() ;
    metaProduct.product.forEach((product: ProductDetails)=>{
      setVersions.set(product.expansionName, product);
    });
    if(setVersions.has(this.searchedCard.set_name)){
      productId = setVersions.get(this.searchedCard.set_name).idProduct;
    }
    else{
      let setNames = Array.from( setVersions.keys());
      let fuzzyset = FuzzySet(setNames);
      let fuzzyResult = fuzzyset.get(this.searchedCard.set_name);
      if(fuzzyResult != undefined){
        let setName = fuzzyResult[0][1];
        productId = setVersions.get(setName).idProduct;
      }
      
    }
    return productId;
  }
}


