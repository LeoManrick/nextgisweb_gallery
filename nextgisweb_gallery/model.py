from sqlalchemy.ext.orderinglist import ordering_list

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

# Класс Gallery, который наследуется от Base и Resource, устанавливая Gallery как тип ресурса в системе. Этот класс содержит поля title, description и resource_url, которые будут хранить информацию о каждом экземпляре ресурса Gallery.

class Gallery(Base, Resource):
    identity = "Gallery"
    cls_display_name = _("Gallery")

    __scope__ = DataScope

    #поля

    title = db.Column(db.Unicode, nullable=False)
    description = db.Column(db.Unicode)
    resource_id = db.Column(db.Unicode)

# Метод check_parent в классе Gallery, который определяет, может ли данный ресурс быть дочерним по отношению к другому ресурсу (в данном случае ResourceGroup).

    @classmethod
    def check_parent(cls, parent):
        return isinstance(parent, ResourceGroup)

# Сериализатор для ресурса Gallery. определяет, какие атрибуты ресурса Gallery будут доступны для чтения и записи через API NextGIS Web. Сериализатор использует SerializedProperty для определения прав доступа к каждому полю.

class GallerySerializer(Serializer):
    identity = Gallery.identity
    resclass = Gallery

    title = SP(read=DataScope.read, write=DataScope.write)
    description = SP(read=DataScope.read, write=DataScope.write)
    resource_url = SP(read=DataScope.read, write=DataScope.write)
