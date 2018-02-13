from camabit.app.controllers.home import HomeController
from camabit.app.controllers.coins import CoinsController
Routes = [
    ("/", HomeController),
    ("/coins", CoinsController)
]