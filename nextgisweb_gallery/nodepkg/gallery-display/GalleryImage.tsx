import { useEffect, useMemo, useState } from "react";

import { route } from "@nextgisweb/pyramid/api";

export function GalleryImage({
    id,
    size,
    title,
}: {
    id?: number;
    size?: [number, number] | number;
    title?: string;
}) {
    const [src, setSrc] = useState<string>();

    const sizeArray = useMemo(() => {
        return size ? (Array.isArray(size) ? size : [size, size]) : undefined;
    }, [size]);

    useEffect(() => {
        route("gallery.preview", {
            id: Number(id),
        })
            .get({
                query: sizeArray ? { size: sizeArray.join("x") } : {},
                responseType: "blob",
            })
            .then((data) => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setSrc(reader.result as string);
                };
                reader.readAsDataURL(data);
            });
    }, [id, sizeArray]);

    return <img src={src} alt={title} />;
}
