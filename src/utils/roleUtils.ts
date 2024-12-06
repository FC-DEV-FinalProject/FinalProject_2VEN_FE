import { ROLE_ADMIN, ROLE_TRADER } from '@/constants/roles';
import { UserRole } from '@/types/route';

export const isValidAdminOrTraderRole = (role?: UserRole): boolean =>
  role === ROLE_TRADER || role === ROLE_ADMIN;
