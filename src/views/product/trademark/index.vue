<template>
    <div>
        <GenericPage 
            :pageMeta="{ title: '品牌管理', icon: 'ShoppingCartFull' }" 
            dataType="brand"
        />
    </div>
</template>

<script setup>
import GenericPage from '@/components/GenericPage/GenericPage.vue'
</script>

<style></style>