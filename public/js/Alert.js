
class Alert {
    constructor(message) {
        this.message = message;
        this.element = document.createElement('div');
        
        let alertBody = document.createElement('p');
        alertBody.innerText = message;

        this.element.append(alertBody);
    }
}
