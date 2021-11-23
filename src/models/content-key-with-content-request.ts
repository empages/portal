import {ContentKeyContent} from "@/models/content-key-content";

export class ContentKeyWithContentRequest {
    key: string;
    staticContentList: Array<ContentKeyContent>
}
