import KitchenObj from './kitchenObj.js';

const date = document.getElementById('date');
const env_temp = document.getElementById('env_temp');
const smoke = document.getElementById('smoke');
const brightness = document.getElementById('brightness');

const btnExtract = document.getElementById('btnExtract');
const btnStove = document.getElementById('btnStove');
const btnOven = document.getElementById('btnOven');
const btnWeight = document.getElementById('btnWeight');
const btnLight = document.getElementById('btnLight');
const btnClear = document.getElementById('btnClear');

const inpConsole = document.getElementById('inpConsole')
const btnConsole = document.getElementById('btnConsole')
const tConsole = document.getElementById('tConsole');

// Initialize kitchen objects
const Stove = new KitchenObj(document.getElementById('stove'));
const Oven = new KitchenObj(document.getElementById('oven'));
const Weight = new KitchenObj(document.getElementById('weight'));
const Light = new KitchenObj(document.getElementById('light'));
const Extractor = new KitchenObj(document.getElementById('extract'));

// Initialize variables
let stop = false;
let max_env = 0;
let smoke_lvl = 0;
let brightness_lvl = 'No data';

let timeFast = setInterval(() => {
    let today = new Date();
    // Get the today's date and set it into input date
    date.value = today.toISOString().substring(0, 10);
    let hour = today.getHours();

    if (!stop) {
        if (hour < 7) {
            max_env = 1.5;
            brightness_lvl = 'Bajo';
        } 
        else if (hour < 12) {
            max_env = 3.5;
            brightness_lvl = 'Medio';
        } 
        else if (hour < 16) {
            max_env = 6;
            brightness_lvl = 'Alto';
        } 
        else if (hour < 18) {
            max_env = 6;
            brightness_lvl = 'Medio';
        }
        else if (hour < 21) {
            max_env = 5;
            brightness_lvl = 'Bajo';
        } 
        else {
            max_env = 4;
            brightness_lvl = 'Bajo';
        }

        btnStove.removeAttribute('disabled');
        btnOven.removeAttribute('disabled');
        btnWeight.removeAttribute('disabled');
        btnLight.removeAttribute('disabled');
        btnExtract.removeAttribute('disabled');

    }
    else {
        max_env = 0;
        smoke_lvl = 0;
        brightness_lvl = 'Sin datos';
        
        Stove.setOn(false);
        Oven.setOn(false);
        Weight.setOn(false);
        Light.setOn(false);
        Extractor.setOn(false);

        btnStove.innerHTML = "Encender";
        btnOven.innerHTML = "Encender";
        btnWeight.innerHTML = "Encender";
        btnLight.innerHTML = "Encender";
        btnExtract.innerHTML = "Extraer";

        btnStove.setAttribute('disabled', true);
        btnOven.setAttribute('disabled', true);
        btnWeight.setAttribute('disabled', true);
        btnLight.setAttribute('disabled', true);
        btnExtract.setAttribute('disabled', true);  
    }


    let temp_env = (Math.random() + 5) * max_env;

    env_temp.innerHTML = `Temperatura ambiental:
        Celsius ${Math.round(temp_env)}° / 
        Farenheit ${Math.round(temp_env * 1.8 + 32)} °F`;

    smoke.innerHTML = `Nivel de Humo: ${smoke_lvl}`;
    brightness.innerHTML = `Nivel de luminosidad: ${brightness_lvl}`;

    let temp_stove = randomIntBetween(100,110);
    let temp_oven = randomIntBetween(100,110);
    let weight_rand = randomIntBetween(400,500);
    
    if (Stove.isOn) {
        Stove.setText(
            `Temperatura de Estufa:
            Celsius ${temp_stove}° / 
            Farenheit ${Math.round(temp_stove * 1.8 + 32)}°F`
        );
        smoke_lvl += randomIntBetween(5,10);
    }

    if (Oven.isOn) {
        Oven.setText(
            `Temperatura de Horno:
            Celsius ${temp_oven}° / 
            Farenheit ${Math.round(temp_oven * 1.8 + 32)}°F`
        );
        smoke_lvl += randomIntBetween(3,5);
    }

    if (!Oven.isOn && !Stove.isOn) {
        if (smoke_lvl > 0) smoke_lvl -= randomIntBetween(2,6);
        else smoke_lvl = 0;
    }

    if (Weight.isOn) {
        Weight.setText(`Bascula: ${Math.round(weight_rand)} gr`);
    }

    if (Light.isOn) {
        Light.setText(`Luces encendidas`);
    }

    
    if (smoke_lvl > 45) {
        Extractor.setOn(true);
        btnExtract.innerHTML  = "Detener";
        tConsole.innerHTML += `Extractor is now: ON<br>`;
    }
    if (Extractor.isOn) {
        Extractor.setText(`Extrayendo...`);
        smoke_lvl -= randomIntBetween(12, 18);

        if (smoke_lvl < 20) {
            Extractor.setOn(false);
            btnExtract.innerHTML  = "Extraer";
            tConsole.innerHTML += `Extractor is now: OFF<br>`;
        }
    }

    // Print in console
    if (!stop) {
        tConsole.innerHTML += `
            <b>[${today.toISOString().substring(0, 10)} ${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}]</b>
            Env_Temp: ${Math.round(temp_env)} | Smk_Lvl: ${smoke_lvl} | Bright_Lvl: ${brightness_lvl}
            <br>
        `;
    }

    // Scroll the console to bottom
    tConsole.scrollTop = tConsole.scrollHeight;

}, 1500);

btnExtract.addEventListener('click', (e) => {
    Extractor.toggle();

    Extractor.isOn ? btnExtract.innerHTML  = "Detener" : btnExtract.innerHTML = "Extraer";

    tConsole.innerHTML += `Extractor is now: ${Extractor.isOn ? 'ON' : 'OFF'}<br>`;
});

btnStove.addEventListener('click', (e) => {
    Stove.toggle();

    Stove.isOn ? btnStove.innerHTML = "Apagar" : btnStove.innerHTML = "Encender";

    tConsole.innerHTML += `Stove is now: ${Stove.isOn ? 'ON' : 'OFF'}<br>`;
});

btnOven.addEventListener('click', (e) => {
    Oven.toggle();

    Oven.isOn ? btnOven.innerHTML = "Apagar" : btnOven.innerHTML = "Encender";
    
    tConsole.innerHTML += `Oven is now: ${Oven.isOn ? 'ON' : 'OFF'}<br>`;
});

btnWeight.addEventListener('click', (e) => {
    Weight.toggle();

    Weight.isOn ? btnWeight.innerHTML = "Apagar" : btnWeight.innerHTML = "Encender";

    tConsole.innerHTML += `Weight is now: ${Weight.isOn ? 'ON' : 'OFF'}<br>`;
});

btnLight.addEventListener('click', (e) => {
    Light.toggle();

    Light.isOn ? btnLight.innerHTML = "Apagar" : btnLight.innerHTML = "Encender";

    tConsole.innerHTML += `Light is now: ${Light.isOn ? 'ON' : 'OFF'}<br>`;
});

btnStop.addEventListener('click', (e) => {
    stop = !stop;
    stop ? btnStop.innerHTML = "Reanudar" : btnStop.innerHTML = "Parar";
    
    tConsole.innerHTML += `${stop ? 'STOPPING...' : 'RESUMING...'}<br>`;
});

btnClear.addEventListener('click', (e) => {
    tConsole.innerHTML = ``;
    inpConsole.value = ``;
});

// Send commands
formConsole.addEventListener('submit', (e) => {
    e.preventDefault();

    if(inpConsole.value == '') return;

    switch(inpConsole.value.toUpperCase().trim()) {
        case '/SHUTDOWN STOVE':
            Stove.setOn(false);
            btnStove.innerHTML = "Encender";
            tConsole.innerHTML += `<b>TURNING OFF: STOVE</b><br>`;
            inpConsole.value = '';
            break;
        case '/SHUTDOWN OVEN':
            Oven.setOn(false);
            btnOven.innerHTML = "Encender";
            tConsole.innerHTML += `<b>TURNING OFF: OVEN</b><br>`;
            inpConsole.value = '';
            break;
        case '/SHUTDOWN WEIGHT':
            Weight.setOn(false);
            btnWeight.innerHTML = "Encender";
            tConsole.innerHTML += `<b>TURNING OFF: WEIGHT</b><br>`;
            inpConsole.value = '';
            break;
        case '/SHUTDOWN LIGHT':
            Light.setOn(false);
            btnLight.innerHTML = "Encender";
            tConsole.innerHTML += `<b>TURNING OFF: LIGHT</b><br>`;
            inpConsole.value = '';
            break;
        case '/SHUTDOWN EXTRACTOR':
            Extractor.setOn(false);
            btnExtract.innerHTML = "Extraer";
            tConsole.innerHTML += `<b>TURNING OFF: EXTRACTOR</b><br>`;
            inpConsole.value = '';
            break;
        case '/STOP':
            stop = true;
            tConsole.innerHTML += `<b>STOPPING...</b><br>`;
            btnStop.innerHTML = "Reanudar";
            inpConsole.value = '';
            break;
        case '/NO SHUTDOWN STOVE':
            Stove.setOn(true);
            btnStove.innerHTML = "Apagar";
            tConsole.innerHTML += `<b>TURNING ON: STOVE</b><br>`;
            inpConsole.value = '';
            break;
        case '/NO SHUTDOWN OVEN':
            Oven.setOn(true);
            btnOven.innerHTML = "Apagar";
            tConsole.innerHTML += `<b>TURNING ON: OVEN</b><br>`;
            inpConsole.value = '';
            break;
        case '/NO SHUTDOWN WEIGHT':
            Weight.setOn(true);
            btnWeight.innerHTML = "Apagar";
            tConsole.innerHTML += `<b>TURNING ON: WEIGHT</b><br>`;
            inpConsole.value = '';
            break;
        case '/NO SHUTDOWN LIGHT':
            Light.setOn(true);
            btnLight.innerHTML = "Apagar";
            tConsole.innerHTML += `<b>TURNING ON: LIGHT</b><br>`;
            inpConsole.value = '';
            break;
        case '/NO SHUTDOWN EXTRACTOR':
            Extractor.setOn(true);
            btnExtract.innerHTML = "Detener";
            tConsole.innerHTML += `<b>TURNING ON: EXTRACTOR</b><br>`;
            inpConsole.value = '';
            break;
        case '/RESUME':
            stop = false;
            tConsole.innerHTML += `<b>RESUMING...</b><br>`;
            btnStop.innerHTML = "Parar";
            inpConsole.value = '';
            break;
        case '/TANUKI':
            tConsole.innerHTML += `<br><br>   
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@<br>
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@<br>
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@<br>
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@<br>
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@<br>
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@&@**..................*@@@@@@@@@@@@@@@..@@.@@@@@<br>
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*@ ......@@@@@@@@@@@@@@@@@@@@@@@@@@@@....@@@@@@@@.@,.@@@@@@<br>
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@,...@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@..@@@@@@@@@@@@@@@@@<br>
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@...*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@...(@@@@..@@@@@@@@@@@@@@@@<br>
@@@@@@@@@@@@@@@@@@@@@@@@@@@@...&@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@,@@@*.@@@.#@@@@@@@@@@@@@@@@<br>
@@@@@@@@@@@@@@@@@@@@@@@@...@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@/..(@@@..@@@@@@@@@@@@@@@@@<br>
@@@@@@@@@@@@@@@@@@@@*..%@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@..@@@@@@@@@@@@@@@@@@<br>
@@@@@@@@@@@@@@@@@...@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@..@@@@@@@@@@@@@@@@@@@@<br>
@@@@@@@@@@@@@@..#@@@@@@@@@@@..*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@..,@@@@@@@&...@@@@@@@@@@@@@@@@@@@@<br>
@@@@@@@@@@&../@@@@@@@@@@@@@,.@@@(...&@@@&..................&&...%@@@,...@&..,@&.@..../@@@@@@@@@@@@@@<br>
@@@@@@@@..*@@@@@@@@@@@@@@@@,.@@@@@@@@,./@@@@@@@@@@@@@@@@@@@@@@@@@@@@@...@@@@@@&..%@@@..@@@@@@@@@@@@@<br>
@@@@@...@@@@@@@@@@@@@@@@@@@#.@@@@@@@@@@(@@@@@@@@@@@@@@@@@@@@@@@@@@@@@...@@@@@@..@..*..@@@@@@@@@@@@@@<br>
@@@..*@@@@@@@@@@@@@@@@@@@@@..&@@@@@@@@@@@@@@@%............*(@@@@@@@@@@....,@@..@@@@@@@@@@@@@@@@@@@@@<br>
@#..@@@@@@@@@@@@@@@@@@@@@.../@@@@@@@&...@@@@@@@@@@@@@@@@@@@@.....,@@%./@@@@*..@@@@@@@@@@@@@@@@@@@@@@<br>
@..@@@@@@@@@@@@@@@@@..@@...@@@@@@@&..@@@.....@@@@@@.......@.........@..@@@@..@@@@@@@@@@@@@@@@@@@@@@@<br>
@...@@@@@@@@@@@@@@@@@....,@@@@@@@@..@@@.....@....,@@@@@@@&..... ...@@@@.....,@@@@@@@@@@@@@@@@@@@@@@@<br>
@@@@@@@...............(.....*@@@@@@@.......(@@@@@@@@@@@@@@@@@@@@@@@@@@@..@@*.%@@@@@@@@@@@@@@@@@@@@@@<br>
@@@@@##########################...,##################################@@@@@@%######..@@@@@@@@@@@@@@@@<br>
@@@@@........................................................................................@@@@@@@<br>
@@@@@@@@@@@@@@@..@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@..@@@@@@@@@@@@@@@@<br>
@@@@@@@@@@@@@@@..@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@..@@@@@@@@@@@@@@@@<br>
@@@@@@@@@@@@@@@..@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@........./@@@@@@@@<br>
@@@@@............@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@...@@@@@..@@@@@@@@<br>
@@@@@..@@@@@@@@..@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@..@@@@@@..@@@@@@@@<br>
@@@@@..@@@@@@@@..@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@..,@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@..@@@@@@..&@@@@@@@<br>
@@@@@..@@@@@@@@..@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@....@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@..@@@@@@..&@@@@@@@<br>
@@@@@..@@@@@@@@..@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@.&#.@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@...@@@@,...@@@@@@@<br>
@@@@@@............@@@@@@@@@@@@@@@@@@@@@@@@@@@@@..@..@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@.....%@@@@@@@@@@@@<br>
@@@@@@@@@@@@@@@...@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@.....@@@@@@@@@@@@@@@@@@@@@@@@@@@@...@@@@@@@@@@@@@@@<br>
@@@@@@@@@@@@@@@..,@@@@@@@@@@@@@@@@@@@@@@@@@/.@@@@@@..&...@@@@@@@@@@@@@@@@@@@@@@@@@@..@@@@@@@@@@@@@@@<br>
@@@@@@@@@@@@@@@..,@@@@@@@@@@@@@@@@@@@@@@@@..@.@@@@@..@@@@@..@@@@@@@@@@@@@@@@@@@@@@@..@@@@@@@@@@@@@@@<br>
@@@@@@@@@@@@@@@..,@@@@@@@@@@@@@@@@@@@@@@@(.(@@%....,@@@@@@@@.@@@@@@@@@@@@@@@@@@@@@@..@@@@@@@@@@@@@@@<br>
@@@@@@@@@@@@@@@..,@@@@@@@@@@@@@@@@@@@@@@@@..@@@@@@@@@@@@@@@@@.@@@@@@@@@@@@@@@@@@@@@..@@@@@@@@@@@@@@@<br>
@@@@@@@@@@@@@@@&..@@@@@@@@@@@@@@@@@@@@@@@@@..@@@@@@@@@@@@@@@..@@@@@@@@@@@@@@@@@@@@@..@@@@@@@@@@@@@@@<br>
@@@@@@@@@@@@@@@@@@..@@@@@@@@@@@@@@@@@@@@@@@@,..@@@@@@@@@@@/.#@@@@@@@@@@@@@@@@@@@@..@@@@@@@@@@@@@@@@@<br>
@@@@@@@@@@@@@@@@@@@@#...%%%%%&&&%@@@@@%%%%%%%%%...#@@@@...,@@@@@@@@@@@@@@@@@@@@..@@@@@@@@@@@@@@@@@@@<br>
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@(@@@@@@@@@@@@@@@@@@@@@<br>
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@<br>
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@<br>
            <br><br>`;
            inpConsole.value = '';
            break;
        case '/HELP':
            tConsole.innerHTML += `<center><br><b>THIS ARE ALL COMMANDS FOR TANUKITCHEN MODULE SMART KITCHEN:</b><br>`;
            tConsole.innerHTML += `<b>/STOP: EMERGENCY STOP</b><br>`;
            tConsole.innerHTML += `<b>/RESUME: RESUME ALL PROCESS</b><br>`;
            tConsole.innerHTML += `<b>/NO SHUTDOWN <UTIL>: TURN ON THE UTIL</b><br>`;
            tConsole.innerHTML += `<b>/SHUTDOWN <UTIL>: TURN OFF THE UTIL</b><br>`;
            tConsole.innerHTML += `<b>UTILS: STOVE / OVEN / WEIGHT / LIGHT / EXTRACTOR</b><br><br></center>`;
            inpConsole.value = '';
            break;
        default:
            tConsole.innerHTML += `<b style="color: red">ERROR: "${inpConsole.value.trim()}
            " IS AN INVALID COMMAND <br>PLEASE USE /HELP TO GET HELP<br></b>`
    }
});


function randomIntBetween(min, max) {
    return Math.floor(Math.random()*(max - min + 1)) + min;
}  

