import { Space } from "@nextgisweb/gui/antd";
import { LoadingWrapper } from "@nextgisweb/gui/component";
import { useRouteGet } from "@nextgisweb/pyramid/hook";

interface GalleryItem {
    id: number;
    title: string;
}

export function GalleryDisplay({ id }: { id: number }) {
    const { data, isLoading } = useRouteGet("resource.item", { id });

    if (isLoading) {
        return <LoadingWrapper />;
    }

    return (
        <ul>
            {(data?.gallery?.items as GalleryItem[]).map(({ id, title }) => {
                return (
                    <li key={id}>
                        <Space>
                            {id} {title}
                        </Space>
                    </li>
                );
            })}
        </ul>
    );
}
