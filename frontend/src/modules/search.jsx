import ButtonComponent from "@/components/button/index.jsx";
import { Paragraph } from "@/components/title/index.jsx";
import ColorsContext from "@/context/colors.jsx";
import { useContext, useMemo } from "react";
import { CheckProgress } from "@/modules/progress.jsx";
import { useRequestGetQuery } from "@/redux/query/index.jsx";

export const SearchModule = () => {
  const { colorsObject } = useContext(ColorsContext);
  const { data: Schools } = useRequestGetQuery({
    path: "/account_management/schools/",
  });

  const columns = useMemo(() => {
    return [
      {
        title: "Full name",
        dataIndex: "name",
        key: "name",
        align: "center",
        render: (name) => (
          <Paragraph
            fontSize={"text-base"}
            className={"text-gray-400"}
            fontWeightStrong={500}
          >
            {name}
          </Paragraph>
        ),
      },
      {
        title: "City",
        dataIndex: "city",
        key: "city",
        align: "center",
        render: (city) => (
          <Paragraph
            fontSize={"text-base"}
            fontWeightStrong={500}
            className={"text-gray-400"}
          >
            {city}
          </Paragraph>
        ),
      },
      {
        title: "High school",
        dataIndex: "school",
        key: "school",
        align: "center",
        render: (school) => (
          <Paragraph
            fontSize={"text-base"}
            fontWeightStrong={500}
            className={"text-gray-400"}
          >
            {Schools?.find((value) => value?.id === school)?.name}
          </Paragraph>
        ),
      },
      {
        title: "Balance",
        dataIndex: "balance",
        key: "balance",
        align: "center",
        render: (balance) => (
          <Paragraph
            fontSize={"text-base"}
            fontWeightStrong={500}
            className={"text-gray-400"}
          >
            {balance ?? 0}$
          </Paragraph>
        ),
      },
      {
        title: "Type",
        dataIndex: "information_type",
        key: "information_type",
        align: "center",
        render: (type) => (
          <Paragraph
            fontSize={"text-base"}
            fontWeightStrong={500}
            className={"text-gray-400"}
          >
            {type}
          </Paragraph>
        ),
      },
      {
        title: "App Status",
        dataIndex: "status",
        key: "status",
        align: "center",
        render: (status) => {
          const { bg, hover } = CheckProgress(status);
          return (
            <ButtonComponent
              className={"w-[107px] shadow-2xl"}
              defaultBg={bg}
              defaultHoverBg={hover}
              defaultColor={colorsObject.main}
              defaultHoverColor={colorsObject.main}
              fontSize={16}
              borderRadius={5}
            >
              {status}
            </ButtonComponent>
          );
        },
      },

      {
        title: "DL/Permit number",
        dataIndex: "dl_permit",
        key: "dl_permit",
        align: "center",
        render: (dl_permit) => (
          <Paragraph
            fontSize={"text-base"}
            fontWeightStrong={500}
            className={"text-gray-400"}
          >
            {dl_permit}
          </Paragraph>
        ),
      },
    ];
  }, [Schools]);
  const data = [
    {
      name: "Aaron Frommeyer",
      city: "Mason",
      school: "Mason high school",
      balance: 0,
      type: "teen",
      status: true,
      number: "VL439475",
    },
    {
      name: "Aaron Frommeyer",
      city: "Mason",
      school: "Mason high school",
      balance: 0,
      type: "teen",
      status: false,
      number: "VL439475",
    },
  ];
  return { columns, data };
};
