// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import {getRuntimeInjectionFunction, RUNTIME_INJECTION_STYLE_FILE_NAME, RUNTIME_INJECTION_BUNDLE_FILE_NAME} from "@emeraude-framework/portal-runtime-injection";
import {EmService} from "@/services/em-service";

class RuntimeService extends EmService {
    constructor() {
        super(true);
    }

    public startEmeraudePortal(app: any): void {
        const mountApplication = () => app.mount('#app');
        if (!this.application) {
            mountApplication();
            return;
        }

        try {
            const scriptElement = this.injectRuntimeBundle();
            if (scriptElement) {
                scriptElement.addEventListener('load', () => {
                    this.executeRuntimeInjection(app);
                    mountApplication();
                    this.injectRuntimeStyle();
                })

                scriptElement.addEventListener('error', () => {
                    mountApplication();
                })
            }
        }
        catch (e) {
            console.log(e);
            mountApplication();
        }
    }

    private executeRuntimeInjection(app: any) {
        const runtimeInjectionFunction = getRuntimeInjectionFunction();
        if (runtimeInjectionFunction) {
            const httpClient = {
                get: this.httpClient?.get.bind(this),
                post: this.httpClient?.post.bind(this),
                put: this.httpClient?.put.bind(this),
                delete: this.httpClient?.delete.bind(this)
            };

            runtimeInjectionFunction(app);
            app.provide('$httpClient', httpClient);

            console.info('Emeraude Runtime Injection has been executed');
        }
    }

    private injectRuntimeBundle(): HTMLScriptElement | null {
        if (!this.application) {
            return null;
        }

        const scriptElement = document.createElement('script');
        scriptElement.src = `${this.application.url}/_em/api/runtime-assets/${RUNTIME_INJECTION_BUNDLE_FILE_NAME}?gatewayId=${this.application.gatewayId}`;
        document.head.appendChild(scriptElement);

        return scriptElement;
    }

    private injectRuntimeStyle(): void {
        if (!this.application) {
            return;
        }

        const linkElement = document.createElement('link');
        linkElement.rel = 'stylesheet';
        linkElement.href = `${this.application.url}/_em/api/runtime-assets/${RUNTIME_INJECTION_STYLE_FILE_NAME}?gatewayId=${this.application.gatewayId}`;
        document.head.appendChild(linkElement);
    }
}

const runtimeService = new RuntimeService();

export default runtimeService;
