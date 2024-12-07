import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { logout } from '@/actions/login.action';
import { useTranslations } from 'next-intl';
import { useUserStore } from '@/states/common.state';

export function UserNav() {
  const t = useTranslations('LoginMessages');
  const { userInfo } = useUserStore();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/images/logo-freshbunpho.jpg" alt="@minhnn" />
            <AvatarFallback>A</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {t('username')}: <b>{userInfo?.userName ?? ''}</b>
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {t('roleName')}: {userInfo?.roleCode}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {/*<DropdownMenuItem>Profile</DropdownMenuItem>*/}
          {/*<DropdownMenuItem>*/}
          {/*  Billing*/}
          {/*  <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>*/}
          {/*</DropdownMenuItem>*/}
          {/*<DropdownMenuItem>*/}
          {/*  Settings*/}
          {/*  <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>*/}
          {/*</DropdownMenuItem>*/}
        </DropdownMenuGroup>
        {/*<DropdownMenuSeparator />*/}
        <DropdownMenuItem onClick={() => logout()}>
          {t('form.logout')}
          {/*<DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>*/}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
