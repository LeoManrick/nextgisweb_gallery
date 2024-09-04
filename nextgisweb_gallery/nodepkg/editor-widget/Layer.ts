import { observable } from "mobx";

import type { UploaderMeta } from "@nextgisweb/file-upload/file-uploader";
import { mapper, validate } from "@nextgisweb/gui/arm";
import type { ErrorResult } from "@nextgisweb/gui/arm";
import { routeURL } from "@nextgisweb/pyramid/api";

import type { GalleryStore } from "./GalleryStore";
import type { GalleryLayer } from "./type";

const {
    id,
    title,
    gallery_id,
    description,
    resource_id,
    click_operation,
    preview_fileobj_id,
    item_type,
    $load: mapperLoad,
    $error: mapperError,
    $dump: mapperDump,
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
    id = id.init(-1, this);
    gallery_id = gallery_id.init(-1, this);

    preview_fileobj_id = preview_fileobj_id.init("", this);
    imageUpdated?: UploaderMeta | null;

    click_operation = click_operation.init("display", this);
    item_type = item_type.init("resource", this);

    @observable accessor imageExisting: Blob | null = null;

    constructor(store: GalleryStore, data: GalleryLayer) {
        this.store = store;
        mapperLoad(this, data);
        this._loadImage();
    }

    private _loadImage() {
        this.imageUpdated = undefined;

        if (
            !this.id.value ||
            !this.gallery_id.value ||
            !this.preview_fileobj_id.value
        ) {
            return;
        }

        this.imageExisting = null;
        fetch(
            routeURL("gallery.preview", {
                id: Number(this.preview_fileobj_id.value),
            })
        ).then((resp) => {
            resp.blob().then((data) => {
                this.imageExisting = data;
            });
        });
    }

    json(): GalleryLayer {
        const { resource_id, title, preview_fileobj_id, ...rest } =
            mapperDump(this);

        if (
            resource_id === undefined ||
            title === undefined ||
            preview_fileobj_id === undefined
        ) {
            throw new Error("Required parameters are not set");
        }

        const result: GalleryLayer = {
            preview_fileobj_id,
            resource_id,
            title,
            ...rest,
        };
        return result;
    }

    get error(): ErrorResult {
        return mapperError(this);
    }
}
