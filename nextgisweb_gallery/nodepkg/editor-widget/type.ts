export interface GalleryLayer {
    resource_id: number;
    title: string;
    description?: string | null;

    item_type?: "gallery" | "webmap" | "resource" | "card";
    click_operation?: "display" | "update" | "resource";
}
