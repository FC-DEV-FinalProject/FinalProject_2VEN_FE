export type UserRole = 'ROLE_INVESTOR' | 'ROLE_TRADER' | 'ROLE_ADMIN';

export interface HomeRouteState {
  userRole?: UserRole;
}
