# from nextgisweb.resource import DataScope
from io import BytesIO
from typing_extensions import Annotated
from msgspec import Meta

from PIL import Image
from pyramid.response import Response

from nextgisweb.file_storage import FileObj


ImageID = Annotated[int, Meta(description="Image ID")]
ImageSize = Annotated[str, Meta(description="Image size separated by `x`")]


def image(request, id: ImageID, *, size: ImageSize = None):
    # request.resource_permission(DataScope.read)
    obj = FileObj.filter_by(id=id).one_or_none()
    image = Image.open(obj.filename())
    ext = image.format

    if "size" in request.GET:
        image.thumbnail(list(map(int, request.GET["size"].split("x"))), Image.LANCZOS)

    buf = BytesIO()
    image.save(buf, ext)
    buf.seek(0)

    return Response(body_file=buf, content_type="image/png")


def setup_pyramid(comp, config):
    config.add_route(
        "gallery.preview",
        "/api/gallery/image/{id}",
        types=dict(id=ImageID),
        get=image,
        request_method="GET"
    )
