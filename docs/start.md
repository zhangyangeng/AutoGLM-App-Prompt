---
layout: page
---

<script setup>
import { onMounted } from 'vue'
import { useRouter, useData } from 'vitepress'

const { theme } = useData()
const router = useRouter()

onMounted(() => {
    // 兼容对象形式和数组形式的侧边栏配置
    const sidebar = theme.value.sidebar
    const sidebarItems = Array.isArray(sidebar) ? sidebar : sidebar['/']
    
    const firstApp = sidebarItems?.[0]?.items?.[0]?.link
    if (firstApp) {
        router.go(firstApp)
    } else {
        router.go('/')
    }
})
</script>

<div style="display: flex; justify-content: center; align-items: center; height: 50vh; font-family: var(--vp-font-family-base);">
    <p style="font-size: 1.2rem; color: var(--vp-c-text-2); letter-spacing: 1px;">
        正在为你跳转到首个应用页面...
    </p>
</div>
