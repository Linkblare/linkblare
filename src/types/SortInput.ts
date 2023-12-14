import { type Sort } from "@/schema/_helpers/WithSorting";

export type SortInput = {
    lable: string;
    key: string;
    sortValue: Sort
    default?: boolean
}