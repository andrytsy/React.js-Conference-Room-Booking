import { EDIT_TIME } from '../constants'
import defaultData from '../fixtures' 

export default (state = defaultData, action) => {
    const { type, time, currentDay } = action
    console.log(state, action);
    
    switch (type) {
        case EDIT_TIME:
            return {
                columns: state.slice(),
                editableTime: time,
                currentDay: currentDay || 0
            }
        
        default: 
            return {
                columns: state,
                editableTime: null,
                currentDay: 0
            }
    }
}
