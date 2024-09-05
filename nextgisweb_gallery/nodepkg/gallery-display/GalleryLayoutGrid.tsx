import { Col, Divider, Row } from "@nextgisweb/gui/antd";
import { gettext } from "@nextgisweb/pyramid/i18n";

import type { GalleryItem } from "./GalleryDisplay";

import "./GalleryLayoutGrid.less";
import { GalleryImage } from "./GalleryImage";

interface GalleryLayoutGridProps {
    data: GalleryItem[];
}

export function GalleryLayoutGrid({ data }: GalleryLayoutGridProps) {
    return (
        <>
            <Divider orientation="center"> {gettext("Gallery Name")}</Divider>
            <Row
                justify="center"
                gutter={[36, 36]}
                className="ngw-gallery-gallery-layout-grid"
            >
                {data.map((item) => {
                    const link = `/resource/${item.resource_id}`;

                    return (
                        <Col key={item.id} xs={20} sm={10} md={8}>
                            <div
                                className="container"
                                onClick={() => window.open(link, "_blank")}
                            >
                                <div className="image-container">
                                    <GalleryImage
                                        id={item.preview_fileobj_id}
                                        title={item.title}
                                    />
                                </div>
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
                            </div>
                        </Col>
                    );
                })}
            </Row>
        </>
    );
}
