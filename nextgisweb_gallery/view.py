from nextgisweb.resource import ResourceScope, Widget
from .model import Gallery
from nextgisweb.pyramid import viewargs


class GalleryWidget(Widget):
    resource = Gallery
    operation = ("create", "update")
    amdmod = "@nextgisweb/gallery/editor-widget"

@viewargs(renderer="react")
def display(obj, request):
    request.resource_permission(ResourceScope.read)
    pass




def setup_pyramid(comp, config):
    pass

