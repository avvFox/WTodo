import HeaderOptionBlock from './HeaderOptionBlock.js';
import Weather from './Weather.js';

class HeaderBlock {

    constructor() {
        this._appWeather = new Weather();
        
        this._header = document.createElement('header');
        this._header.classList.add('header');

        this._header.prepend(this.timeBlock);
        this._header.append(this.weatherBlock);

        this.listenInput();

    }

    get timeBlock() {
        this._time = document.createElement('div');
        this._time.classList.add('date', 'abstract-block');
        
        this._time_title = document.createElement('h4');
        this._time_title.classList.add('date__time');
        this._time_title.innerHTML = this.getTimeNow();
        setInterval(() => {
            this._time_title.innerHTML = this.getTimeNow();
        }, 1000);
        
        this._time_day_of_week = document.createElement('div');
        this._time_day_of_week.classList.add('date__day-of-the-week');
        this._time_day_of_week.innerHTML = this.getDate(); 
        
        this._time.prepend(this._time_title);
        this._time_title.after(this._time_day_of_week);
        return this._time;
    }

    get weatherBlock() {
        this._weather = document.createElement('div');
        this._weather.classList.add('cw', 'abstract-block');
        
        this._weather_form = document.createElement('form');
        this._weather_form.method = 'POST';
        this._weather_form.action = '#';
        this._weather_form.name = 'editCity';

        this._weather_input = document.createElement('input');
        this._weather_input.value = this._appWeather;  // город
        this._weather_input.name = 'cities';
        this._weather_input.classList.add('cw__city');
        this._weather_input.setAttribute('list', 'cities');

        this._weather_title = document.createElement('h3');
        this._weather_title.innerHTML = 'температура и описание погоды';// погода
        this.updateWeather();

        this._weather_title.classList.add('cw__weather');        

        this._weather_datalist = document.createElement('datalist');
        this._weather_datalist.id = 'cities';
    
        

        this._weather.prepend(this._weather_form);
        this._weather_form.prepend(this._weather_input);
        this._weather_input.after(this._weather_datalist);
        this._weather_form.after(this._weather_title);

        this._weather_datalist.append(new HeaderOptionBlock('Краснодар').html);
        this._weather_datalist.append(new HeaderOptionBlock('Москва').html);
        this._weather_datalist.append(new HeaderOptionBlock('Санкт Петербург').html);
        
        return this._weather;
    }

    get html() {
        return this._header;
    }

    getTimeNow() {
        let timeConvert = new Intl.DateTimeFormat('ru-RU', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        });
        
        let formattedTime = timeConvert.format(new Date());
        return formattedTime;
    }

    getDate() {
        const now = new Date();
        let dateConverter = new Intl.DateTimeFormat('ru-RU', {
            day: 'numeric',
            month: 'long',
            weekday: 'long',
            
            
            
        });
        let str = dateConverter.format(now);
        let arr = str.split(',');
        return arr[1]+', '+arr[0];
    }

    listenInput() {

        this._weather_form.addEventListener('submit', (event) => {
            event.preventDefault();
            Weather.setCity(this._weather_input.value);
            this._appWeather = new Weather();
            
            this.updateWeather();
        });

        this._weather_form.addEventListener('change', (event) => {
            event.preventDefault();
            Weather.setCity(this._weather_input.value);
            this._appWeather = new Weather();
            
            this.updateWeather();
        });

    }

    updateWeather(update_min = 30) {
        this._appWeather.getWeather().then(response => {
            this._weather_title.innerHTML = response;
        });
        setTimeout(() => { this.updateWeather(update_min)}, 1000 * 60 * update_min); // автообновление каждые 
    }



    

}
export default HeaderBlock;