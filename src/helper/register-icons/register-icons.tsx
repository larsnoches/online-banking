import {
  faCheckCircle,
  faCrow,
  faExclamationCircle,
  faInfoCircle,
  faLock,
  faMoneyBillAlt,
  faMoneyCheck,
  faSignOutAlt,
  faTimesCircle,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';

export default function registerIcons(): void {
  library.add(
    faCrow,
    faUser,
    faLock,
    faTimesCircle,
    faMoneyCheck,
    faMoneyBillAlt,
    faSignOutAlt,
    faCheckCircle,
    faInfoCircle,
    faExclamationCircle,
  );
}
