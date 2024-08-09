import { Col, Divider, Row } from "@nextgisweb/gui/antd";
import { gettext } from "@nextgisweb/pyramid/i18n";
import type { GalleryItem } from "./GalleryDisplay";

import "./GalleryLayoutGrid.less";

interface GalleryLayoutGridProps {
    data: GalleryItem[];
}

export function GalleryLayoutGrid({ data }: GalleryLayoutGridProps) {
    
    //to check positioning of different size images (can add more images for containers testing):
    const imageUrls = [
        "https://i.redd.it/aiote3dzud141.jpg",
        "https://images.pexels.com/photos/269633/pexels-photo-269633.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        "https://www.stocksy.com/ideas/wp-content/uploads/2022/12/Stocksy_comp_4790285.jpg",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHxDCKz_iUKYSeu1xQomASd0X7NxwjHXrMxw&s",
    ];

     // Function to get a random index from links in the massive
     const getRandomIndex = () => {
        return Math.floor(Math.random() * imageUrls.length);
    };


    return (
        <>
            <Divider orientation="center"> {gettext("Gallery Name")}</Divider>
            <Row
                justify="center"
                gutter={[36, 36]}
                className="ngw-gallery-gallery-layout-grid"
            >
                {data.map((item) => {

                    // Generating a random index
                    const randomIndex = getRandomIndex();
                    const randomImage = imageUrls[randomIndex];

                    const link = `/resource/${item.resource_id}`;

                    return (
                        <Col key={item.id} xs={20} sm={10} md={8}>
                            <div
                                className="container"
                                onClick={() => window.open(link, "_blank")}
                            >
                                <div className="image-container">
                                    <img
                                        src={randomImage}
                                        alt={item.title}
                                    />
                                </div>
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
                            </div>
                        </Col>
                    );
                })}
            </Row>
        </>
    );
}

//  STOCK LICENSE: https://www.pexels.com/ru-ru/license/

//src="https://i.redd.it/aiote3dzud141.jpg"
//src="https://www.stocksy.com/ideas/wp-content/uploads/2022/12/Stocksy_comp_4790285.jpg"
//src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHxDCKz_iUKYSeu1xQomASd0X7NxwjHXrMxw&s"
