import json
from tornado.httpclient import AsyncHTTPClient
from tornado.gen import Task

API_URL = "https://api.coinmarketcap.com/v1/"
http_client = AsyncHTTPClient()

async def all_coins():
    url = "{0}ticker/?limit=0&convert=ILS".format(API_URL)
    try:
        print("fetching")
        coins = await Task(http_client.fetch, url)
        print("fetched {} bytes".format(len(coins.body)))
        coins = coins.body.decode("utf8")
        return json.loads(coins)
    except Exception as e:
        print(e)
        return None

async def global_meta():
    url = "{0}global/?convert=ILS".format(API_URL)
    try:
        global_meta = await Task(http_client.fetch, url)
        global_meta = global_meta.body.decode("utf8")
        print("global metadata {}".format(global_meta))
        return json.loads(global_meta)
    except Exception as e:
        print(e)
        return None    