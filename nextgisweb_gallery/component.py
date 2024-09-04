from nextgisweb.env import Component

class GalleryComponent(Component):

    def initialize(self):
        super(GalleryComponent, self).initialize()

    def configure(self):
        super(GalleryComponent, self).configure()

    def setup_pyramid(self, config):
        from . import view, api  

        api.setup_pyramid(self, config)
        view.setup_pyramid(self, config)