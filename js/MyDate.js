// ChildClass.js
import AbstractBlock from './AbstractBlock.js';

class MyDate extends AbstractBlock {

    set time(value) {
        super.setEditBlock('.date__time', value);
    }
    
    set week(value) {
        super.setEditBlock('.date__day-of-the-week', value);
    }



    static getTime(date) {
        return date.toLocaleTimeString('ru-RU');
    }

    static getDay(date) {
        const date_week_options = {
            'weekday': 'long',
            'month': 'long',
            'day': 'numeric',
            
        };
        let arr = date.toLocaleDateString('ru-RU', date_week_options).split(',');
        return arr[1]+', '+arr[0];
    }


}
export default MyDate;