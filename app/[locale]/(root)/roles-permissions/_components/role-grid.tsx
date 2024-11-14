"use client";
import { cn } from "@/shared/lib";
import RoleCard from "./role-card";
import { useGetRoles } from "@/app/[locale]/(root)/roles-permissions/_hooks/use-roles";
import { Role } from "@/types/roles-permissions.type";
import {Button} from "@/components/ui/button";
import {IconPlus} from "@tabler/icons-react";

interface RolesGridProps {
  gridClassName?: string;
}

const RoleGrid = ({ gridClassName }: RolesGridProps) => {
  const { data: roles } = useGetRoles();

  return (
    <div className="flex flex-col gap-4 mt-2">
      <Button className="w-fit bg-[#D26426] text-primary-foreground transition-all duration-300 hover:bg-[#D26426]/90 hover:ring-2 hover:ring-primary/90 hover:ring-offset-2" size="sm">
        <IconPlus className="mr-1" size={20} />
        Add new role
      </Button>
      <div
        className={cn(
          "grid grid-cols-1 gap-6 lg:grid-cols-3 md:grid-cols-2",
          gridClassName,
        )}
      >
        {roles?.map((role: Role) => <RoleCard key={role.roleCode} role={role} />)}
      </div>
    </div>
  );
};

export default RoleGrid;
