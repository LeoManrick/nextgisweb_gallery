import { observer } from "mobx-react-lite";
import { useMemo } from "react";

import { FocusTable, action } from "@nextgisweb/gui/focus-table";
import type { FocusTablePropsActions } from "@nextgisweb/gui/focus-table";
import { gettext } from "@nextgisweb/pyramid/i18n";
import { pickToFocusTable } from "@nextgisweb/resource/component/resource-picker";
import type {
    EditorWidgetComponent,
    EditorWidgetProps,
} from "@nextgisweb/resource/type";

import { GalleryItemWidget } from "./GalleryItemWidget";
import type { GalleryStore } from "./GalleryStore";
import { Layer } from "./Layer";
import type { GalleryLayer } from "./type";

export const EditorWidget: EditorWidgetComponent<
    EditorWidgetProps<GalleryStore>
> = observer(({ store }) => {
    const { tableActions, itemActions } = useMemo<
        FocusTablePropsActions<Layer>
    >(
        () => ({
            tableActions: [
                pickToFocusTable(
                    (res) => {
                        // TODO: handle any resource classes res.resource.cls
                        let itemType: GalleryLayer["item_type"];

                        switch (res.resource.cls) {
                            case "basemap":
                                itemType = "webmap";
                                break;
                            case "gallery":
                                itemType = "gallery";
                                break;
                            default:
                                itemType = "resource";
                        }

                        return new Layer(store, {
                            resource_id: res.resource.id,
                            title: res.resource.display_name,
                            description: res.resource.description,
                            item_type: itemType,

                            // click_operation
                        });
                    },
                    {
                        pickerOptions: {
                            // requireClass: "webmap",
                            multiple: true,
                        },
                    }
                ),
            ],
            itemActions: [action.deleteItem()],
        }),
        [store]
    );

    return (
        <FocusTable<Layer>
            store={store}
            title={(item) => item.title.value}
            tableActions={tableActions}
            itemActions={itemActions}
            renderDetail={({ item }) => <GalleryItemWidget item={item} />}
        />
    );
});

EditorWidget.title = gettext("Gallery");
EditorWidget.order = -100;
EditorWidget.displayName = "EditorWidget";
