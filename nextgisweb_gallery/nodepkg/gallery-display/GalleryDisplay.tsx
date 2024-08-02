import { Space } from "@nextgisweb/gui/antd";
import { LoadingWrapper } from "@nextgisweb/gui/component";
import { useRouteGet } from "@nextgisweb/pyramid/hook";

interface GalleryItem {
    id: number;
    title: string;
    description: string;
    resource_id: number;
}

export function GalleryDisplay({ id }: { id: number }) {
    const { data, isLoading } = useRouteGet("resource.item", { id });

    if (isLoading) {
        return <LoadingWrapper />;
    }

    return (
        <ul>
            {(data?.gallery?.items as GalleryItem[]).map(({ id, title, description, resource_id }) => {
                 const resourceLink = `http://localhost:8080/resource/${resource_id}`;

                return (
                    <li key={id}>
                        <Space>
                            <div><strong>Title:</strong> {title}</div>
                            <div><strong>Description:</strong> {description}</div>
                            <div>
                                <strong>Link:</strong>
                                <a href={resourceLink} target="_blank" rel="noopener noreferrer">
                                    {resourceLink}
                                </a>
                            </div>
                        </Space>
                    </li>
                );
            })}
        </ul>
    );
}


// //To obtain all the availiable information about items:
// interface GalleryDisplayProps {
//     id: number;
// }

// export function GalleryDisplay({ id }: GalleryDisplayProps) {
//     const { data, isLoading } = useRouteGet("resource.item", { id });

//     if (isLoading) {
//         return <LoadingWrapper />;
//     }

//     const items = data?.gallery?.items || [];

//     return (
//         <ul>
//             {items.map((item: Record<string, any>, index: number) => {
//                 return (
//                     <li key={index}>
//                         <Space direction="vertical">
//                             {Object.entries(item).map(([key, value]) => {
//                                 return (
//                                     <div key={key}>
//                                         <strong>{key}:</strong> {value}
//                                     </div>
//                                 );
//                             })}
//                         </Space>
//                     </li>
//                 );
//             })}
//         </ul>
//     );
// }
