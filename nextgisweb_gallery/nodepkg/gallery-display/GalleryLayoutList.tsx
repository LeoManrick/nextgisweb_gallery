import { Col, Divider, Row } from "@nextgisweb/gui/antd";
import { gettext } from "@nextgisweb/pyramid/i18n";

import { GalleryItem } from "./GalleryDisplay";
import "./GalleryLayoutList.less";

interface GalleryLayoutListProps {
    data: GalleryItem[];
}

export function GalleryLayoutList({ data }: GalleryLayoutListProps) {

     //to check positioning of different size images (can add more images for containers testing):
     const imageUrls = [
        "https://i.redd.it/aiote3dzud141.jpg",
        "https://images.pexels.com/photos/269633/pexels-photo-269633.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        "https://www.stocksy.com/ideas/wp-content/uploads/2022/12/Stocksy_comp_4790285.jpg",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHxDCKz_iUKYSeu1xQomASd0X7NxwjHXrMxw&s",
    ];

     // Function to get a random index from links in the massive)
     const getRandomIndex = () => {
        return Math.floor(Math.random() * imageUrls.length);
     }

    return (
        <>
            <Divider orientation="center">{gettext("Gallery Name")}</Divider>
            <Row
                justify="center"
                gutter={[36, 36]}
                className="ngw-gallery-gallery-layout-list"
            >
                {data.map((item) => {

                      // Generating a random index 
                    const randomIndex = getRandomIndex();
                    const randomImage = imageUrls[randomIndex];

                    const link = `/resource/${item.resource_id}`;

                    return (
                        <Row
                            key={item.id}
                            className="list-item"
                            onClick={() => window.open(link, "_blank")}
                        >
                            <Col span={6}>
                                <div className="image-container">
                                    <img
                                        src={randomImage}
                                        alt={item.title}
                                    />
                                </div>
                            </Col>
                            <Col span={18}>
                                <div className="text-container">
                                    <div className="name">{item.title}</div>
                                    <div className="description">
                                        {item.description}
                                    </div>
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
