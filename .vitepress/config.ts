import { defineConfig } from 'vitepress'
import fs from 'fs'
import path from 'path'
import type { ViteDevServer } from 'vite'
import type { DefaultTheme } from 'vitepress'

// 自动生成侧边栏逻辑
function getSidebar(): DefaultTheme.SidebarItem[] {
    const docsDir = path.resolve(process.cwd(), 'docs')
    
    if (!fs.existsSync(docsDir)) return []

    const files = fs.readdirSync(docsDir)

    const items = files
        .filter(file => {
            // 排除首页、中转页和安装指南，只显示 App 提示词
            const excludes = ['index.md', 'start.md', 'guide.md', 'README.md']
            return file.endsWith('.md') && !excludes.includes(file)
        })
        .map(file => {
            const name = file.replace('.md', '')
            return { text: name, link: `/${name}` }
        })

    if (items.length > 0) {
        return [{
            text: '应用分类',
            items: items
        }]
    }

    return []
}

export default defineConfig({
    title: "AutoGLM Prompt Hub",
    description: "精选 AutoGLM 提示词库",
    srcDir: 'docs',
    themeConfig: {
        nav: [
            { text: '首页', link: '/' },
            { text: '应用分类', link: '/start' },
            { text: '安装指南', link: '/guide' },
            { text: '项目地址', link: 'https://github.com/zhangyangeng/AutoGLM-App-Prompt' }
        ],
        sidebar: {
            '/guide': [],
            '/': getSidebar()
        },
        socialLinks: [
            { icon: 'github', link: 'https://github.com/zhangyangeng/AutoGLM-App-Prompt' }
        ],
        search: {
            provider: 'local'
        },
        outline: {
            level: [2, 3],
            label: '本页功能'
        }
    },
    appearance: true,
    vite: {
        plugins: [
            {
                name: 'watch-docs',
                configureServer(server: ViteDevServer) {
                    server.watcher.add(path.resolve(process.cwd(), 'docs/*.md'))
                    server.watcher.on('add', () => {
                        const configPath = path.resolve(process.cwd(), '.vitepress/config.ts')
                        fs.utimesSync(configPath, new Date(), new Date())
                    })
                    server.watcher.on('unlink', () => {
                        const configPath = path.resolve(process.cwd(), '.vitepress/config.ts')
                        fs.utimesSync(configPath, new Date(), new Date())
                    })
                }
            }
        ]
    }
})
