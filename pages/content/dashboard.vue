<script setup lang="ts">
//test
import { useQuery } from '@vue/apollo-composable';
import gql from 'graphql-tag';
import { Input } from '@/components/ui/input';
import { MagnifyingGlassIcon } from '@radix-icons/vue'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useSorting } from '~/composables/useSort'

//interfaces
export interface countries {
  code: string;
  name: string;
  emoji: string;
}
export interface fetchedcountries{
  countries: countries[];
}
//end interfaces

//variables
const searchInput = ref();

//computed properties
const filteredCountries = computed(() =>{
  if(!searchInput.value){
    return countries.value;
  } else {
    return countries.value.filter(country => 
      country.name.toLowerCase().includes(searchInput.value.toLowerCase()));
  }
});

// Define the GraphQL query
const GET_COUNTRIES = gql`
  query {
    countries {
      code
      name
      emoji
    }
  }
`;

// get the countries
const { result, loading } = useQuery<fetchedcountries>(GET_COUNTRIES);
const countries = computed(() => result.value?.countries ?? []);
const countryA = computed(() => countries.value.filter((country) => country.name[0] === 'C'));


onMounted(() => {
  console.log(countryA.value.length)
});

//status handler
const status = computed<string>(() => {
  return countryA.value.length < 20 ? 'less than 20' : 'greater than 20';
});

//watchers


//end test

//handle composables
const { selectedSort, sortMethod } = useSorting(filteredCountries);

definePageMeta({
    layout: 'content'
})

</script>

<template>
    <div class="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        <Card>
          <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle class="text-sm font-medium">
              Total Countries
            </CardTitle>
            <DollarSign class="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div class="text-2xl font-bold">
              {{ countries.length }}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle class="text-sm font-medium">
              Countries that Starts with letter A
            </CardTitle>
            <Users class="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div class="text-2xl font-bold">
              {{ countryA.length }}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle class="text-sm font-medium">
              Status
            </CardTitle>
            <CreditCard class="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div class="text-2xl font-bold">
              {{ status }}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle class="text-sm font-medium">
              Active Now
            </CardTitle>
            <Activity class="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div class="text-2xl font-bold">
              +573
            </div>
            <p class="text-xs text-muted-foreground">
              +201 since last hour
            </p>
          </CardContent>
        </Card>
      </div>
      <div class="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
        <Card class="xl:col-span-2 overflow-y-auto">
          <CardContent>
            <!--Search input-->
            <!--Search input and select input wrapper-->
            <div class="flex items-center justify-start gap-5">
            <div class="relative w-full max-w-sm mt-10 items-center">
              <Input id="search" type="text" v-model="searchInput" placeholder="Search..." class="pl-10" />
              <span class="absolute start-0 inset-y-0 flex items-center justify-center px-2">
                <MagnifyingGlassIcon class="size-6 text-muted-foreground" />
              </span>
            </div>
            <!--Select Input-->
            <div class="mt-5">
            <Label for="terms">Sort By:</Label>
            <Select v-model="selectedSort" id="terms">
             <SelectTrigger class="w-[180px]">
               <SelectValue placeholder="Sort By" />
             </SelectTrigger>
             <SelectContent>
               <SelectGroup>
                 <SelectLabel>Sort</SelectLabel>
                 <SelectItem value='asc'>
                   A - Z
                 </SelectItem>
                 <SelectItem value="desc">
                   Z - A
                 </SelectItem>
               </SelectGroup>
             </SelectContent>
            </Select>
          </div>
          </div>
            <!--Table-->
            <div class="overflow-y-auto mt-5 max-h-[50vh] container">
            <Table class="max-h-[100%]">
            <TableCaption v-if="filteredCountries.length">A list of your countries.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Country Code</TableHead>
                <TableHead>Country Name</TableHead>
                <TableHead>Emoji</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody v-if="loading">
              <TableRow class="text-center">
                <TableCell class="col-span-3">Loading ...</TableCell> 
              </TableRow>
            </TableBody>
            <TableBody v-if="filteredCountries.length === 0">
              <TableRow class="text-center">
                <TableCell colspan="3" class="text-center">No results ...</TableCell> 
              </TableRow>
            </TableBody>
            <TableBody>
              <TableRow v-for="invoice in sortMethod" :key="invoice.code">
                <TableCell class="font-medium">
                  {{ invoice.code }}
                </TableCell>
                <TableCell>{{ invoice.name }}</TableCell>
                <TableCell>{{ invoice.emoji }}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Recent Sales</CardTitle>
          </CardHeader>
          <CardContent class="grid gap-8">
            <div class="flex items-center gap-4">
              <Avatar class="hidden h-9 w-9 sm:flex">
                <AvatarImage src="/avatars/01.png" alt="Avatar" />
                <AvatarFallback>OM</AvatarFallback>
              </Avatar>
              <div class="grid gap-1">
                <p class="text-sm font-medium leading-none">
                  Olivia Martin
                </p>
                <p class="text-sm text-muted-foreground">
                  olivia.martin@email.com
                </p>
              </div>
              <div class="ml-auto font-medium">
                +$1,999.00
              </div>
            </div>
            <div class="flex items-center gap-4">
              <Avatar class="hidden h-9 w-9 sm:flex">
                <AvatarImage src="/avatars/02.png" alt="Avatar" />
                <AvatarFallback>JL</AvatarFallback>
              </Avatar>
              <div class="grid gap-1">
                <p class="text-sm font-medium leading-none">
                  Jackson Lee
                </p>
                <p class="text-sm text-muted-foreground">
                  jackson.lee@email.com
                </p>
              </div>
              <div class="ml-auto font-medium">
                +$39.00
              </div>
            </div>
            <div class="flex items-center gap-4">
              <Avatar class="hidden h-9 w-9 sm:flex">
                <AvatarImage src="/avatars/03.png" alt="Avatar" />
                <AvatarFallback>IN</AvatarFallback>
              </Avatar>
              <div class="grid gap-1">
                <p class="text-sm font-medium leading-none">
                  Isabella Nguyen
                </p>
                <p class="text-sm text-muted-foreground">
                  isabella.nguyen@email.com
                </p>
              </div>
              <div class="ml-auto font-medium">
                +$299.00
              </div>
            </div>
            <div class="flex items-center gap-4">
              <Avatar class="hidden h-9 w-9 sm:flex">
                <AvatarImage src="/avatars/04.png" alt="Avatar" />
                <AvatarFallback>WK</AvatarFallback>
              </Avatar>
              <div class="grid gap-1">
                <p class="text-sm font-medium leading-none">
                  William Kim
                </p>
                <p class="text-sm text-muted-foreground">
                  will@email.com
                </p>
              </div>
              <div class="ml-auto font-medium">
                +$99.00
              </div>
            </div>
            <div class="flex items-center gap-4">
              <Avatar class="hidden h-9 w-9 sm:flex">
                <AvatarImage src="/avatars/05.png" alt="Avatar" />
                <AvatarFallback>SD</AvatarFallback>
              </Avatar>
              <div class="grid gap-1">
                <p class="text-sm font-medium leading-none">
                  Sofia Davis
                </p>
                <p class="text-sm text-muted-foreground">
                  sofia.davis@email.com
                </p>
              </div>
              <div class="ml-auto font-medium">
                +$39.00
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
</template>