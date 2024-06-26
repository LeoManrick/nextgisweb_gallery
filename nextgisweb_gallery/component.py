from mapscript import MS_VERSION
from nextgisweb.env import Component
from nextgisweb.lib.config import Option


class GalleryComponent(Component):
    def setup_pyramid(self, config):
        from . import view

        view.setup_pyramid(self, config)

    def sys_info(self):
        return (("Gallery", MS_VERSION),)
