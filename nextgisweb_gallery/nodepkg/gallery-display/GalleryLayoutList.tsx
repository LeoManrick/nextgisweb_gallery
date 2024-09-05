import { Col, Divider, Row } from "@nextgisweb/gui/antd";
import { gettext } from "@nextgisweb/pyramid/i18n";

import type { GalleryItem } from "./GalleryDisplay";
import "./GalleryLayoutList.less";
import { GalleryImage } from "./GalleryImage";

interface GalleryLayoutListProps {
    data: GalleryItem[];
}

export function GalleryLayoutList({ data }: GalleryLayoutListProps) {
    return (
        <>
            <Divider orientation="center">{gettext("Gallery Name")}</Divider>
            <Row
                justify="center"
                gutter={[36, 36]}
                className="ngw-gallery-gallery-layout-list"
            >
                {data.map((item) => {
                    const link = `/resource/${item.resource_id}`;

                    return (
                        <Row
                            key={item.id}
                            className="list-item"
                            onClick={() => window.open(link, "_blank")}
                        >
                            <Col span={6}>
                                <div className="image-container">
                                    <GalleryImage
                                        id={item.preview_fileobj_id}
                                        title={item.title}
                                    />
                                </div>
                            </Col>
                            <Col span={18}>
                                <div className="text-container">
                                    <div className="name">{item.title}</div>
                                    <div
                                        className="description"
                                        //React method to render HTML string as JSX elements
                                        dangerouslySetInnerHTML={{
                                            __html: item.description,
                                        }}
                                    />
                                    <div className="link">
                                        <a
                                            href={link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            {link}
                                        </a>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    );
                })}
            </Row>
        </>
    );
}
