import { useLocation } from 'react-router-dom';

import NavMenuItem from '@/components/common/NavMenuItem';
import { ROUTES } from '@/constants/routes';

interface NavigationMenuProps {
  items: {
    to: string;
    label: string;
    notificationCount?: number;
  }[];
}

const NavigationMenu = ({ items }: NavigationMenuProps) => {
  const location = useLocation();

  const isActive = (path: string) => {
    if (location.pathname === path) {
      return true;
    }

    if (path === ROUTES.MYPAGE.INVESTOR.FOLLOWING.FOLDERS) {
      return (
        location.pathname.startsWith(ROUTES.MYPAGE.INVESTOR.FOLLOWING.FOLDERS) &&
        (location.pathname === ROUTES.MYPAGE.INVESTOR.FOLLOWING.FOLDERS ||
          location.pathname.startsWith('/mypage/investor/following'))
      );
    }

    if (path === ROUTES.MYPAGE.INVESTOR.MYINQUIRY.LIST) {
      return location.pathname.startsWith(path);
    }

    if (path === ROUTES.MYPAGE.TRADER.INQUIRIES.LIST) {
      return location.pathname.startsWith(path);
    }

    return false;
  };

  return (
    <nav>
      <ul>
        {items.map(({ to, label, notificationCount }, idx) => (
          <NavMenuItem
            key={idx}
            to={to}
            label={label}
            isActive={isActive(to)}
            notificationCount={notificationCount}
          />
        ))}
      </ul>
    </nav>
  );
};

export default NavigationMenu;
