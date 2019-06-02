import { Injectable } from "@angular/core";
import { ViewSetPage } from "../pages/view-set/view-set";

@Injectable()

export class ListViewSettings{
  

    private listOrder: string = "Descending";

    public listViewActive: boolean = true;
    public listGalleryActive: boolean = false;

    private viewSetPage: ViewSetPage;

    public sortedByAlphabet: boolean = true;
    public sortedByRarity: boolean = true;
    public sortedByPrice: boolean = false;

    constructor(){
        
    }
    public get $listOrder(): string{
        return this.listOrder;
    }

    public set $listOrder(listOrder: string){
        this.listOrder = listOrder;
    }

    public setPageController(viewSetPage: ViewSetPage){
        this.viewSetPage = viewSetPage;
    }

    changeToListView(){
        this.listViewActive = true;
        this.listGalleryActive = false;
        this.viewSetPage.prepareListView();
    }

    changeToGalleryView(){
        this.viewSetPage.prepareGalleryView().then(()=>{
            this.listViewActive = false;
            this.listGalleryActive = true;
        });
    }

    chooseSortingOrder(event: any){
        this.listOrder = event.value;
        this.viewSetPage.sortList();
    }
    
    
    sortByAlphabet(){
        this.sortedByAlphabet = false;
        this.sortedByPrice = true;
        this.sortedByRarity = true;
        this.viewSetPage.sortList();
    }
    
    sortByPrice(){
        this.sortedByAlphabet = true;
        this.sortedByPrice = false;
        this.sortedByRarity = true;
        this.viewSetPage.sortList();
    }

    sortByRarity(){
        this.sortedByAlphabet = true;
        this.sortedByPrice = true;
        this.sortedByRarity = false;
        this.viewSetPage.sortList();
    }

    public get $sortedByAlphabet(): boolean{
        return !this.sortedByAlphabet;
    }

    public get $sortedByPrice(): boolean{
        return !this.sortedByPrice;
    }

    public get $sortedByRarity(): boolean{
        return !this.sortedByRarity;
    }

    
}
