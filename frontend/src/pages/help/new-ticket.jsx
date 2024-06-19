import { CustomInput, CustomSelect } from "@/components/form"
import Title, { Paragraph } from "@/components/title"
import { Fragment, useContext } from "react"
import { Helmet } from "react-helmet"
import ColorsContext from "@/context/colors.jsx";
import ButtonComponent from "@/components/button";

export const NewTicket = () => {
    const { colorsObject } = useContext(ColorsContext);
    return (
        <Fragment>
            <Helmet>
                <title>New Ticket</title>
            </Helmet>
            <div className="px-11">
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
                        <form>
                            <div className="grid grid-cols-3 gap-x-5 items-center justify-between">
                                <CustomInput
                                    spanText={"Email"}
                                    spanClassName={"font-medium"}
                                    placeholder={"Type Email"}
                                    classNames={"flex flex-col-reverse gap-y-2 h-[78px]"}
                                    className={"w-full py-2.5 shadow-xl"}
                                    colorBorder={colorsObject.primary}
                                />

                                <label className="flex flex-col gap-y-1">
                                    <span className="font-medium">Priority Status</span>
                                    <CustomSelect
                                        colorBorder={colorsObject.primary}
                                        className={"w-full h-[50px] shadow-xl"}
                                        options={[
                                            {
                                                value: 1,
                                                label: 1,
                                            },
                                        ]}
                                    />
                                </label>

                                <CustomInput
                                    spanText={"Priority Status"}
                                    spanClassName={"font-medium"}
                                    placeholder={"Select Status"}
                                    classNames={"flex flex-col-reverse gap-y-2 h-[78px]"}
                                    className={"w-full py-2.5 shadow-xl"}
                                    colorBorder={colorsObject.primary}
                                />
                            </div>

                            <label className="flex flex-col gap-y-2 pt-10">
                                <span className="font-medium">Ticket Body</span>

                                <textarea
                                    placeholder="Type ticket issue here.."
                                    className="p-2.5 border border-blue-600 outline-none rounded-lg min-h-60 shadow-xl"
                                ></textarea>
                            </label>

                            <div className="text-end">
                                <ButtonComponent
                                    defaultBg={colorsObject.info}
                                    defaultHoverBg={colorsObject.info}
                                    borderRadius={4}
                                    controlHeight={44}
                                    className={"w-[157px] mt-10"}
                                >
                                    Send Ticket
                                </ButtonComponent>
                            </div>
                        </form>
                    </div>
                </section>
            </div>
        </Fragment>
    )
}