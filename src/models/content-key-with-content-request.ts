import {ContentKeyContent} from "@/models/content-key-content";

export interface ContentKeyWithContentRequest {
    key: string;
    staticContentList: Array<ContentKeyContent>
}
