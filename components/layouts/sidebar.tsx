import {
  Dispatch,
  HTMLAttributes,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import { IconChevronsLeft, IconMenu2, IconX } from '@tabler/icons-react';
import Nav from './nav';
import { cn } from '@/shared/lib';
import { Layout } from '@/components/layouts/layout';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import useSideLinks from '@/hooks/use-side-links';
import { useRouter } from '@/shared/configs/i18n/routing';
import { pageRoutes } from '@/shared/routes/pages.route';

interface SidebarProps extends HTMLAttributes<HTMLElement> {
  isCollapsed: boolean;
  setIsCollapsed: Dispatch<SetStateAction<boolean>>;
}

export default function Sidebar({
  className,
  isCollapsed,
  setIsCollapsed,
}: Readonly<SidebarProps>) {
  const [navOpened, setNavOpened] = useState(false);
  const sideLinks = useSideLinks();
  const router = useRouter();

  /* Make body not scrollable when navBar is opened */
  useEffect(() => {
    if (navOpened) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
  }, [navOpened]);

  return (
    <aside
      className={cn(
        `fixed left-0 right-0 top-0 z-50 w-full border-r-2 border-r-muted transition-[width] md:bottom-0 md:right-auto md:h-svh ${isCollapsed ? 'md:w-14' : 'md:w-64'}`,
        className
      )}
    >
      {/* Overlay in mobile */}
      <button
        onClick={() => setNavOpened(false)}
        className={cn(
          `absolute inset-0 transition-[opacity] delay-100 duration-700 w-full bg-black md:hidden`,
          {
            'h-svh opacity-50': navOpened,
            'h-0 opacity-0': !navOpened,
          }
        )}
      />

      <Layout fixed className={navOpened ? 'h-svh' : ''}>
        {/* Header */}
        <Layout.Header
          sticky
          className={`z-50 flex justify-between py-3 shadow-sm md:px-4 ${!isCollapsed ? 'px-4' : '!p-1.5'}`}
        >
          <button
            type="button"
            className={cn(`flex items-center cursor-pointer`, {
              'gap-2': !isCollapsed,
            })}
            onClick={() => router.push(pageRoutes.dashboard)}
          >
            <Image
              src="/images/langgao-logo.svg"
              alt="sidebar-logo"
              width={40}
              height={40}
              className="rounded-full"
              fetchPriority="auto"
              priority
            />
            <div
              className={cn(`flex flex-col justify-end truncate`, {
                'invisible w-0': isCollapsed,
                'visible w-auto': !isCollapsed,
              })}
            >
              <span className="font-medium">Lang Gao Portal</span>
            </div>
          </button>

          {/* Toggle Button in mobile */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            aria-label="Toggle Navigation"
            aria-controls="sidebar-menu"
            aria-expanded={navOpened}
            onClick={() => setNavOpened((prev) => !prev)}
          >
            {navOpened ? <IconX /> : <IconMenu2 />}
          </Button>
        </Layout.Header>

        {/* Navigation links */}
        <Nav
          id="sidebar-menu"
          className={`z-40 h-full flex-1 overflow-auto ${navOpened ? 'max-h-screen' : 'max-h-0 py-0 md:max-h-screen md:py-2'}`}
          closeNav={() => setNavOpened(false)}
          isCollapsed={isCollapsed}
          links={sideLinks}
        />

        {/* Scrollbar width toggle button */}
        <Button
          onClick={() => setIsCollapsed((prev) => !prev)}
          size="icon"
          variant="outline"
          className="absolute -right-5 top-1/2 z-50 hidden rounded-full md:inline-flex"
        >
          <IconChevronsLeft
            stroke={1.5}
            className={`h-5 w-5 ${isCollapsed ? 'rotate-180' : ''}`}
          />
        </Button>
      </Layout>
    </aside>
  );
}
