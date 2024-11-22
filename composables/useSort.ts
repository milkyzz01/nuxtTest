import { type countries } from "~/pages/content/dashboard.vue";

export function useSorting(filteredCountries: ComputedRef<countries[]>){

    const selectedSort = ref<'asc' | 'desc'>();

    const sortMethod = computed<countries[]>(() =>{
        const countryData = filteredCountries.value;
        if(!selectedSort.value) {
            return countryData
        }
        return [...countryData].sort((a, b) => {
            const newA = a.name.toLowerCase();
            const newB = b.name.toLowerCase();

            if(selectedSort.value === 'asc'){
                return newA.localeCompare(newB);
            }
            if(selectedSort.value === 'desc'){
                return newB.localeCompare(newA);
            }
            return 0
        })
        })

        return {
            sortMethod, 
            selectedSort
        }
}