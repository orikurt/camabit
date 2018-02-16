import os
from tornado.gen import sleep
from tornado.web import Application
from tornado.ioloop import IOLoop
from tornado.httpserver import HTTPServer
from camabit import conf
from camabit.tasks import update_coins
from camabit.config.routes import Routes

class WebServer(HTTPServer):
    def run(self):
        self.bind(conf.server["port"])
        self.start()
        IOLoop.current().spawn_callback(self.update_loop)
        IOLoop().current().start()

    async def update_loop(self):
        await update_coins.run()
        await sleep(5*60)
        IOLoop.current().spawn_callback(self.update_loop)

if __name__=="__main__":
    ENV = os.getenv("ENV", "development")
    SETTINGS = {
        'name': "Coin Service",
        'debug': ENV == "development",
        'autorelaod': ENV == "development",
        'cookie_secret': conf.server["cookieSecret"]
    }    

    _app = Application(Routes, SETTINGS)
    server = WebServer(_app)
    print("Starting server on env {}".format(ENV))
    server.run()
