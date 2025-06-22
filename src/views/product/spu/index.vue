<template>
    <div>
        <GenericPage 
            :pageMeta="{ title: 'SPU管理', icon: 'Calendar' }" 
            dataType="spu"
        />
    </div>
</template>

<script setup>
import GenericPage from '@/components/GenericPage/GenericPage.vue'
</script>

<style></style>