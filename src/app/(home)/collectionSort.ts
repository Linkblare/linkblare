import { SortInput } from "@/types/SortInput";

export const collectionSortMap: SortInput[] = [
    {
        lable: 'Updated',
        key: 'updated',
        sortValue: {
            'itemsUpdated': 'desc'
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