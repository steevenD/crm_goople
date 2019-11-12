import {SALE_SOURCE, SALE_STATE, SALE_ACTION_STATE} from './enums';
import {School} from './School';

export class SaleShare {

  dt_created?: String;
  dt_update?: String;
  amount_signed?: Number;
  dt_next_action: String;
  sale_state: SALE_STATE;
  comment: String;
  sale_source: SALE_SOURCE;
  sale_action_state: SALE_ACTION_STATE;
  school: School;
}
