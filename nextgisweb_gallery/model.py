from nextgisweb.env import Base, _
from nextgisweb.lib import db
from nextgisweb.resource import (
    DataScope,
    Resource,
    ResourceGroup,
    Serializer,
)
from nextgisweb.resource import SerializedProperty as SP

# The Gallery class, which inherits from Base and Resource, establishing Gallery as the resource type on the system. This class contains the title, description, and resource_url fields that will store information about each instance of the Gallery resource.

class Gallery(Base, Resource):
    resource_id = db.ForeignKey()
    identity = "gallery"
    cls_display_name = _("Gallery")

    __scope__ = DataScope

    title = db.Column(db.Unicode, nullable=False)
    description = db.Column(db.Unicode)
    items = db.relationship("GalleryItem", cascade="all, delete-orphan")



# The check_parent method in the Gallery class, which determines whether a given resource can be a child of another resource (in this case, ResourceGroup).

    @classmethod
    def check_parent(cls, parent):
        return isinstance(parent, ResourceGroup)

# Serializer for the Gallery resource. Defines which Gallery resource attributes will be readable and writable via the NextGIS Web API. The serializer uses SerializedProperty to determine the access permissions for each field.

class GallerySerializer(Serializer):
    identity = Gallery.identity
    resclass = Gallery

    title = SP(read=DataScope.read, write=DataScope.write)
    description = SP(read=DataScope.read, write=DataScope.write)
    resource_url = SP(read=DataScope.read, write=DataScope.write)



class GalleryItem(Base):
    __table__name = "gallery_item"

    id = db.Column(db.Integer, primary_key=True)
    gallery_id = db.Column(db.Integer, db.ForeignKey("gallery.id"))
    item_type = db.Column(db.Enum("gallery", "webmap", "layer"), nullable=False)
    position = db.Column(db.Integer, nullable=True)

    click_operation = db.Column(db.Enum("display", "update"), nullable=False)

    title = db.Column(db.Unicode, nullable=False)
    description = db.Column(db.Unicode)

    