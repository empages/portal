import {ContentKeyContent} from "@/models/content-key-content";

export interface StaticContentKey {
    id: number;
    key: string;
    staticContentList: Array<ContentKeyContent>;
}
