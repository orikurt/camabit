from datetime import datetime
from camabit.app.controllers.base import Base

class HomeController(Base):
    async def show(self):
        self.respond({"service": "Coins", "active": True, "date": str(datetime.now())})