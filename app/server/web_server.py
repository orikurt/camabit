from tornado.web import Application
from tornado.ioloop import IOLoop
from tornado.httpserver import HTTPServer
from ... import config as conf

class WebServer():
    def __init__(self):
        self.app = Application()
        self.server = HTTPServer(app)

    def start(self):
        self.server.bind(conf.server["port"])
        self.server.start(0)
        IOLoop().current().start()
