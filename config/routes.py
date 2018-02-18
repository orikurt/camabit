from camabit.app.controllers.home import HomeController
from camabit.app.controllers.coins import CoinsController
from camabit.app.controllers.meta import MetaController
Routes = [
    ("/", HomeController),
    ("/coins", CoinsController),
    ("/meta", MetaController)
]