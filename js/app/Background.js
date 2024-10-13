class Background {
    constructor() {
        this._block = document.querySelector('.setting');
        
        this._pathBG = 'image/bg/';
        this._bgNigh = 'night.jpg';
        this._bgDay = 'day.jpg';
        this._bgEvning = 'evning.jpg';
        this._bgMorning = 'morning.jpg';
    }

    get block() {
        return this._block;
    }

    bgUpdate() {
        let hours = new Date().getHours();
        
        let url = '';
        if (hours >= 0 && hours <= 5) url+= this._bgNigh;
        else if(hours >= 6 && hours <= 11 ) url+= this._bgMorning;
        else if (hours >= 12 && hours <= 17) url+= this._bgDay;
        else url+= this._bgEvning;

        this._block.style.backgroundImage = `url('${this._pathBG}${url}')`;
    }
    


}

export default Background;