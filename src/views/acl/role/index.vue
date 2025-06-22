<template>
    <div>
        <GenericPage 
            :pageMeta="{ title: '角色管理', icon: 'UserFilled' }" 
            dataType="role"
        />
    </div>
</template>

<script setup>
import GenericPage from '@/components/GenericPage/GenericPage.vue'
</script>

<style></style>