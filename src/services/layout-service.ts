import {HttpService} from "@/services/http-service";
import gateway from "@/gateway";
import type {Layout} from "@/models/layout";

export class LayoutService extends HttpService {
    constructor() {
        super(true);
    }

    async getLayout(): Promise<Layout> {
        return await this.getData<Layout>(gateway.layout.route);
    }
}

const layoutService = new LayoutService();
export default layoutService;
