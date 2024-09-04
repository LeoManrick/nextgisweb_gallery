export interface GalleryLayer {
    id?: number;
    gallery_id?: number;
    resource_id?: number;
    title: string;
    description?: string | null;
    preview_fileobj_id?: string | number;

    item_type?: "gallery" | "webmap" | "resource" | "card";
    click_operation?: "display" | "update" | "resource";
}
