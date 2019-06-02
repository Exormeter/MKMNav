export interface ScryfallCardResult{
    object: string;
    id: string;
    multiverse_ids: number[];
    mtgo_id: number;
    all_parts: AllParts[];
    mtgo_foil_id: 53156;
    name: string;
    foreign_name: string;
    uri: string;
    scryfall_uri: string;
    layout: string;
    highres_image: boolean;
    image_uris: ImageUris;
    cmc: number;
    type_line: string;
    oracle_text: string;
    mana_cost: string;
    colors: string[];
    color_identity: string[];
    card_faces: CardFace[];
    legalities: Legalities;
    reserved: boolean;
    reprint: boolean;
    set: string;
    set_name: string;
    set_uri: string;
    set_search_uri: string;
    scryfall_set_uri: string;
    rulings_uri: string;
    prints_search_uri: string;
    collector_number: number;
    digital: boolean;
    rarity: string;
    illustration_id: string;
    artist: string;
    frame: number;
    full_art: boolean;
    border_color: string;
    timeshifted: boolean;
    colorshifted: boolean;
    futureshifted: boolean;
    edhrec_rank: number;
    tix: number;
    related_uris: RelatedUris;
    purchase_uris: PurchaseUris;
}

export interface ImageUris{
    small: string;
    normal: string;
    large: string;
    png: string;
    art_crop: string;
    border_crop: string;
};

export interface Legalities{
    standard: string;
    frontier: string;
    modern: string;
    pauper: string;
    legacy: string;
    penny: string;
    vintage: string;
    duel: string;
    commander: string;
    "1v1": string;
    future: string;
};

export interface RelatedUris{
    gatherer: string;
    tcgplayer_decks: string;
    edhrec: string;
    mtgtop8: string;
};

export interface PurchaseUris{
    amazon: string;
    ebay: string;
    tcgplayer: string;
    magiccardmarket: string;
    cardhoarder: string;
    card_kingdom: string;
    mtgo_traders: string;
    coolstuffinc: string;
}

export interface CardFace{
    object: string;
    name: string;
    mana_cost: string;
    type_line: string;
    oracle_text: string;
    colors: string[];
    power: number;
    toughness: number;
    flavor_text: string;
    illustration_id: string;
    image_uris: ImageUris;
};

export interface AllParts{
    object: string,
    id: string,
    name: string,
    uri: string,
}