'use client'

import ReactImage from '@/components/ui/image'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { IconDots, IconUserCog } from '@tabler/icons-react'
import { cn } from '@/shared/lib'
import { useModal } from '@/hooks/use-modal'
import { Role } from '@/types/roles-permissions.type'
import { useGetUsersByRole } from '@/app/[locale]/(root)/roles-permissions/_hooks/use-users'
import {
    avatarIds,
    getRandomArrayElement,
} from '@/shared/data/roles-permissions.data'
import { memo, ReactElement, useMemo } from 'react'
import UserRoleManagement from '@/app/[locale]/(root)/roles-permissions/_components/user-role-management'

interface RoleCardProps {
    role: Role
    className?: string
}

const RoleCard = memo(({ role, className }: RoleCardProps) => {
    const { openModal } = useModal()
    const { data: users } = useGetUsersByRole(role.roleCode)

    const memoizedUsers: ReactElement = useMemo(() => {
        return (
            <div className="mt-4 flex items-center gap-2 min-h-[32px]">
                <div className="flex items-center">
                    {users?.slice(0, 4).map((user) => (
                        <figure
                            key={user.userName}
                            className="relative z-10 -ml-1.5 h-8 w-8 rounded-full border-2 border-white"
                        >
                            <ReactImage
                                src={`https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-${getRandomArrayElement(avatarIds)}.webp`}
                                alt="user avatar"
                                fill
                                sizes="100% 100%"
                                imgClassName="rounded-full object-cover"
                            />
                        </figure>
                    ))}
                </div>
                <span>Total {users?.length ?? 0} users</span>
            </div>
        )
    }, [users])

    return (
        <div className={cn('rounded-lg border border-solid p-6', className)}>
            <header className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                    <span
                        className="grid h-10 w-10 place-content-center rounded-lg text-white"
                        style={{
                            backgroundColor: role.color ?? '#9fbd48',
                        }}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                        >
                            <path
                                d="M7 6.5H16.75C18.8567 6.5 19.91 6.5 20.6667 7.00559C20.9943 7.22447 21.2755 7.50572 21.4944 7.83329C21.935 8.49268 21.9916 8.96506 21.9989 10.5M12 6.5L11.3666 5.23313C10.8418 4.18358 10.3622 3.12712 9.19926 2.69101C8.6899 2.5 8.10802 2.5 6.94427 2.5C5.1278 2.5 4.21956 2.5 3.53806 2.88032C3.05227 3.15142 2.65142 3.55227 2.38032 4.03806C2 4.71956 2 5.6278 2 7.44427V10.5C2 15.214 2 17.5711 3.46447 19.0355C4.8215 20.3926 6.44493 20.4927 10.5 20.5H11"
                                stroke="currentColor"
                                strokeWidth="1.3"
                                strokeLinecap="round"
                            />
                            <path
                                d="M15.59 18.9736C14.9612 19.3001 13.3126 19.9668 14.3167 20.801C14.8072 21.2085 15.3536 21.4999 16.0404 21.4999H19.9596C20.6464 21.4999 21.1928 21.2085 21.6833 20.801C22.6874 19.9668 21.0388 19.3001 20.41 18.9736C18.9355 18.208 17.0645 18.208 15.59 18.9736Z"
                                stroke="currentColor"
                                strokeWidth="1.3"
                            />
                            <path
                                d="M20 14.4378C20 15.508 19.1046 16.3756 18 16.3756C16.8954 16.3756 16 15.508 16 14.4378C16 13.3676 16.8954 12.5 18 12.5C19.1046 12.5 20 13.3676 20 14.4378Z"
                                stroke="currentColor"
                                strokeWidth="1.3"
                            />
                        </svg>
                    </span>
                    <h4 className="font-medium">
                        {role.roleName?.toLocaleUpperCase()}
                    </h4>
                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="ghost"
                            className="relative h-8 rounded-full w-auto hover:bg-transparent"
                        >
                            <IconDots size={25} />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className="w-56"
                        align="end"
                        forceMount
                    >
                        <DropdownMenuGroup>
                            <DropdownMenuItem>Add User</DropdownMenuItem>
                            <DropdownMenuItem>Rename</DropdownMenuItem>
                            <DropdownMenuItem>Remove Role</DropdownMenuItem>
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
            </header>

            {memoizedUsers}
            <Button
                type="button"
                onClick={() => {
                    openModal({
                        isOpen: true,
                        title: 'User Role Management',
                        description: 'Edit the user role management',
                        modalContent: <UserRoleManagement users={[]} />,
                        customSize: 'w-full md:min-w-[800px]',
                    })
                }}
                className="flex flex-row gap-1 w-full mt-4"
                variant="outline"
            >
                <IconUserCog size={20} />
                Edit Role
            </Button>
        </div>
    )
})

RoleCard.displayName = 'RoleCard'
export default RoleCard
