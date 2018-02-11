from time import sleep
from tornado.web import Application
from tornado.ioloop import IOLoop
from tornado.httpserver import HTTPServer
from camabit import config as conf
from camabit.tasks import update_coins

_app = Application()

class WebServer(HTTPServer):
    def run(self):
        self.bind(conf.server["port"])
        self.start()
        IOLoop.current().add_callback(self.update_loop)
        IOLoop().current().start()

    async def update_loop(self):
        await update_coins.run()
        sleep(10)
        IOLoop.current().add_callback(self.update_loop)

if __name__=="__main__":
    server = WebServer(_app)
    server.run()
