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
        key: 'most_liked',
        sortValue: {
            'likes': {
                _count: 'desc'
            }
        }
    }
];