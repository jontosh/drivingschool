import Title, { Paragraph } from "@/components/title"
import { Fragment, useState } from "react"
import IconComponent from "@/components/icons";
import { ExportOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { Pagination } from "antd";

export const News = () => {
    const [CurrentPagination, setCurrentPagination] = useState(1);

    const handleChangePagination = (page) => {
        setCurrentPagination(page);
    };
    return (
        <Fragment>
            <div className="px-11">
                <Title
                    level={2}
                    fontSize={"text-black text-2xl"}
                    fontWeightStrong={500}
                    titleMarginBottom={40}
                >
                    News
                </Title>

                <div className="flex flex-col gap-y-2 pl-6 pr-6 pb-4 rounded-lg">
                    <Link>
                        <div className="flex flex-col gap-y-5 pt-5">
                            <div className="bg-white w-full flex flex-col gap-y-5 p-5 rounded-tr-lg rounded-br-lg  hover:border-l-4 border-solid border-blue-500">
                                <Paragraph className={"font-semibold text-lg"}>Ideas upvote clickable on main board, just inside ideas</Paragraph>
                                <span className="flex justify-between items-center">
                                    <Paragraph className={"font-normal text-sm text-gray-400"}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</Paragraph>

                                    <IconComponent
                                        icon={<ExportOutlined />}
                                        className={"text-gray-400"}
                                    />
                                </span>
                            </div>
                        </div>
                    </Link>

                    <Link>
                        <div className="flex flex-col gap-y-5 pt-5">
                            <div className="bg-white w-full flex flex-col gap-y-5 p-5 rounded-tr-lg rounded-br-lg  hover:border-l-4 border-solid border-blue-500">
                                <Paragraph className={"font-semibold text-lg"}>Ideas upvote clickable on main board, just inside ideas</Paragraph>
                                <span className="flex justify-between items-center">
                                    <Paragraph className={"font-normal text-sm text-gray-400"}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</Paragraph>

                                    <IconComponent
                                        icon={<ExportOutlined />}
                                        className={"text-gray-400"}
                                    />
                                </span>
                            </div>
                        </div>
                    </Link>

                    <Link>
                        <div className="flex flex-col gap-y-5 pt-5">
                            <div className="bg-white w-full flex flex-col gap-y-5 p-5 rounded-tr-lg rounded-br-lg  hover:border-l-4 border-solid border-blue-500">
                                <Paragraph className={"font-semibold text-lg"}>Ideas upvote clickable on main board, just inside ideas</Paragraph>
                                <span className="flex justify-between items-center">
                                    <Paragraph className={"font-normal text-sm text-gray-400"}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</Paragraph>

                                    <IconComponent
                                        icon={<ExportOutlined />}
                                        className={"text-gray-400"}
                                    />
                                </span>
                            </div>
                        </div>
                    </Link>

                    <Link>
                        <div className="flex flex-col gap-y-5 pt-5">
                            <div className="bg-white w-full flex flex-col gap-y-5 p-5 rounded-tr-lg rounded-br-lg  hover:border-l-4 border-solid border-blue-500">
                                <Paragraph className={"font-semibold text-lg"}>Ideas upvote clickable on main board, just inside ideas</Paragraph>
                                <span className="flex justify-between items-center">
                                    <Paragraph className={"font-normal text-sm text-gray-400"}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</Paragraph>

                                    <IconComponent
                                        icon={<ExportOutlined />}
                                        className={"text-gray-400"}
                                    />
                                </span>
                            </div>
                        </div>
                    </Link>

                    <Link>
                        <div className="flex flex-col gap-y-5 pt-5">
                            <div className="bg-white w-full flex flex-col gap-y-5 p-5 rounded-tr-lg rounded-br-lg  hover:border-l-4 border-solid border-blue-500">
                                <Paragraph className={"font-semibold text-lg"}>Ideas upvote clickable on main board, just inside ideas</Paragraph>
                                <span className="flex justify-between items-center">
                                    <Paragraph className={"font-normal text-sm text-gray-400"}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</Paragraph>

                                    <IconComponent
                                        icon={<ExportOutlined />}
                                        className={"text-gray-400"}
                                    />
                                </span>
                            </div>
                        </div>
                    </Link>

                        <Pagination
                            total={10}
                            pageSize={1}
                            current={CurrentPagination}
                            onChange={handleChangePagination}
                            className="pt-6 text-end"
                        />
                </div>
            </div>
        </Fragment>
    )
}