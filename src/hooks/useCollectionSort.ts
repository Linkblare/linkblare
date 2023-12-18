import { type SortInput } from "@/types/SortInput";
import useSort from "./useSort";

export const collectionSortMap: SortInput[] = [
    {
        lable: 'Updated',
        key: 'updated',
        sortValue: {
            'itemsUpdated': 'asc'
        }
    },

    {
        lable: 'Recent',
        key: 'recent',
        sortValue: {
            'createdAt': 'desc',
        },
        default: true
    },

    {
        lable: 'Most Saved',
        key: 'saved',
        sortValue: {
            'saves': {
                _count: 'desc'
            }
        }
    }
];


export const useCollectionSort = () => {
    return useSort(collectionSortMap);
};