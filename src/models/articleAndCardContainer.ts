import { Article } from "./mkmApiResults/article.model";
import { ScryfallCardResult } from "./scryfallResults/scryfallCardResult.model";


export class ArticleAndCardContainer{

    private article: Article;
    private scryfallCard: ScryfallCardResult;
    

	constructor($article: Article, $card: ScryfallCardResult) {
		this.article = $article;
		this.scryfallCard = $card;
	}
    

	public get $article(): Article {
		return this.article;
	}

	public set $article(value: Article) {
		this.article = value;
	}

	public get $mtgApiCard(): ScryfallCardResult {
		return this.scryfallCard;
	}

	public set $mtgApiCard(value: ScryfallCardResult) {
		this.scryfallCard = value;
	}
    
}