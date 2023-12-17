import { type SortInput } from "@/types/SortInput";
import useSort from "./useSort";

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


export const useItemSort = () => {
    return useSort(itemSortInputs);
};