from io import BytesIO
from PIL import Image
from sqlalchemy import orm
import sqlalchemy as sa
import sqlalchemy.dialects.postgresql as pg

from nextgisweb.env import Base, _
from nextgisweb.file_storage import FileObj
from nextgisweb.file_upload import FileUpload
from nextgisweb.resource import (
    DataScope,
    Resource,
    ResourceGroup,
    Serializer,
)
from nextgisweb.resource import SerializedProperty as SP


MAX_SIZE = (2000, 2000)

# The Gallery class, which inherits from Base and Resource, establishing Gallery as the resource type on the system. This class contains the title, description, and resource_url fields that will store information about each instance of the Gallery resource.


class Gallery(Base, Resource):
    identity = "gallery"
    cls_display_name = _("Gallery")

    __scope__ = DataScope

    title = sa.Column(sa.Unicode, nullable=False)
    items = orm.relationship("GalleryItem", cascade="all, delete-orphan")
    layout = sa.Column(pg.JSONB, nullable=True)

    # The check_parent method in the Gallery class, which determines whether a given resource can be a child of another resource (in this case, ResourceGroup).

    @classmethod
    def check_parent(cls, parent):
        return isinstance(parent, ResourceGroup)


# Serializer for the Gallery resource.
# Defines which Gallery resource attributes will be readable and writable via the NextGIS Web API.
# The serializer uses SerializedProperty to determine the access permissions for each field.


class _items_attr(SP):
    def getter(self, srlzr):
        return [item.serialize() for item in srlzr.obj.items]

    def setter(self, srlzr, value):
        srlzr.obj.items = []
        for item in value:
            new_item = GalleryItem()
            srlzr.obj.items.append(new_item)
            for attribute in (
                # "gallery_id",
                "item_type",
                "resource_id",
                "click_operation",
                "title",
                "description",
            ):
                setattr(new_item, attribute, item[attribute])

            if item["preview_fileobj_id"]:
                fupload = FileUpload(id=item["preview_fileobj_id"])
                with Image.open(fupload.data_path) as image:
                    width, height = image.size
                    resize = width > MAX_SIZE[0] or height > MAX_SIZE[1]
                    if image.format != "PNG" or resize:
                        if resize:
                            image.thumbnail(MAX_SIZE)
                        buf = BytesIO()
                        image.save(buf, "png", optimize=True)
                        fileobj = FileObj().from_content(buf.getvalue())
                    else:
                        fileobj = fupload.to_fileobj()
                    setattr(new_item, "preview_fileobj", fileobj)
                    setattr(new_item, "preview_fileobj_id", fileobj.id)



class GallerySerializer(Serializer):
    identity = Gallery.identity
    resclass = Gallery

    title = SP(read=DataScope.read, write=DataScope.write)
    description = SP(read=DataScope.read, write=DataScope.write)
    items = _items_attr(read=DataScope.read, write=DataScope.write)


class GalleryItem(Base):
    __tablename__ = "gallery_item"

    id = sa.Column(sa.Integer, primary_key=True)
    gallery_id = sa.Column(sa.Integer, sa.ForeignKey("gallery.id"))
    item_type = sa.Column(
        sa.Enum("gallery", "webmap", "resource", "card", name="item_type_enum"),
        nullable=False,
    )
    preview_fileobj_id = sa.Column(sa.ForeignKey(FileObj.id))
    preview_fileobj = orm.relationship(FileObj, lazy="joined")
    resource_id = sa.Column(sa.ForeignKey(Resource.id))

    click_operation = sa.Column(
        sa.Enum("display", "update", "resource", name="click_operation_enum"),
        nullable=False,
    )

    title = sa.Column(sa.Unicode, nullable=False)
    description = sa.Column(sa.Unicode)

    def serialize(self):
        return {
            "id": self.id,
            "gallery_id": self.gallery_id,
            "item_type": self.item_type,
            "preview_fileobj_id": self.preview_fileobj_id,
            "resource_id": self.resource_id,
            "click_operation": self.click_operation,
            "title": self.title,
            "description": self.description,
        }
