import {HttpService} from "@/services/http-service";
import gateway from "@/gateway";
import type {EmResponseModel, EmPageCommandResult} from "@/core/types";

export class PageService extends HttpService {
    constructor() {
        super(true);
    }

    async retrieve(route: string): Promise<EmResponseModel> {
        return await this.postData<EmResponseModel>(gateway.pageRetrieve.route, {
            route
        });
    }

    async command(route: string, command: string): Promise<EmPageCommandResult> {
        return await this.postData<EmPageCommandResult>(gateway.pageCommand.route, {
            route,
            command
        });
    }
}

const pageService = new PageService();
export default pageService;
