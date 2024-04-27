import IconComponent from "@/components/icons";
import Title, { Paragraph } from "@/components/title";
import { Fragment } from "react";
import { BsPerson } from "react-icons/bs";

export const AllTickets = () => {
    return (
        <Fragment>
            <div className="flex flex-col gap-y-5 border border-solid border-gray-200 p-6">
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-x-5">
                        <div className="w-[22px] h-[22px] bg-blue-600 rounded-full"></div>

                        <Title
                            level={2}
                            fontSize={16}
                            fontWeightStrong={600}
                        >
                            Ticket #27-4-2024
                        </Title>
                    </div>

                    <span className="text-xs font-medium text-gray-700">
                        Posted at 12:45 AM
                    </span>
                </div>

                <div className="flex flex-col gap-y-2.5">
                    <Title
                        level={3}
                        fontSize={14}
                        fontWeightStrong={500}
                    >
                        Problem with the Internet ?
                    </Title>

                    <Paragraph
                        fontSize={12}
                        fontWeightStrong={500}
                        colorText="#84818A"
                    >
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </Paragraph>
                </div>

                <div className="border-t border-solid border-gray-200 pt-2.5 flex gap-x-2 items-center">
                    <IconComponent
                        icon={<BsPerson />}
                        iconWidth={"w-7"}
                    />

                    <Paragraph
                        fontSize={14}
                        fontWeightStrong={500}
                        colorText="#84818A"
                    >
                        Hasanboy Nurmuhammadov
                    </Paragraph>
                </div>
            </div>
        </Fragment>
    )
}

export const New = () => {
    return (
        <Fragment>
            <div className="flex flex-col gap-y-5 border border-solid border-gray-200 p-6">
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-x-5">
                        <div className="w-[22px] h-[22px] bg-yellow-400 rounded-full"></div>

                        <Title
                            level={2}
                            fontSize={16}
                            fontWeightStrong={600}
                        >
                            Ticket #27-4-2024
                        </Title>
                    </div>

                    <span className="text-xs font-medium text-gray-700">
                        Posted at 12:45 AM
                    </span>
                </div>

                <div className="flex flex-col gap-y-2.5">
                    <Title
                        level={3}
                        fontSize={14}
                        fontWeightStrong={500}
                    >
                        Problem with the Internet ?
                    </Title>

                    <Paragraph
                        fontSize={12}
                        fontWeightStrong={500}
                        colorText="#84818A"
                    >
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </Paragraph>
                </div>

                <div className="border-t border-solid border-gray-200 pt-2.5 flex gap-x-2 items-center">
                    <IconComponent
                        icon={<BsPerson />}
                        iconWidth={"w-7"}
                    />

                    <Paragraph
                        fontSize={14}
                        fontWeightStrong={500}
                        colorText="#84818A"
                    >
                        Hasanboy Nurmuhammadov
                    </Paragraph>
                </div>
            </div>
        </Fragment>
    )
}

export const OnGoing = () => {
    return (
        <Fragment>
            <div className="flex flex-col gap-y-5 border border-solid border-gray-200 p-6">
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-x-5">
                        <div className="w-[22px] h-[22px] bg-green-600 rounded-full"></div>

                        <Title
                            level={2}
                            fontSize={16}
                            fontWeightStrong={600}
                        >
                            Ticket #27-4-2024
                        </Title>
                    </div>

                    <span className="text-xs font-medium text-gray-700">
                        Posted at 12:45 AM
                    </span>
                </div>

                <div className="flex flex-col gap-y-2.5">
                    <Title
                        level={3}
                        fontSize={14}
                        fontWeightStrong={500}
                    >
                        Problem with the Internet ?
                    </Title>

                    <Paragraph
                        fontSize={12}
                        fontWeightStrong={500}
                        colorText="#84818A"
                    >
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </Paragraph>
                </div>

                <div className="border-t border-solid border-gray-200 pt-2.5 flex gap-x-2 items-center">
                    <IconComponent
                        icon={<BsPerson />}
                        iconWidth={"w-7"}
                    />

                    <Paragraph
                        fontSize={14}
                        fontWeightStrong={500}
                        colorText="#84818A"
                    >
                        Hasanboy Nurmuhammadov
                    </Paragraph>
                </div>
            </div>
        </Fragment>
    )
}

export const Resolved = () => {
    return (
        <Fragment>
            <div className="flex flex-col gap-y-5 border border-solid border-gray-200 p-6">
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-x-5">
                        <div className="w-[22px] h-[22px] bg-blue-600 rounded-full"></div>

                        <Title
                            level={2}
                            fontSize={16}
                            fontWeightStrong={600}
                        >
                            Ticket #27-4-2024
                        </Title>
                    </div>

                    <span className="text-xs font-medium text-gray-700">
                        Posted at 12:45 AM
                    </span>
                </div>

                <div className="flex flex-col gap-y-2.5">
                    <Title
                        level={3}
                        fontSize={14}
                        fontWeightStrong={500}
                    >
                        Problem with the Internet ?
                    </Title>

                    <Paragraph
                        fontSize={12}
                        fontWeightStrong={500}
                        colorText="#84818A"
                    >
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </Paragraph>
                </div>

                <div className="border-t border-solid border-gray-200 pt-2.5 flex gap-x-2 items-center">
                    <IconComponent
                        icon={<BsPerson />}
                        iconWidth={"w-7"}
                    />

                    <Paragraph
                        fontSize={14}
                        fontWeightStrong={500}
                        colorText="#84818A"
                    >
                        Hasanboy Nurmuhammadov
                    </Paragraph>
                </div>
            </div>
        </Fragment>
    )
}

const TabItem = () => {
    return [
        {
            key: "1",
            label: <span>All Tickets</span>,
            children: <AllTickets />
        },
        {
            key: "2",
            label: <span>New</span>,
            children: <New />
        },
        {
            key: "3",
            label: <span>On-Going</span>,
            children: <OnGoing />
        },
        {
            key: "4",
            label: <span>Resolved</span>,
            children: <Resolved />
        },
    ].map((item) => {
        return { ...item };
    });
};

export default TabItem;