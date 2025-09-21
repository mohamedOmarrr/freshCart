import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../../shared/services/login-service';

export const authGurdGuard: CanActivateFn = (route, state) => {
  const logService = inject(LoginService);
  const router = inject(Router);

  if (logService.getToken()) {

    return true;
  } else {

  router.navigate(['/sign'], {
    state: {
      toast: {
        severity: 'warn',
        summary: 'Login required',
        detail: 'You have to log in before opening this page'
      },
      source: 'guard'
    }
  });

  return false;
  }
};
