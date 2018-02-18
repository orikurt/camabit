from camabit.app.controllers.home import HomeController
from camabit.app.controllers.coins import CoinsController
from camabit.app.controllers.meta import MetaController
Routes = [
    (r"/", HomeController),
    (r"/coins", CoinsController),
    (r"/coins/([\w]+)", CoinsController),
    (r"/meta", MetaController)
]