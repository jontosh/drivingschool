import Title, { Paragraph } from "@/components/title";
import { Fragment, useState } from "react";
import IconComponent from "@/components/icons";
import { ExportOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { Pagination } from "antd";
import { Helmet } from "react-helmet";

export const News = () => {
    const [currentPagination, setCurrentPagination] = useState(1);

    const handleChangePagination = (page) => {
        setCurrentPagination(page);
    };

    const newsItems = [
        { title: 'Ideas upvote clickable on main board, just inside ideas', id: 1, date: '25.04.2024', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
        { title: 'Ideas upvote clickable on main board, just inside ideas', id: 2, date: '26.04.2024', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
        { title: 'Ideas upvote clickable on main board, just inside ideas', id: 3, date: '26.04.2024', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
    ];

    return (
        <Fragment>
            <Helmet>
                <title>Help - News</title>
            </Helmet>
            <div className="px-3 sm:px-11">
                <Title level={2} fontSize={"text-black text-2xl"} fontWeightStrong={500} titleMarginBottom={40}>
                    News
                </Title>
                <div className="flex flex-col gap-y-2 p3 sm:px-6 pb-4 rounded-lg">
                    {newsItems.map((item) => (
                        <Link key={item.id} to={`ticket/${item.title}/${item.id}`}>
                            <div className="bg-white w-full flex flex-col gap-y-5 p-5 rounded-tr-lg rounded-br-lg border-l-4 border-l-transparent hover:border-l-blue-500">
                                <div className="flex max-md:flex-col gap-2.5 justify-between items-center">
                                    <Paragraph className="font-semibold text-lg">
                                        {item.title.replace('-', ' ').toUpperCase()}
                                    </Paragraph>
                                    <div className="flex items-center gap-x-10">
                                        <span className="text-gray-400 text-xs">DATE:</span>
                                        <span className="text-lg font-normal">{item.date}</span>
                                    </div>
                                </div>
                                <span className="flex max-md:flex-col justify-between items-center max-md:items-end">
                                    <Paragraph className="font-normal text-sm text-gray-400">
                                        {item.description}
                                    </Paragraph>
                                    <IconComponent icon={<ExportOutlined />} className="text-gray-400 max-md:text-right" />
                                </span>
                            </div>
                        </Link>
                    ))}
                    <Pagination
                        total={newsItems.length}
                        pageSize={1}
                        current={currentPagination}
                        onChange={handleChangePagination}
                        className="pt-6 text-end"
                    />
                </div>
            </div>
        </Fragment>
    );
};

export default News;