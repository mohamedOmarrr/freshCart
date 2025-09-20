import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../../shared/services/login-service';

export const loggedGurdGuard: CanActivateFn = (route, state) => {

  const logService = inject(LoginService)
  const router = inject(Router)

  if(logService.getToken()){
    return router.parseUrl('/home')
  }else{

    return true;
  }
};
