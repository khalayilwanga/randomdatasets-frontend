import * as types from '../types'

const datesListGenerator = (dataPoints) =>{

    const start = new Date(2022, 9, 11)
    const startDate = start.getDate()
    let i = 0
    let datesList = []
    const options = {month: 'short',}
    
    while (i<dataPoints){
        
        let currentDate = new Date(start.setDate(parseInt(startDate + i)))
        let currentMonth = new Intl.DateTimeFormat('en-US', options).format(currentDate)
        datesList.push(`${currentDate.getDate()} ${currentMonth}`);
        i++;   
    }
    
    return datesList

}



const reducer =(state =datesListGenerator(5), action)=> {
    switch(action.type){
        case types.UPDATE_DATES:
            return datesListGenerator(action.payload)

        default:
            return state;
            
    }
}
export default reducer;