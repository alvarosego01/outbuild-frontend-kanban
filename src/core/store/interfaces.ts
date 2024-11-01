import { InteractionsState_I } from "./reducers/interactionsSlice";
import { uiState_I } from "./reducers/uiSlice";



export interface Core_Reducers_I {
    _global: {
        ui: uiState_I;
        interactions: InteractionsState_I
    }
}


