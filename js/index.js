"use strict";
import AbstractBlock from './AbstractBlock.js';
import MyDate from './MyDate.js';
import Setting from './Setting.js';
import TodoList from './TodoList.js';
import Weather from './Weather.js';

// Блок времени и даты
let my_date = new MyDate();
my_date.time = MyDate.getTime(new Date());
my_date.week = MyDate.getDay(new Date());


//Блок setting
let setting = new Setting();



let updateInterval = 1000 * 60 * 30; // каждые 30 минут
setInterval(() => {
    setting.bgUpdate();
},updateInterval);
setting.bgUpdate();


//Обновление времени каждую секунду 
function updateSecond() {
    my_date.time = MyDate.getTime(new Date());
    setTimeout(updateSecond, 1000);    
}
setTimeout(updateSecond, 1000);
TodoList.start();
Weather.start();


