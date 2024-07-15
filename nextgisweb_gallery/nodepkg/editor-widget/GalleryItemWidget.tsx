import { observer } from "mobx-react-lite";

import { InputValue } from "@nextgisweb/gui/antd";
import { LotMV } from "@nextgisweb/gui/arm";
import { Area } from "@nextgisweb/gui/mayout";
import { gettext } from "@nextgisweb/pyramid/i18n";
import { ResourceSelect } from "@nextgisweb/resource/component";

import type { Layer } from "./Layer";

export const GalleryItemWidget = observer<{
    item: Layer;
}>(function GroupComponentBase({ item }) {
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
            <LotMV
                label={gettext("Resource")}
                value={item.resource_id}
                component={ResourceSelect}
                // props={{ readOnly: true }}
            />
        </Area>
    );
});

GalleryItemWidget.displayName = "GalleryItemWidget";
