import { Store } from "redux";
import { AppServiceAbstract } from "./BaseServiceAbstract";

export class AuthService extends AppServiceAbstract {
    private static _instance?: AuthService;

    static instance(store?: Store): AuthService {
      if (!AuthService._instance) {
        AuthService._instance = new AuthService();
      }
      AuthService._instance.setReduxStore(store);
      return AuthService._instance;
    }
    async onConnectionChange(is_connected: boolean): Promise<void> {
        if (is_connected) {
            console.log("Connect: ",is_connected);
            
        }
      }
    destroyService(): void {
        console.log("Detroy auth service");
        
    }
}