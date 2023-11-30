/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { type Sort } from "@/schema/_helpers/WithSorting"
import { useSearchParams } from "next/navigation";

type SortMap = Record<string, Sort>;

const useSort = (values: SortMap) => {
    const searchParams = useSearchParams();
    const activeKey = Object.keys(values).find(key => searchParams.has(key));
    const activeSort: Sort|undefined|null = activeKey ? values[activeKey] : null;
    return {activeSort}
}   

export default useSort;