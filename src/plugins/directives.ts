export default {
    install: (app: any) => {
        app.directive('strong', {
            mounted(el: HTMLElement) {
                el.innerHTML = el.innerHTML.replace(/\*\*(.*?)\*\*/g, (value) => `<strong>${value.substr(2, value.length - 4)}</strong>`);
            }
        })
    }
}
