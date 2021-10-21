import { AlertMsgType } from '@state/slices';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

export const getAlertIcon = (alertType: AlertMsgType): IconProp => {
  switch (alertType) {
    case AlertMsgType.AlertSuccess:
      return 'check-circle';
    case AlertMsgType.AlertInfo:
      return 'info-circle';
    case AlertMsgType.AlertWarning:
      return 'exclamation-circle';
    case AlertMsgType.AlertError:
      return 'times-circle';
    default:
      return 'info-circle';
  }
};
