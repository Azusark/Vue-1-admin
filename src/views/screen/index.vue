<template>
    <div class="data-dashboard">
        <!-- 背景层 -->
        <div class="cyber-grid"></div>

        <!-- 主地图区域 -->
        <div class="map-container">
            <img src="/src/assets/images/map.png" class="world-map" alt="Simplified World Map">

            <!-- 数据覆盖层 -->
            <div v-for="marker in dataMarkers" :key="marker.id" class="data-marker" :style="{
                left: `${marker.x}%`,
                top: `${marker.y}%`,
                '--hue': marker.hue
            }">
                <div class="marker-pulse"></div>
                <div class="marker-info">
                    <h3>{{ marker.city }}</h3>
                    <div class="data-row">
                        <span>气候指数</span>
                        <span class="value">{{ marker.weather }}°C</span>
                    </div>
                    <div class="data-row">
                        <span>人口密度</span>
                        <span class="value">{{ marker.density }}/km²</span>
                    </div>
                    <div class="data-row">
                        <span>量子波动</span>
                        <span class="value">{{ marker.quantum }}Q</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- 数据侧边栏 -->
        <div class="data-sidebar">
            <div class="sidebar-header">
                <h2>GLOBAL DATA STREAM</h2>
                <div class="timestamp">SYNC: {{ currentTime }}</div>
            </div>

            <div class="data-panel">
                <h3>🌡️ 全球气候异常指数</h3>
                <div class="data-grid">
                    <div v-for="(item, index) in climateData" :key="'climate' + index" class="data-item">
                        <div class="data-label">{{ item.region }}</div>
                        <div class="data-value">{{ item.value }}</div>
                        <div class="data-bar"
                            :style="{ width: item.percentage + '%', background: climateColor(item.value) }"></div>
                    </div>
                </div>
            </div>

            <div class="data-panel">
                <h3>👶 人口动态监测</h3>
                <div class="data-grid">
                    <div v-for="(item, index) in populationData" :key="'pop' + index" class="data-item">
                        <div class="data-label">{{ item.region }}</div>
                        <div class="data-value">{{ item.birthRate }}‰</div>
                        <div class="data-bar"
                            :style="{ width: item.percentage + '%', background: populationColor(item.birthRate) }">
                        </div>
                    </div>
                </div>
            </div>

            <div class="data-panel">
                <h3>⚡ 能源消耗峰值</h3>
                <div class="data-grid">
                    <div v-for="(item, index) in energyData" :key="'energy' + index" class="data-item">
                        <div class="data-label">{{ item.sector }}</div>
                        <div class="data-value">{{ item.usage }}TW</div>
                        <div class="data-bar"
                            :style="{ width: item.percentage + '%', background: energyColor(item.usage) }"></div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 浮动数据标签 -->
        <div class="floating-data">
            <div v-for="(item, index) in floatingData" :key="'float' + index" class="floating-item" :style="{
                left: `${item.x}%`,
                top: `${item.y}%`,
                animationDuration: `${item.speed}s`,
                color: `hsl(${item.hue}, 80%, 60%)`
            }">
                {{ item.value }}
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

// 当前时间
const currentTime = ref('')
const updateTime = () => {
    const now = new Date()
    currentTime.value = now.toISOString().replace('T', ' ').substring(0, 19)
}
onMounted(() => {
    updateTime()
    setInterval(updateTime, 1000)
})

// 地图数据标记
const dataMarkers = ref([
    { id: 1, city: '上海', x: 78, y: 42, weather: 28.5, density: 3820, quantum: 0.87, hue: 180 },
    { id: 2, city: '东京', x: 82, y: 38, weather: 25.3, density: 6270, quantum: 1.23, hue: 210 },
    { id: 3, city: '纽约', x: 28, y: 40, weather: 22.1, density: 10800, quantum: 0.65, hue: 300 },
    { id: 4, city: '伦敦', x: 48, y: 32, weather: 18.7, density: 5600, quantum: 0.92, hue: 270 },
    { id: 5, city: '悉尼', x: 85, y: 65, weather: 20.4, density: 4300, quantum: 0.45, hue: 30 },
    { id: 6, city: '里约', x: 35, y: 62, weather: 30.2, density: 5300, quantum: 0.78, hue: 120 }
])

// 气候数据
const climateData = ref([
    { region: '东亚', value: '+2.3°C', percentage: 65 },
    { region: '北美', value: '+1.8°C', percentage: 55 },
    { region: '欧洲', value: '+2.1°C', percentage: 60 },
    { region: '南亚', value: '+3.0°C', percentage: 85 },
    { region: '非洲', value: '+2.7°C', percentage: 75 },
    { region: '南美', value: '+1.9°C', percentage: 50 }
])

// 人口数据
const populationData = ref([
    { region: '东亚', birthRate: 8.2, percentage: 40 },
    { region: '东南亚', birthRate: 16.5, percentage: 75 },
    { region: '非洲', birthRate: 32.7, percentage: 95 },
    { region: '欧洲', birthRate: 9.1, percentage: 45 },
    { region: '北美', birthRate: 11.3, percentage: 55 },
    { region: '南美', birthRate: 14.8, percentage: 65 }
])

// 能源数据
const energyData = ref([
    { sector: '工业', usage: 42.3, percentage: 70 },
    { sector: '商业', usage: 28.7, percentage: 55 },
    { sector: '住宅', usage: 35.2, percentage: 60 },
    { sector: '交通', usage: 22.1, percentage: 45 },
    { sector: '农业', usage: 8.5, percentage: 25 }
])

// 浮动随机数据
const floatingData = ref([])
const generateFloatingData = () => {
    const items = []
    const values = ['+1.2°C', '↑3.2%', 'ALERT', '0xFE23A5', 'WARNING', '↓0.8%', 'OK', 'ERROR', '0.45Q']

    for (let i = 0; i < 15; i++) {
        items.push({
            x: Math.random() * 90 + 5,
            y: Math.random() * 90 + 5,
            value: values[Math.floor(Math.random() * values.length)],
            hue: Math.floor(Math.random() * 360),
            speed: Math.random() * 5 + 3
        })
    }
    floatingData.value = items
}

onMounted(() => {
    generateFloatingData()
    setInterval(generateFloatingData, 8000)
})

// 计算颜色
const climateColor = (val) => {
    const temp = parseFloat(val)
    if (temp > 2.5) return 'hsl(0, 80%, 60%)' // 红色
    if (temp > 2.0) return 'hsl(30, 80%, 60%)' // 橙色
    return 'hsl(180, 80%, 60%)' // 青色
}

const populationColor = (rate) => {
    if (rate > 25) return 'hsl(120, 80%, 60%)' // 绿色
    if (rate > 15) return 'hsl(60, 80%, 60%)' // 黄色
    return 'hsl(300, 80%, 60%)' // 紫色
}

const energyColor = (usage) => {
    if (usage > 35) return 'hsl(0, 80%, 60%)' // 红色
    if (usage > 25) return 'hsl(30, 80%, 60%)' // 橙色
    return 'hsl(200, 80%, 60%)' // 蓝色
}
</script>

<style scoped>
.data-dashboard {
    position: relative;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    background-color: #0a0a1a;
    color: #e0e0ff;
    font-family: 'Courier New', monospace;
    display: flex;
}

/* 网格背景 */
.cyber-grid {
    position: absolute;
    width: 100%;
    height: 100%;
    background-image:
        linear-gradient(to right, rgba(0, 180, 255, 0.05) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(0, 180, 255, 0.05) 1px, transparent 1px);
    background-size: 30px 30px;
    z-index: 0;
}

/* 地图容器 */
.map-container {
    position: relative;
    width: 70%;
    height: 100%;
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1;
}

.world-map {
    width: 100%;
    height: auto;
    max-height: 90%;
    filter: brightness(0.8) contrast(1.2) hue-rotate(180deg) sepia(0.3);
    opacity: 0.7;
}

/* 数据标记 */
.data-marker {
    position: absolute;
    transform: translate(-50%, -50%);
    cursor: pointer;
    z-index: 2;
}

.marker-pulse {
    width: 12px;
    height: 12px;
    background: hsl(var(--hue), 80%, 60%);
    border-radius: 50%;
    box-shadow: 0 0 0 0 hsl(var(--hue), 80%, 60%);
    animation: pulse 2s infinite;
}

@keyframes pulse {
    0% {
        box-shadow: 0 0 0 0 hsl(var(--hue), 80%, 60%);
    }

    70% {
        box-shadow: 0 0 0 10px hsla(var(--hue), 80%, 60%, 0);
    }

    100% {
        box-shadow: 0 0 0 0 hsla(var(--hue), 80%, 60%, 0);
    }
}

.marker-info {
    position: absolute;
    left: 20px;
    top: 0;
    background: rgba(10, 15, 30, 0.9);
    padding: 12px;
    border-left: 2px solid hsl(var(--hue), 80%, 60%);
    min-width: 180px;
    transform: scale(0);
    transform-origin: left center;
    transition: transform 0.3s;
    box-shadow: 0 0 15px rgba(0, 180, 255, 0.2);
}

.data-marker:hover .marker-info {
    transform: scale(1);
}

.data-row {
    display: flex;
    justify-content: space-between;
    margin: 6px 0;
    font-size: 0.9em;
}

.data-row .value {
    color: hsl(var(--hue), 80%, 70%);
    font-weight: bold;
}

/* 数据侧边栏 */
.data-sidebar {
    width: 30%;
    height: 100%;
    padding: 20px;
    background: rgba(5, 10, 20, 0.7);
    border-left: 1px solid rgba(0, 180, 255, 0.3);
    overflow-y: auto;
    z-index: 1;
}

.sidebar-header {
    margin-bottom: 30px;
    padding-bottom: 15px;
    border-bottom: 1px solid rgba(0, 180, 255, 0.3);
}

.sidebar-header h2 {
    color: #00b4ff;
    margin: 0;
    font-size: 1.4em;
}

.timestamp {
    color: rgba(0, 180, 255, 0.7);
    font-size: 0.8em;
    margin-top: 5px;
}

.data-panel {
    margin-bottom: 30px;
    background: rgba(10, 20, 40, 0.5);
    padding: 15px;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}

.data-panel h3 {
    margin-top: 0;
    margin-bottom: 15px;
    color: #00b4ff;
    font-size: 1.1em;
}

.data-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 10px;
}

.data-item {
    position: relative;
}

.data-label {
    font-size: 0.9em;
    margin-bottom: 3px;
}

.data-value {
    font-weight: bold;
    color: #00f7ff;
    font-size: 0.95em;
}

.data-bar {
    height: 3px;
    margin-top: 5px;
    border-radius: 2px;
    transition: width 0.5s ease;
}

/* 浮动数据 */
.floating-data {
    position: absolute;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 3;
}

.floating-item {
    position: absolute;
    font-size: 0.8em;
    font-weight: bold;
    text-shadow: 0 0 5px currentColor;
    opacity: 0;
    animation: floatInOut 8s infinite;
}

@keyframes floatInOut {
    0% {
        opacity: 0;
        transform: translateY(10px);
    }

    10% {
        opacity: 1;
    }

    90% {
        opacity: 1;
    }

    100% {
        opacity: 0;
        transform: translateY(-30px);
    }
}
</style>