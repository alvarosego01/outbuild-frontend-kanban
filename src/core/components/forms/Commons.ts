
import { Validations_Type } from "./interfaces";


export const is_required = (rule: Validations_Type) => {


    return rule === "required" || rule === 'select_multi_required' || rule === 'select_single_required' || rule === 'conditional_select_multi_required';

}