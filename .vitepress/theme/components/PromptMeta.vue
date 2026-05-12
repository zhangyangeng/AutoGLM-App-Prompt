<template>
    <div class="prompt-meta-card">
        <div class="meta-item">
            <span class="label">功能简介</span>
            <p class="value">{{ desc }}</p>
        </div>
        <div class="meta-item">
            <span class="label">执行路径</span>
            <p class="value path-value">{{ path }}</p>
        </div>
        <div class="meta-item">
            <span class="label">预期效果</span>
            <p class="value">{{ result }}</p>
        </div>
    </div>
</template>

<script setup>
defineProps(['desc', 'path', 'result'])
</script>

<style scoped>
.prompt-meta-card {
    margin: 1.5rem 0;
    padding: 1.2rem;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-left: 4px solid var(--vp-c-brand-1);
    border-radius: 12px;
    backdrop-filter: blur(10px);
    display: flex;
    flex-direction: column;
    gap: 1rem;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
}

.meta-item {
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
}

.label {
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    color: var(--vp-c-brand-1);
    letter-spacing: 1px;
}

.value {
    margin: 0;
    font-size: 0.95rem;
    color: var(--vp-c-text-1);
    line-height: 1.5;
}

.path-value {
    font-family: var(--vp-font-family-mono);
    background: rgba(0, 0, 0, 0.2);
    padding: 0.2rem 0.5rem;
    border-radius: 4px;
}
</style>
