class Weather {

    //https://open-meteo.com/en/docs#latitude=45.0448&longitude=38.976&current=apparent_temperature,weather_code&hourly=&wind_speed_unit=ms&timezone=Europe%2FMoscow&forecast_days=1
    
    constructor() {
        this._city = Weather.getCity();
        this._latitude = Weather.getAllCitiesCoordinates().get(this._city)[0];
        this._longitude =  Weather.getAllCitiesCoordinates().get(this._city)[1];
        this._query = 'https://api.open-meteo.com/v1/forecast?latitude='+this._latitude+'&longitude='+this._longitude+'&current=apparent_temperature,weather_code&wind_speed_unit=ms&timezone=Europe%2FMoscow&forecast_days=1';
        

    }


    static getCity() {
        if (localStorage.getItem('cityNow')) return JSON.parse(localStorage.getItem('cityNow'));
        return 'Краснодар';
    }

    static setCity(city) { // я тут
        try {
            let cities = Weather.getAllCitiesCoordinates();
            if (!cities.get(city)) throw new Error('Добавте город в getAllCitiesCoordinates');
            else localStorage.setItem('cityNow', JSON.stringify(city));
        } catch(e) {
            console.log(e);
        }
    }

    // get temperature() {
    //     return this._temperature;
    // }
    static getAllCitiesCoordinates() {
        let arr = new Map();
        arr.set('Москва', ['55.7522','37.6156']);
        arr.set('Краснодар', ['45.0448', '38.976']);
        arr.set('Санкт Петербург', ['59.9386', '30.3141']);
        
        return arr;
    }

    async getWeather() {
        try {
            let response = await fetch(this._query);
            if (response.status) {    
                let data = await response.json();
                let temp = Math.round(data['current']['apparent_temperature']); ;
                let temp_code = data['current']['weather_code'];
                
                return temp+'° '+Weather.getStrWeather(temp_code);
            }
            else new Error('Ошибка получения ответа от сервера погоды!');
        } catch(e) {
            console.log(e);
        }
    }


    static getStrWeather(code) {
        switch(code) {
            case 0:
                return 'ясно';
            case 1:
                return 'небольщая облачность';
            case 2: 
                return 'переменная облачность';
            case 3: 
                return 'облачно';
            case 45:
                return 'туман'; 
            case 48:
                return 'иней';
            case 51: 
                return 'небольшой моросящий дождь';
            case 53: 
                return 'моросящий дождь';
            case 55: 
                return 'сильный моросящий дождь';
            case 56:
                return 'небольшой моросящий дождь'
            case 57:
                return 'моросящий дождь';
            case 61:
                return 'небольшой дождь';
            case 63:
                return 'дождь';
            case 65:
                return 'сильный дождь';
            case 66:
                return 'ледяной дождь';
            case 67: 
                return 'сильный ледяной дождь';
            case 71:
                return 'небольшой снегопад';
            case 73:
                return 'снегопад';
            case 75:
                return 'сильный снегопад';
            case 77: 
                return 'снежные крупинки';
            case 80:
                return 'слабый ливень';
            case 81:
                return 'ливень'; 
            case 82:
                return 'сильный ливень';
            case 85:
                return 'снег с дождем';
            case 86:
                return 'сильный снег с дождем';
            case 95: 
                return 'гроза';
            case 96: 
                return 'гроза с градом';
            case 99: 
                return 'сильная гроза с градом';
            default:
                return 'ошибка...'; 
        }

    }

    toString() {
        return Weather.getCity();
    }

    

    

}
export default Weather;