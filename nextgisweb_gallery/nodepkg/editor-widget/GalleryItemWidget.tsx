import { observer } from "mobx-react-lite";
import { useState } from "react";

import { ImageUploader } from "@nextgisweb/file-upload/image-uploader";
import { InputValue } from "@nextgisweb/gui/antd";
import { LotMV } from "@nextgisweb/gui/arm";
import { Area, Lot } from "@nextgisweb/gui/mayout";
import { gettext } from "@nextgisweb/pyramid/i18n";
import { ResourceSelect } from "@nextgisweb/resource/component";

import type { Layer } from "./Layer";

export const GalleryItemWidget = observer<{
    item: Layer;
}>(function GroupComponentBase({ item }) {
    const [image, setImage] = useState<string>();
    if (item.imageExisting) {
        const reader = new FileReader();
        reader.onloadend = () => {
            setImage(reader.result as string);
        };
        reader.readAsDataURL(item.imageExisting);
    }

    return (
        <Area pad>
            <LotMV
                label={gettext("Title")}
                value={item.title}
                component={InputValue}
            />
            <LotMV
                label={gettext("Description")}
                value={item.description}
                component={InputValue}
            />
            <Lot label={gettext("Preview")}>
                <ImageUploader
                    image={image}
                    onChange={(value) => {
                        item.preview_fileobj_id.value = value
                            ? Array.isArray(value)
                                ? value[0].id
                                : value.id
                            : undefined;
                    }}
                    onClean={() => {
                        item.preview_fileobj_id.value = undefined;
                    }}
                />
            </Lot>
            <LotMV
                label={gettext("Resource")}
                value={item.resource_id}
                component={ResourceSelect}
                props={{ readOnly: true }}
            />
        </Area>
    );
});

GalleryItemWidget.displayName = "GalleryItemWidget";
