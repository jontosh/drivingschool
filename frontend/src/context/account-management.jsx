import { useRequestGetQuery } from "@/redux/query/index.jsx";
import { createContext, useEffect } from "react";

const AccountManagementContext = createContext();

export const AccountManagementProvider = ({ children }) => {
  const { data: LocationData } = useRequestGetQuery({
    path: "/account_management/location/",
  });

  const { data: SchoolData } = useRequestGetQuery({
    path: "/account_management/schools/",
  });

  const { data: HearData } = useRequestGetQuery({
    path: "/account_management/how_did_you_hear_us/",
  });

  const { data: VehicleData } = useRequestGetQuery({
    path: "/account_management/vehicle/",
  });

  const contextValues = { LocationData, SchoolData, HearData, VehicleData };

  return (
    <AccountManagementContext.Provider value={contextValues}>
      {children}
    </AccountManagementContext.Provider>
  );
};
export default AccountManagementContext;
