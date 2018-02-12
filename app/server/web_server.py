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
        IOLoop.current().add_callback(self.update_loop)
        IOLoop().current().start()

    async def update_loop(self):
        await update_coins.run()
        await sleep(5*60)
        IOLoop.current().add_callback(self.update_loop)

if __name__=="__main__":
    _app = Application(Routes)
    server = WebServer(_app)
    server.run()
