/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { type SortInput } from "@/types/SortInput";
import { useSearchParams } from "next/navigation";



const useSort = (values: SortInput[], sortKey = 'sortBy') => {
    const searchParams = useSearchParams();
    const sortKeyValue = searchParams.get(sortKey);
    if(sortKeyValue === null) return {activeSort: undefined};
    const activeSort = values.find(v => v.key === sortKeyValue);
    return {activeSort}
}   

export default useSort;
