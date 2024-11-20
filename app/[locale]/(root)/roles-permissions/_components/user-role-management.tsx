'use client';

import React, { Fragment } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { IconCheck, IconPencil } from '@tabler/icons-react';
import { Role, UpdateRoleFormData } from '@/types/roles-permissions.type';
import {
  useGetUsersByRole,
  useUpdateUserRole,
} from '@/app/[locale]/(root)/roles-permissions/_hooks/use-users';
import { useTranslations } from 'next-intl';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useForm } from 'react-hook-form';
import { UpdateRoleFormSchema } from '@/app/[locale]/(root)/roles-permissions/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { FilterIcon } from 'lucide-react';

type UserRoleManagementProps = {
  roles: Role[];
  role: Role;
};

export default function UserRoleManagement({
  role,
  roles,
}: Readonly<UserRoleManagementProps>) {
  const t = useTranslations('RoleMessages');
  const tCommon = useTranslations('CommonMessages');

  const form = useForm<UpdateRoleFormData>({
    resolver: zodResolver(UpdateRoleFormSchema),
    defaultValues: {
      role: {
        roleCode: '',
      },
    },
  });

  const { data: users } = useGetUsersByRole(role.roleCode);
  const { status } = useUpdateUserRole(t);

  const onSubmidEditUserRole = async (data: UpdateRoleFormData) => {
    console.log(data);
  };

  return (
    <ScrollArea className="w-full h-[600px] rounded-md border p-4">
      {users?.map((user) => (
        <Fragment key={user.userName}>
          <div className="flex flex-row justify-between items-center min-h-14">
            <span className="text-md font-semibold">
              {user.firstName} {user.lastName}
            </span>
            <div className="flex flex-row gap-2">
              <Button
                variant="outline"
                size="sm"
                className="btn btn-sm btn-primary"
              >
                {user.isActive && (
                  <IconCheck className="mr-1" size={16} color="#1e40af" />
                )}
                {t('active')}
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="btn btn-sm btn-danger"
              >
                {!user.isActive && (
                  <IconCheck className="mr-1" size={16} color="#1e40af" />
                )}
                {t('inactive')}
              </Button>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="btn btn-sm btn-danger"
                    type="button"
                  >
                    <IconPencil size={20} />
                  </Button>
                </PopoverTrigger>
                <PopoverContent>
                  <Form {...form}>
                    <form
                      id="update-user-role"
                      onSubmit={form.handleSubmit(onSubmidEditUserRole)}
                      className="h-full flex flex-col justify-between gap-2"
                    >
                      <div className="mb-4">
                        <FormField
                          name="roleCode"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel htmlFor="roleCode">
                                {t('roleCode')}
                              </FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue
                                      placeholder={t('selectRoleCode')}
                                    />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {roles.map((role) => (
                                    <SelectItem
                                      key={role.roleCode}
                                      value={role.roleCode}
                                    >
                                      {role.roleName}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="flex flex-row gap-2 w-full">
                        <Button
                          size="sm"
                          variant="ringHover"
                          className="w-full"
                          form="update-user-role"
                          type="submit"
                          disabled={status === 'pending'}
                          loading={status === 'pending'}
                        >
                          <FilterIcon size={16} className="mr-2" />
                          {tCommon('btnSave')}
                        </Button>
                      </div>
                    </form>
                  </Form>
                </PopoverContent>
              </Popover>
            </div>
          </div>
          <Separator className="my-2" />
        </Fragment>
      ))}
    </ScrollArea>
  );
}
