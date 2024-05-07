import React, { Fragment, useContext } from 'react'
import ColorsContext from "@/context/colors.jsx";
import ManagementStyle from "@/pages/managment/management.module.scss";
import classNames from "classnames";
import { CustomInput } from '@/components/form';
import ButtonComponent from '@/components/button';

const StudentAdwordTracking = () => {
    const { colorsObject } = useContext(ColorsContext);
    return (
        <Fragment>
            <form className={"flex flex-col gap-y-3.5"}>
                <div className='flex items-center justify-center'>
                    <CustomInput
                        spanText={"Start date"}
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
                        spanText={"End date"}
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

                <div className='flex justify-center gap-x-3.5 items-ceter'>
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

                    <ButtonComponent
                        defaultBg={colorsObject.success}
                        defaultHoverBg={colorsObject.successHover}
                        defaultColor={colorsObject.main}
                        defaultHoverColor={colorsObject.main}
                        controlHeight={40}
                        borderRadius={5}
                        paddingInline={43}
                    >
                        Show Graph
                    </ButtonComponent>
                </div>
            </form>
        </Fragment>
    )
}

export default StudentAdwordTracking;