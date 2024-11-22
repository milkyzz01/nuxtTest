<script lang="ts" setup>
import { Activity, ArrowUpRight, CircleUser, CreditCard, DollarSign, Menu, Package2, Search, Users } from 'lucide-vue-next'

export interface menu {
    title: string;
    path: string;
}

defineProps<{
    menuItems: menu[],
}>();
</script>

<template>
    <header class="sticky top-0 flex h-16 items-center p-5 gap-4 border-b bg-background px-4 md:px-6">
      <nav class="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <a
          href="#"
          class="flex items-center gap-2 text-lg font-semibold md:text-base"
        >
          <Package2 class="h-6 w-6" />
          <span class="sr-only">Acme Inc</span>
        </a>
        <div v-for="items in menuItems">
        <nuxt-link :to="items.path" class="text-muted-foreground transition-colors hover:text-foreground">
          {{ items.title }}
        </nuxt-link>
        </div>
      </nav>
      <!--Mobile sidebar navigation-->
      <Sheet>
        <SheetTrigger as-child>
          <Button
            variant="outline"
            size="icon"
            class="shrink-0 md:hidden"
          >
            <Menu class="h-5 w-5" />
            <span class="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <nav class="grid gap-6 text-lg font-medium">
            <a
              href="#"
              class="flex items-center gap-2 text-lg font-semibold"
            >
              <Package2 class="h-6 w-6" />
              <span class="sr-only">Acme Inc</span>
            </a>
            <nuxt-link to="dashboard" class="text-muted-foreground hover:text-foreground">
              Dashboard
            </nuxt-link>
            <nuxt-link to="orders"
              class="text-muted-foreground hover:text-foreground"
            >
              Orders
            </nuxt-link>
            <a
              href="#"
              class="text-muted-foreground hover:text-foreground"
            >
              Products
            </a>
            <a
              href="#"
              class="text-muted-foreground hover:text-foreground"
            >
              Customers
            </a>
            <a
              href="#"
              class="text-muted-foreground hover:text-foreground"
            >
              Analytics
            </a>
          </nav>
        </SheetContent>
      </Sheet>
      <div class="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
      <div class="ml-auto flex-1 sm:flex-initial">
        <DropdownMenu>
          <DropdownMenuTrigger as-child>
            <Button variant="secondary" size="icon" class="rounded-full">
              <CircleUser class="h-5 w-5" />
              <span class="sr-only">Toggle user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Support</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        </div>
      </div>
    </header>
</template>