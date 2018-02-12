from tornado.web import RequestHandler, HTTPError

class Base(RequestHandler):

    async def get(self, action="show"):
        if not hasattr(self, str(action)):
            raise HTTPError(404, "No route found for {}".format(action))
        else:
            handler = getattr(self, str(action))
            await handler()

    def respond(self, data, status=200):
        self.set_status(status)
        self.write(data)