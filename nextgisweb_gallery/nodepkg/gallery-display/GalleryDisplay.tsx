import { useState } from "react";
import { Radio, Col, Row } from "@nextgisweb/gui/antd";
import { LoadingWrapper } from "@nextgisweb/gui/component";
import { useRouteGet } from "@nextgisweb/pyramid/hook";

import { GalleryLayoutGrid } from "./GalleryLayoutGrid";
import { GalleryLayoutList } from "./GalleryLayoutList";
import { gettext } from "@nextgisweb/pyramid/i18n";

export interface GalleryItem {
    id: number;
    title: string;
    description: string;
    resource_id: number;
}

export function GalleryDisplay({ id }: { id: number }) {
    const [viewMode, setViewMode] = useState("grid");

    const { data, isLoading } = useRouteGet("resource.item", { id });

    if (isLoading) {
        return <LoadingWrapper />;
    }

    const galleryItems = data?.gallery?.items as GalleryItem[];

    if (!galleryItems || galleryItems.length === 0) {
        return <div>{gettext("No data available")}</div>;
    }

    return (
        <>
            <Row
                justify="space-between"
                align="middle"
                style={{ marginBottom: 16 }}
            >
                <Col>
                    <Radio.Group
                        value={viewMode}
                        onChange={(e) => setViewMode(e.target.value)}
                    >
                        <Radio.Button value="grid">
                            {gettext("Grid")}
                        </Radio.Button>
                        <Radio.Button value="list">
                            {gettext("List")}
                        </Radio.Button>
                    </Radio.Group>
                </Col>
            </Row>

            {viewMode === "grid" ? (
                <GalleryLayoutGrid data={galleryItems} />
            ) : (
                <GalleryLayoutList data={galleryItems} />
            )}
        </>
    );
}
