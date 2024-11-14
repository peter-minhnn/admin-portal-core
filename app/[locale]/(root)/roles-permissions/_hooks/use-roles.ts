import { useQuery } from "@tanstack/react-query";
import get from "lodash/get";
import { getRoles } from "@/services/role-permission.service";
import { Role } from "@/types/roles-permissions.type";

export const useGetRoles = () => {
  return useQuery({
    queryKey: ["roles"],
    queryFn: async () => await getRoles(),
    select: (data) => get(data, "result.data", []) as Role[],
    refetchOnWindowFocus: false,
  });
};
