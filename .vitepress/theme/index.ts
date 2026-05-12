import DefaultTheme from 'vitepress/theme'
import './custom.css'
import PromptMeta from './components/PromptMeta.vue'
import { onMounted, watch, nextTick } from 'vue'
import { useData } from 'vitepress'
import type { EnhanceAppContext } from 'vitepress'

export default {
    extends: DefaultTheme,
    enhanceApp({ app }: EnhanceAppContext) {
        app.component('PromptMeta', PromptMeta)
    },
    setup() {
        const { page } = useData()

        const isAppPage = () => {
            const path = page.value.relativePath
            const excludes = ['index.md', 'guide.md', 'start.md', 'README.md']
            return !excludes.includes(path) && path.endsWith('.md')
        }

        const initCodeBlocks = () => {
            // 首先移除旧的自定义元素（在页面切换时）
            document.querySelectorAll('.code-actions-bar, .custom-lang-label').forEach(el => el.remove())

            // 只有 App 提示词页面才应用自定义样式
            if (!isAppPage()) {
                document.body.classList.remove('custom-code-blocks')
                return
            }

            document.body.classList.add('custom-code-blocks')

            nextTick(() => {
                const codeBlocks = document.querySelectorAll('div[class*="language-"]')
                codeBlocks.forEach((block: Element) => {
                    if (block.querySelector('.code-actions-bar')) return

                    // 1. 获取语言类型
                    const lang = block.className.match(/language-([a-z0-9]+)/i)?.[1] || 'text'
                    const langLabel = document.createElement('span')
                    langLabel.className = 'custom-lang-label'
                    langLabel.innerText = lang
                    block.appendChild(langLabel)

                    // 2. 创建工具栏
                    const bar = document.createElement('div')
                    bar.className = 'code-actions-bar'

                    // 3. 原文复制按钮
                    const btnOriginal = document.createElement('button')
                    btnOriginal.className = 'code-action-btn'
                    btnOriginal.innerText = '复制原文'
                    btnOriginal.onclick = () => {
                        const code = (block.querySelector('code') as HTMLElement)?.innerText || ''
                        copyToClipboard(code, btnOriginal)
                    }

                    // 4. 单行复制按钮
                    const btnSingle = document.createElement('button')
                    btnSingle.className = 'code-action-btn primary'
                    btnSingle.innerText = '复制单行'
                    btnSingle.onclick = () => {
                        const code = (block.querySelector('code') as HTMLElement)?.innerText || ''
                        const singleLine = code.replace(/\n/g, ' ').replace(/\s+/g, ' ').trim()
                        copyToClipboard(singleLine, btnSingle)
                    }

                    bar.appendChild(btnOriginal)
                    bar.appendChild(btnSingle)
                    block.appendChild(bar)
                })
            })
        }

        const copyToClipboard = (text: string, btn: HTMLButtonElement) => {
            navigator.clipboard.writeText(text).then(() => {
                const oldText = btn.innerText
                btn.innerText = '已复制!'
                btn.classList.add('copied')
                setTimeout(() => {
                    btn.innerText = oldText
                    btn.classList.remove('copied')
                }, 2000)
            })
        }

        onMounted(initCodeBlocks)
        watch(() => page.value.relativePath, initCodeBlocks)
    }
}
