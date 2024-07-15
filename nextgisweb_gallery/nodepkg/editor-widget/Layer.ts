import { mapper, validate } from "@nextgisweb/gui/arm";
import type { ErrorResult } from "@nextgisweb/gui/arm";

import type { GalleryStore } from "./GalleryStore";
import type { GalleryLayer } from "./type";

const {
    title,
    description,
    resource_id,
    click_operation,
    item_type,
    $load: mapperLoad,
    $error: mapperError,
} = mapper<Layer, GalleryLayer>({
    validateIf: (o) => o.store.validate,
    onChange: (o) => o.store.markDirty(),
});

title.validate(
    validate.string({ minLength: 1 }),
    validate.unique((o) => o.store.layers, "title")
);

export class Layer {
    readonly store: GalleryStore;

    title = title.init("", this);
    description = description.init("", this);
    resource_id = resource_id.init(-1, this);

    click_operation = click_operation.init("display", this);
    item_type = item_type.init("card", this);

    constructor(store: GalleryStore, data: GalleryLayer) {
        this.store = store;
        mapperLoad(this, data);
    }

    json(): GalleryLayer {
        const json = {
            ...this.title.jsonPart(),
            ...this.description.jsonPart(),
            ...this.resource_id.jsonPart(),

            ...this.click_operation.jsonPart(),
            ...this.item_type.jsonPart(),
        };
        console.log(json);
        return json;
    }

    get error(): ErrorResult {
        return mapperError(this);
    }
}
