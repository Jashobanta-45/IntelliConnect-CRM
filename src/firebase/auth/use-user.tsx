'use client';
import { useFirebase } from '@/firebase/provider';

export interface UserHookResult {
  user: ReturnType<typeof useFirebase>['user'];
  isUserLoading: ReturnType<typeof useFirebase>['isUserLoading'];
  userError: ReturnType<typeof useFirebase>['userError'];
}

/**
 * Hook specifically for accessing the authenticated user's state.
 * This provides the User object, loading status, and any auth errors.
 * @returns {UserHookResult} Object with user, isUserLoading, userError.
 */
export const useUser = (): UserHookResult => {
  const { user, isUserLoading, userError } = useFirebase();
  return { user, isUserLoading, userError };
};
