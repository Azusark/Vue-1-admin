<template>
    <div>
        <GenericPage 
            :pageMeta="{ title: '菜单管理', icon: 'Monitor' }" 
            dataType="permission"
        />
    </div>
</template>

<script setup>
import GenericPage from '@/components/GenericPage/GenericPage.vue'
</script>

<style></style>