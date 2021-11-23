import {ContentKeyContent} from "@/models/content-key-content";

export class StaticContentKey {
    id: number;
    key: string;
    staticContentList: Array<ContentKeyContent>;
}
