export type PreciousMetalType = {
    _id: string;
    name: string;
    description: string;
    _created: string;
    _updated: string;
};

export type PreciousMetalPrice = {
    _id: string;
    type_id: string;
    type_name: string;
    buy_price: number;
    sell_price: number;
    _created: string;
    _updated: string;
};
