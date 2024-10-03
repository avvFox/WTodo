class Setting {
    constructor() {
        this._block = document.querySelector('.setting');
        
        this._pathBG = 'image/';
        this._bgNigh = 'BG_NIGHT.png';
        this._bgDay = 'BG_DAY.png';
        this._bgEvning = 'BG_EVNING.png';
        this._bgMorning = 'BG_MORNING.png';
    }

    get block() {
        return this._block;
    }

    bgUpdate(hours) {
        let url = '';
        let time_for_first = new Date();  
        let time_for_second = new Date();
        time_for_second.setMinutes(0);

        if (hours > 0 && hours < 6) {
            url+= this._bgNigh;
            time_for_second.setHours(6);
        } 
        else if(hours > 6 && hours < 12 ) {
            url+= this._bgMorning;
            time_for_second.setHours(12);
            
        } 
        else if (hours > 12 && hours < 18) {
            url+= this._bgDay;
            time_for_second.setHours(18);
        } 
        else {
            time_for_second.setHours(24);
            url+= this._bgEvning;
        }


        this._block.style.backgroundImage = `url('${this._pathBG}${url}')`;
        setTimeout(() => {
            let now = new Date();
            let now_hours = now.getHours();
            if (now_hours > 0 && now_hours < 6) url+= this._bgNigh;
            else if(now_hours > 6 && now_hours < 12 ) url+= this._bgMorning;
            else if (now_hours > 12 && now_hours < 18) url+= this._bgDay;
            else url+= this._bgEvning;
            this._block.style.backgroundImage = `url('${this._pathBG}${url}')`;
            setInterval(() => {
                let now = new Date();
                let now_hours = now.getHours();
                if (now_hours > 0 && now_hours < 6) url+= this._bgNigh;
                else if(now_hours > 6 && now_hours < 12 ) url+= this._bgMorning;
                else if (now_hours > 12 && now_hours < 18) url+= this._bgDay;
                else url+= this._bgEvning;
                this._block.style.backgroundImage = `url('${this._pathBG}${url}')`;
            }, 1000 * 60 * 60); // рбновление каждые 6 часов 
        }, time_for_second - time_for_first); // обновление фона 
        
        
    }
    


}

export default Setting;