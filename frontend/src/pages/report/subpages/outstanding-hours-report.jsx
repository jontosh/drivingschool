import { CustomCheckBox, CustomInput } from '@/components/form';
import React, { Fragment, useContext } from 'react'
import ColorsContext from "@/context/colors.jsx";
import ManagementStyle from "@/pages/managment/management.module.scss";
import classNames from "classnames";
import ButtonComponent from '@/components/button';

const OutstandingHoursReport = () => {
    const { colorsObject } = useContext(ColorsContext);
    return (
        <Fragment>
            <form className={"space-y-5"}>
                <div className='grid grid-cols-2 gap-3.5 items-center'>
                    <CustomInput
                        spanText={"Select date"}
                        spanClassName={"w-[230px] font-normal text-right"}
                        classNames={"flex flex-row-reverse items-center gap-x-2.5 h-[50px]"}
                        colorBorder={colorsObject.primary}
                        className={classNames(
                            ManagementStyle["CheckModal__form-element__shadow"],
                            "w-full",
                        )}
                        fontSize='text-base'
                    />

                    <label className='flex gap-x-3.5 itemx-center'>
                        <CustomCheckBox>
                            Date activated
                        </CustomCheckBox>

                        <CustomCheckBox>
                            Date activated
                        </CustomCheckBox>
                    </label>

                    <CustomInput
                        spanText={"Class room product"}
                        spanClassName={"w-[230px] font-normal text-right"}
                        classNames={"flex flex-row-reverse items-center gap-x-2.5 h-[50px]"}
                        colorBorder={colorsObject.primary}
                        className={classNames(
                            ManagementStyle["CheckModal__form-element__shadow"],
                            "w-full",
                        )}
                        fontSize='text-base'
                    />

                    <CustomInput
                        spanText={"BTW Status"}
                        spanClassName={"w-[230px] font-normal text-right"}
                        classNames={"flex flex-row-reverse items-center gap-x-2.5 h-[50px]"}
                        colorBorder={colorsObject.primary}
                        className={classNames(
                            ManagementStyle["CheckModal__form-element__shadow"],
                            "w-full",
                        )}
                        fontSize='text-base'
                    />

                    <CustomInput
                        spanText={"Staff Assigned"}
                        spanClassName={"w-[230px] font-normal text-right"}
                        classNames={"flex flex-row-reverse items-center gap-x-2.5 h-[50px]"}
                        colorBorder={colorsObject.primary}
                        className={classNames(
                            ManagementStyle["CheckModal__form-element__shadow"],
                            "w-full",
                        )}
                        fontSize='text-base'
                    />

                    <CustomInput
                        spanText={"Location"}
                        spanClassName={"w-[230px] font-normal text-right"}
                        classNames={"flex flex-row-reverse items-center gap-x-2.5 h-[50px]"}
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
                        Export into excel
                    </ButtonComponent>
                </div>
            </form>
        </Fragment>
    )
}


export default OutstandingHoursReport;