import { makeAutoObservable, observable } from "mobx";

import type { FocusTableStore } from "@nextgisweb/gui/focus-table";
import type { EditorStoreOptions, Operation } from "@nextgisweb/resource/type";
import type { Composite } from "@nextgisweb/resource/type/Composite";
import type { EditorStore } from "@nextgisweb/resource/type/EditorStore";

import { Layer } from "./Layer";
import type { GalleryLayer } from "./type";

export interface Value {
    title: string;
    items: GalleryLayer[];
}

export class GalleryStore
    implements EditorStore<Value>, FocusTableStore<Layer>
{
    identity = "gallery";

    operation?: Operation;
    composite?: Composite;

    isValid = true;
    dirty = false;
    layers = observable.array<Layer>([]);

    constructor({ composite, operation }: EditorStoreOptions) {
        makeAutoObservable(this, { identity: false });
        this.composite = composite;
        this.operation = operation;
    }

    load({ items }: Value) {
        this.layers.replace(items.map((v) => new Layer(this, v)));
        this.dirty = false;
    }

    dump() {
        return {
            title: "" + new Date().getTime(),
            items: this.layers.map((i) => i.json()),
        };
    }

    markDirty() {
        this.dirty = true;
    }

    get validate() {
        return true;
    }

    // FocusTableStore

    getItemChildren(item: Layer | null) {
        return item === null ? this.layers : undefined;
    }

    getItemContainer(item: Layer) {
        return item && this.layers;
    }

    getItemParent() {
        return null;
    }

    getItemError(item: Layer) {
        return item.error;
    }
}
