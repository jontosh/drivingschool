import { CustomInput, CustomSelect } from "@/components/form"
import Title, { Paragraph } from "@/components/title"
import { Fragment, useContext } from "react"
import { Helmet } from "react-helmet"
import ColorsContext from "@/context/colors.jsx";
import ButtonComponent from "@/components/button";
import { Form } from "antd";

export const NewTicket = () => {
    const { colorsObject } = useContext(ColorsContext);
    return (
        <Fragment>
            <Helmet>
                <title>New Ticket</title>
            </Helmet>
            <div className="px-3 sm:px-11">
                <Title
                    level={2}
                    fontSize={"text-black text-2xl"}
                    fontWeightStrong={500}
                    titleMarginBottom={40}
                >
                    New Ticket
                </Title>

                <section className="bg-white p-5 rounded-lg">
                    <Title
                        level={2}
                        fontSize={"text-black text-lg"}
                        fontWeightStrong={500}
                        titleMarginBottom={10}
                    >
                        Create Quick Ticket
                    </Title>

                    <Paragraph
                        colorText="#84818A"
                    >
                        Write and address new queries and issues
                    </Paragraph>

                    <div className="pt-10">
                        <Form layout="vertical">
                            <div className="grid md:grid-cols-3  gap-5 items-center">
                                <Form.Item label="Email">
                                    <CustomInput placeholder={"Type Email"} type="email" classNames={"w-full"} />
                                </Form.Item>

                                <Form.Item label="Request Ticket Type">
                                    <CustomSelect
                                        placeholder={"Choose Type"}
                                        options={[
                                            {
                                                value: "choose",
                                                label: "choose",
                                            }
                                        ]}
                                        className={"h-[50px]"}
                                    />
                                </Form.Item>

                                <Form.Item label="Priority Status">
                                    <CustomSelect
                                        placeholder={"Select Status"}
                                        options={[
                                            {
                                                value: "choose",
                                                label: "choose",
                                            }
                                        ]}
                                        className={"h-[50px]"}
                                    />
                                </Form.Item>
                            </div>

                            <Form.Item label="Ticket Body">
                                <textarea
                                    placeholder="Type ticket issue here.."
                                    className="w-full border border-[#667085] rounded text-gray-500 p-3 outline-none"
                                ></textarea>
                            </Form.Item>

                            <div className="text-end">
                                <ButtonComponent
                                    defaultBg={colorsObject.info}
                                    defaultHoverBg={colorsObject.infoHover}
                                    paddingInline={43}
                                    borderRadius={4}
                                >
                                    Send Ticket
                                </ButtonComponent>
                            </div>
                        </Form>
                    </div>
                </section>
            </div>
        </Fragment>
    )
}