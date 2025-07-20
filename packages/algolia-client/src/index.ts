import algoliasearch, { SearchClient, SearchIndex } from 'algoliasearch';

export class AlgoliaClientWrapper {
    private client: SearchClient;
    private index?: SearchIndex;

    private ALGOLIA_APP_ID = process.env.ALGOLIA_APP_ID!;
    private ALGOLIA_ADMIN_API_KEY = process.env.ALGOLIA_ADMIN_API_KEY!;

    constructor(
        private indexName: string,
        private idKey: string | null = null // optional override for objectID key
    ) {
        this.client = algoliasearch(this.ALGOLIA_APP_ID, this.ALGOLIA_ADMIN_API_KEY);
    }

    private getIndex(): SearchIndex {
        if (!this.index) {
            this.index = this.client.initIndex(this.indexName);
        }
        return this.index;
    }

    private resolveObjectID(item: any): string | undefined {
        return (
            (this.idKey && item[this.idKey]) ||
            item.objectID ||
            item.id ||
            item.pk
        );
    }

    async saveItem(newImage: any) {
        const index = this.getIndex();
        const objectID = this.resolveObjectID(newImage);

        if (!objectID) {
            console.warn(`[${this.indexName}] Skipping save: missing objectID`, newImage);
            return;
        }

        const algoliaItem = {
            ...newImage,
            objectID,
        };

        try {
            await index.saveObject(algoliaItem);
            console.log(`[${this.indexName}] Saved/Updated object: ${objectID}`);
        } catch (err) {
            console.error(`[${this.indexName}] Save failed for objectID ${objectID}`, err);
        }
    }

    async deleteItem(oldImage: any) {
        const index = this.getIndex();
        const objectID = this.resolveObjectID(oldImage);

        if (!objectID) {
            console.warn(`[${this.indexName}] Skipping delete: missing objectID`, oldImage);
            return;
        }

        try {
            await index.deleteObject(objectID);
            console.log(`[${this.indexName}] Deleted object: ${objectID}`);
        } catch (err) {
            console.error(`[${this.indexName}] Delete failed for objectID ${objectID}`, err);
        }
    }

    async updateItem({
                         op,
                         newRecord,
                         oldRecord,
                     }: {
        op: string;
        newRecord: any;
        oldRecord: any;
    }) {
        try {
            if (op === 'INSERT' || op === 'MODIFY') {
                await this.saveItem(newRecord);
            } else if (op === 'REMOVE') {
                await this.deleteItem(oldRecord);
            } else {
                console.log(`[${this.indexName}] Skipping unsupported op: ${op}`);
            }
        } catch (error) {
            console.error(`[${this.indexName}] Algolia update error:`, error);
        }
    }
}
