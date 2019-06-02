import { Injectable } from '@angular/core';
import { ArticleAndCardContainer } from '../models/articleAndCardContainer';

@Injectable()
export class TradeListService{

    public tradeList:Array<ArticleAndCardContainer> = new Array<ArticleAndCardContainer>();
    private itemCount: number = 0;
    private totalSum: number = 0;
    

    public getItemCount(): number{
        return this.itemCount;
    }

    public addItemToList(item: ArticleAndCardContainer){
        this.tradeList.push(item);
        this.itemCount++;
        this.totalSum += item.$article.price;
    }

    public clearList(){
        this.tradeList = [];
        this.itemCount = 0;
        this.totalSum = 0;
    }

    public removeItem(index: number){
        this.itemCount--;
        this.totalSum -= this.tradeList[index].$article.price;
        this.tradeList.splice(index, 1);
        
    }

    public getTotalSum(): number{
        return this.totalSum;
    }
}