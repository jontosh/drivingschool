import React, { Fragment, useContext } from 'react'
import ColorsContext from "@/context/colors.jsx";
import ManagementStyle from "@/pages/managment/management.module.scss";
import classNames from "classnames";
import { CustomInput } from '@/components/form';
import ButtonComponent from '@/components/button';

const AttendanceSignature = () => {
    const { colorsObject } = useContext(ColorsContext);
    return (
        <Fragment>
            <form className={"space-y-5 px-32"}>
                <CustomInput
                    spanText={"CR LIST"}
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
                    spanText={"Session"}
                    spanClassName={"w-[180px] font-normal text-right"}
                    classNames={"flex flex-row-reverse items-center gap-x-3.5 h-[50px]"}
                    colorBorder={colorsObject.primary}
                    className={classNames(
                        ManagementStyle["CheckModal__form-element__shadow"],
                        "w-full",
                    )}
                    fontSize='text-base'
                />

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

export default AttendanceSignature;