"use client";

import { Fragment, useEffect, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { IconCheck, IconTrash } from "@tabler/icons-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { User } from "@/types/user.type";

const tags = Array.from({ length: 50 }).map(
  (_, i, a) => `v1.2.0-beta.${a.length - i}`,
);

type UserRoleManagementProps = {
  users: User[];
};

export default function UserRoleManagement({ users }: UserRoleManagementProps) {
  return (
    <ScrollArea className="w-full h-[600px] rounded-md border p-4">
      {tags.map((tag) => (
        <Fragment key={tag}>
          <div className="flex flex-row justify-between items-center min-h-14">
            <span className="text-md font-semibold">{tag}</span>
            <div className="flex flex-row gap-2">
              <Button
                variant="outline"
                size="sm"
                className="btn btn-sm btn-primary"
              >
                <IconCheck className="mr-1" size={16} color="#1e40af" />
                Active
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="btn btn-sm btn-danger"
              >
                IsActive
              </Button>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      size="sm"
                      className="bg-transparent hover:bg-transparent"
                    >
                      <IconTrash className="mr-1" size={16} color="#a11821" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Remove User Role</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
          <Separator className="my-2" />
        </Fragment>
      ))}
    </ScrollArea>
  );
}
