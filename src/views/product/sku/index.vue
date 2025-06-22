<template>
    <div>
        <GenericPage 
            :pageMeta="{ title: 'SKU管理', icon: 'Orange' }" 
            dataType="sku"
        />
    </div>
</template>

<script setup>
import GenericPage from '@/components/GenericPage/GenericPage.vue'
</script>

<style></style>