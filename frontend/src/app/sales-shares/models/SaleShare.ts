import {SALE_SOURCE, SALE_STATE, SALE_ACTION_STATE} from './enums';
import {School} from './School';

export class SaleShare {
  id?: number;
  dt_created?: string;
  dt_update?: string;
  amount_signed?: number;
  dt_next_action: string;
  sale_state: SALE_STATE;
  comment: string;
  sale_source: SALE_SOURCE;
  sale_action_state: SALE_ACTION_STATE;
  school: School;
  // attachment: any;
}
