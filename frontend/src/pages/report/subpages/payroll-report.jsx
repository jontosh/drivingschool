import { CustomCheckBox, CustomInput } from '@/components/form';
import React, { Fragment, useContext } from 'react'
import ColorsContext from "@/context/colors.jsx";
import ManagementStyle from "@/pages/managment/management.module.scss";
import classNames from "classnames";
import ButtonComponent from '@/components/button';

const PayrollReport = () => {
    const { colorsObject } = useContext(ColorsContext);
    return (
        <Fragment>
            <form className={"space-y-5"}>
                <div className="flex flex-col items-center gap-5">
                    <CustomInput
                        spanText={"Staff Status"}
                        spanClassName={"w-[220px] font-normal text-right"}
                        classNames={"flex flex-row-reverse items-center gap-x-2.5 h-[50px]"}
                        colorBorder={colorsObject.primary}
                        className={classNames(
                            ManagementStyle["CheckModal__form-element__shadow"],
                            "w-full",
                        )}
                        fontSize='text-base'
                    />

                    <CustomInput
                        spanText={"Select staff"}
                        spanClassName={"w-[220px] font-normal text-right"}
                        classNames={"flex flex-row-reverse items-center gap-x-2.5 h-[50px]"}
                        colorBorder={colorsObject.primary}
                        className={classNames(
                            ManagementStyle["CheckModal__form-element__shadow"],
                            "w-full",
                        )}
                        fontSize='text-base'
                    />

                    <label className='flex gap-x-3.5 items-center'>
                        <span className='w-[195px] font-normal text-right'>Staff events Logs</span>

                        <CustomCheckBox
                            customWrapClassName={`border border-indigo-600 ${ManagementStyle["CheckModal__form-element__shadow"]}`}
                        >
                            BTW
                        </CustomCheckBox>

                        <CustomCheckBox
                            customWrapClassName={`border border-indigo-600 ${ManagementStyle["CheckModal__form-element__shadow"]}`}
                        >
                            Classroom
                        </CustomCheckBox>
                    </label>

                    <CustomInput
                        spanText={"Appointment date"}
                        spanClassName={"w-[220px] font-normal text-right"}
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


export default PayrollReport;