import React, { Fragment, useContext } from 'react'
import ColorsContext from "@/context/colors.jsx";
import ManagementStyle from "@/pages/managment/management.module.scss";
import classNames from "classnames";
import { CustomInput, CustomSelect } from '@/components/form';
import ButtonComponent from '@/components/button';

const OnlineCourseCodesUploadAndStatus = () => {
    const { colorsObject } = useContext(ColorsContext);
    return (
        <Fragment>
            <form className={"space-y-5 px-32"}>
                <label className='flex items-center gap-x-3.5'>
                    <span className='w-[250px] font-normal text-right'>Please select course</span>

                    <CustomSelect
                        value={"Please select course"}
                        options={[
                            {
                                value: "Active",
                                label: "Active",
                            },
                        ]}
                        className={ManagementStyle["CheckModal__form-element__shadow"]}
                        colorBorder={"#1890FF"}
                        style={{ width: "100%", height: 50 }}
                    />
                </label>
            </form>
        </Fragment>
    )
}

export default OnlineCourseCodesUploadAndStatus;