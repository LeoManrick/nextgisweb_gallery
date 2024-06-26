from nextgisweb.resource import Widget
from .model import Gallery

class GalleryWidget(Widget):
    resource = Gallery
    operation = ("create", "update")
    amdmod = "@nextgisweb/gallery/editor-widget"


def setup_pyramid(comp, config):
    pass
