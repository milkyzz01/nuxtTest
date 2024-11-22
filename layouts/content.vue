<script setup lang="ts">
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { type menu } from '../components/appHeader.vue'

const menuItems: Array<menu> = [
  {
    title: 'Dashboard',
    path: 'dashboard'
  },
  {
    title: 'Order',
    path: 'orders'
  }
]

</script>

<template>
  <div class="flex h-screen w-full flex-col">
    <AppHeader :menuItems="menuItems" />
    <main class="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <!--Nuxt page dynamically render pages within content-->
      <NuxtPage />
    </main>
  </div>
</template>