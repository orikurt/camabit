export class Coin{
	id : string;
	name : string;
	symbol : string;
	rank : number;
	price_usd : number;
	price_btc : number;
	_24h_volume_usd : number;
	market_cap_usd : number;
	available_supply : number;
	total_supply : number;
	max_supply : number;
	percent_change_1h : number;
	percent_change_24h : number;
	percent_change_7d : number;
	last_updated : number;
	price_ils : number;
	_24h_volume_ils : number;
	market_cap_ils : number;

	24h_volume_usd(): number{
		return this._24h_volume_usd
	}

	24h_volume_ils(): number{
		return this._24h_volume_ils
	}	
}