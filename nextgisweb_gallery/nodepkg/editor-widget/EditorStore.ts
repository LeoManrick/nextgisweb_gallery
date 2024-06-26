import { makeAutoObservable, runInAction, toJS } from "mobx";

import { EditorStoreOptions, Operation } from "@nextgisweb/resource/type";
import { Composite } from "@nextgisweb/resource/type/Composite";

export class EditorStore {
    identity = "resource";

    operation?: Operation;
    composite?: Composite;


    constructor({ composite, operation }: EditorStoreOptions) {
        makeAutoObservable(this, { identity: false });
        this.composite = composite;
        this.operation = operation;

    }

    load(value: Value) {
        
    }

    dump() {
        return toJS({});
    }
}
