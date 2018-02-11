import json
import requests

API_URL = "https://api.coinmarketcap.com/v1/"

def all_coins():
    url = "{0}ticker/?limit=10&convert=ILS".format(API_URL)
    try:
        return json.loads(requests.get(url).text)
    except Exception as e:
        print(e)
        return None

if __name__ == "__main__":
    for coin in all_coins():
        print(coin["name"])
