import { CustomInput } from "@/components/form/index.jsx";
import ColorsContext from "@/context/colors.jsx";
import { Fragment, useContext } from "react";
import { AiOutlineSearch } from "react-icons/ai";

export const SchedulingStudent = () => {
  const { colorsObject } = useContext(ColorsContext);

  return (
    <Fragment>
      <form>
        <div>
          <label className={"relative w-full shadow-xl"}>
            <CustomInput
              colorBorder={colorsObject.primary}
              placeholder={"Find student"}
              className={`w-full pl-12 pr-4 py-2.5 text-sm `}
              classNames={"w-full"}
            />
            <span
              className={"absolute left-4 top-1/2 w-5 h-5 -translate-y-1/2 "}
            >
              <AiOutlineSearch />
            </span>
          </label>
        </div>
      </form>
    </Fragment>
  );
};
