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
                        return new Layer(store, {
                            resource_id: res.resource.id,
                            title: res.resource.display_name,
                            description: res.resource.description,
                            // item_type
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
            // columns={[
            //     {
            //         render: (l: Layer) => l.keyname.value,
            //         width: ["25%", "50%"],
            //     },
            // ]}
            tableActions={tableActions}
            itemActions={itemActions}
            renderDetail={({ item }) => <GalleryItemWidget item={item} />}
        />
    );
});

EditorWidget.title = gettext("Gallery");
EditorWidget.order = -100;
EditorWidget.displayName = "EditorWidget";
