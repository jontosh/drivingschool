import React, { Fragment, useContext } from 'react'
import ColorsContext from "@/context/colors.jsx";
import ManagementStyle from "@/pages/managment/management.module.scss";
import classNames from "classnames";
import { CustomInput } from '@/components/form';
import ButtonComponent from '@/components/button';

const StudentFileReport = () => {
    const { colorsObject } = useContext(ColorsContext);
    return (
        <Fragment>
            <form className={"flex flex-col gap-y-3.5"}>
                <div className='flex flex-col gap-y-3.5 px-32'>
                    <CustomInput
                        spanText={"CR List"}
                        spanClassName={"w-[180px] font-normal text-right"}
                        classNames={"flex flex-row-reverse items-center gap-x-3.5 h-[50px]"}
                        colorBorder={colorsObject.primary}
                        className={classNames(
                            ManagementStyle["CheckModal__form-element__shadow"],
                            "w-full",
                        )}
                        fontSize='text-base'
                    />

                    <CustomInput
                        spanText={"Or"}
                        spanClassName={"w-[180px] font-normal text-right"}
                        classNames={"flex flex-row-reverse items-center gap-x-3.5 h-[50px]"}
                        colorBorder={colorsObject.primary}
                        className={classNames(
                            ManagementStyle["CheckModal__form-element__shadow"],
                            "w-full",
                        )}
                        fontSize='text-base'
                    />

                    <CustomInput
                        spanText={"Student"}
                        spanClassName={"w-[180px] font-normal text-right"}
                        classNames={"flex flex-row-reverse items-center gap-x-3.5 h-[50px]"}
                        colorBorder={colorsObject.primary}
                        className={classNames(
                            ManagementStyle["CheckModal__form-element__shadow"],
                            "w-full",
                        )}
                        fontSize='text-base'
                    />

                    <CustomInput
                        spanText={"Date range"}
                        spanClassName={"w-[180px] font-normal text-right"}
                        classNames={"flex flex-row-reverse items-center gap-x-3.5 h-[50px]"}
                        colorBorder={colorsObject.primary}
                        className={classNames(
                            ManagementStyle["CheckModal__form-element__shadow"],
                            "w-full",
                        )}
                        fontSize='text-base'
                    />

                    <CustomInput
                        spanText={"File Category"}
                        spanClassName={"w-[180px] font-normal text-right"}
                        classNames={"flex flex-row-reverse items-center gap-x-3.5 h-[50px]"}
                        colorBorder={colorsObject.primary}
                        className={classNames(
                            ManagementStyle["CheckModal__form-element__shadow"],
                            "w-full",
                        )}
                        fontSize='text-base'
                    />
                </div>

                <div className='text-center'>
                    <ButtonComponent
                        defaultBg={colorsObject.success}
                        defaultHoverBg={colorsObject.successHover}
                        defaultColor={colorsObject.main}
                        defaultHoverColor={colorsObject.main}
                        controlHeight={40}
                        borderRadius={5}
                        paddingInline={43}

                    >
                        Export to Excel
                    </ButtonComponent>
                </div>
            </form>
        </Fragment>
    )
}

export default StudentFileReport;