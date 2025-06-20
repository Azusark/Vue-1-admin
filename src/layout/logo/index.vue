<template>
    <div class="logo">
        <img :src="setting.logo" alt="logo">
        <p>{{ setting.title }}</p>
    </div>
</template>

<script setup lang="ts">
import setting from '@/setting';
</script>

<style scoped lang="scss">
.logo {
    width: 100%;
    /* height: $base-menu-logo-height; */
    color: white;
    display: flex;
    flex-direction: column; // 纵向排列
    align-items: center; // 水平居中
    padding: 20px;
    position: relative;


    img {
        width: 210px;
        height: 120px;

    }

    p {
        font-size: $base-logo-title-fontSize;
        margin-left: 0; // 不需要左边距
        margin-top: 10px; // 与图片间隔
        text-align: center;
    }
}
</style>