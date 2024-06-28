from nextgisweb.env import Base, _
from nextgisweb.lib import db
from nextgisweb.resource import (
    DataScope,
    Resource,
    ResourceGroup,
    ResourceScope,
    Serializer,
)
from nextgisweb.resource import SerializedProperty as SP
from sqlalchemy.ext.orderinglist import ordering_list

# The Gallery class, which inherits from Base and Resource, establishing Gallery as the resource type on the system. This class contains the title, description, and resource_url fields that will store information about each instance of the Gallery resource.

class Gallery(Base, Resource):
    identity = "gallery"
    cls_display_name = _("Gallery")

    __scope__ = DataScope

    #Fields (Columns)

    title = db.Column(db.Unicode, nullable=False)
    description = db.Column(db.Unicode)
    resource_id = db.Column(db.Unicode)

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
