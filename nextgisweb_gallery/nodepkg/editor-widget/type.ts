export interface GalleryLayer {
    resource_id: number;
    title: string;
    description?: string | null;
    preview_fileobj_id?: string;

    item_type?: "gallery" | "webmap" | "resource" | "card";
    click_operation?: "display" | "update" | "resource";
}
