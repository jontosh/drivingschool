import { CustomCheckBox, CustomInput } from '@/components/form';
import React, { Fragment, useContext } from 'react'
import ColorsContext from "@/context/colors.jsx";
import ManagementStyle from "@/pages/managment/management.module.scss";
import classNames from "classnames";
import ButtonComponent from '@/components/button';

const AttendanceSheetReport = () => {
    const { colorsObject } = useContext(ColorsContext);
    return (
        <Fragment>
            <form className={"space-y-5"}>
                <div className='flex space-x-7 justify-center'>
                    <CustomInput
                        spanText={"Select classroom"}
                        spanClassName={"w-[230px] font-normal"}
                        classNames={"flex flex-row-reverse items-center gap-x-2.5 h-[50px]"}
                        colorBorder={colorsObject.primary}
                        className={classNames(
                            ManagementStyle["CheckModal__form-element__shadow"],
                            "w-full",
                        )}
                        fontSize='text-base'
                        placeholder={"Class Number Search"}
                    />

                    <CustomCheckBox
                        className={"gap-x-2.5 flex-row-reverse"}
                        customWrapClassName={`border border-indigo-600 ${ManagementStyle["CheckModal__form-element__shadow"]}`}
                    >
                        Show score
                    </CustomCheckBox>
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
                        className={"m-auto"}

                    >
                        Download files
                    </ButtonComponent>
                </div>
            </form>
        </Fragment>
    )
}


export default AttendanceSheetReport;