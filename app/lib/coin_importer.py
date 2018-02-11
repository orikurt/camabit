import requests
import json

API_URL = "https://api.coinmarketcap.com/v1/"

def all_coins(symbol=""):
    url = "{0}ticker/{1}/?convert=ILS".format(API_URL, symbol)
    try:
        return json.loads(requests.get(url).text)
    except Exception as e:
        print(e)
        return None

if __name__ == "__main__":
    for coin in all_coins():
        print(coin["name"])
