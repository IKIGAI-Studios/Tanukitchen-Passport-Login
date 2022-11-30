class KitchenObj {
    constructor(htmlElement) {
        this.html = htmlElement;
        this.text = 'Este dispositivo está apagado';
        this.isOn = false;

        this.setText(this.text);
    }

    toggle() {
        this.isOn = !this.isOn;
        this.isOn ? this.setText('Recopilando datos...') : this.setText('Este dispositivo está apagado');
    }

    setOn(val) {
        this.isOn = val;
        this.isOn ? this.setText('Recopilando datos...') : this.setText('Este dispositivo está apagado');
    }

    setText(txt) {
        this.text = txt;
        this.html.innerHTML = this.text;
    }
}

export default KitchenObj;