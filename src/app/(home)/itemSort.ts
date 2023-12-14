import { SortInput } from "@/types/SortInput";

export const itemSortInputs: SortInput[] = [
   
    {
        lable: 'Recent',
        key: 'recent',
        sortValue: {
            'createdAt': 'desc',
        },
        default: true
    },

    {
        lable: 'Most Liked',
        key: 'saved',
        sortValue: {
            'likes': {
                _count: 'desc'
            }
        }
    }
];