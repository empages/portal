export const keyMixin = {
    methods: {
        isKeyValid(event: any): boolean {
            event = (event) ? event : window.event;
            const charCode = (event?.which) ? event.which : event.keyCode;
            if ((charCode >= 48 && charCode <= 57) ||
                (charCode >= 65 && charCode <= 90) ||
                (charCode >= 97 && charCode <= 122) ||
                charCode === 95 || charCode === 32) {
                return true;
            }
            else {
                event.preventDefault();
                return false;
            }
        },
        transformKeyInput(event: Event): string {
            const target = event.target as HTMLInputElement;
            let input = target.value.toUpperCase();
            input = input.replace(/ /g, "_");

            return input;
        }
    }
}
