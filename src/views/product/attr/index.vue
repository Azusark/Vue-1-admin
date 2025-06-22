<template>
    <div>
        <GenericPage 
            :pageMeta="{ title: '属性管理', icon: 'ChromeFilled' }" 
            dataType="attr"
        />
    </div>
</template>

<script setup>
import GenericPage from '@/components/GenericPage/GenericPage.vue'
</script>

<style></style>