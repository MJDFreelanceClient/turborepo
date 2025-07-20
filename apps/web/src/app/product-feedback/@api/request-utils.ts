import { ProductRequest } from "./types";

export const getCategories = (data:ProductRequest[]) => {
    return data.map(request => request.category);
};

export const getStatuses = (data:ProductRequest[]) => {
    return data.map(request => request.status);
};

export const requestFilter = (value:any) => ({
    byCategory: (item:ProductRequest) => !value || item.category === value,
    byStatus: (item:ProductRequest) => !value || item.status === value,
})

export const requestSort = {
    byMostUpvotes: {
        displayName: "Most Upvotes",
        fn: (a:any,b:any) => a.upvotes - b.upvotes
    },
    byLeastUpvotes: {
        displayName: "Least Upvotes",
        fn: (a:any,b:any) => b.upvotes - a.upvotes
    }
}