from nextgisweb.resource import Widget
from .model import Gallery
from nextgisweb.pyramid import viewargs

from nextgisweb.env import gettext


class GalleryWidget(Widget):
    resource = Gallery
    operation = ("create", "update")
    amdmod = "@nextgisweb/gallery/editor-widget"


@viewargs(renderer="react")
def display(obj, request):
    gallery_id = int(request.matchdict["id"])

    return dict(
        entrypoint="@nextgisweb/gallery/gallery-display",
        props=dict(id=gallery_id),
        title=gettext("Gallery"),
        obj=request.context,
    )


def setup_pyramid(comp, config):
    config.add_route(
        "gallery.display",
        r"/resource/{id:uint}/gallery",
    ).add_view(display)
