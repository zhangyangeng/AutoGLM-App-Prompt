# AutoGLM 安装与配置指南

本指南将帮助你快速搭建 AutoGLM 环境，并开始运行本库中的提示词。

## 1. 环境准备

在开始安装之前，请确保你的电脑已安装以下软件：
- **Python 3.10+**: 建议使用 Anaconda 或 venv 创建虚拟环境。
- **ADB (Android Debug Bridge)**: 用于与安卓设备通信。
- **Android 设备**: 开启“开发者选项”和“USB 调试”。

## 2. 安装步骤

### 克隆项目
首先，克隆 Open-autoGLM 核心仓库：
```bash
git clone https://github.com/THUDM/AutoGLM.git
cd AutoGLM
```

### 安装依赖
建议在虚拟环境中执行：
```bash
pip install -r requirements.txt
```

## 3. 配置模型

AutoGLM 需要连接到智谱清言或其他兼容的 LLM API：
1. 在项目根目录创建或修改配置文件。
2. 填入你的 `API_KEY`。
3. 确保你的模型具备视觉识别能力（如 GLM-4V）。

## 4. 连接设备

使用 USB 线连接手机，并在终端执行：
```bash
adb devices
```
如果看到设备序列号，说明连接成功。

## 5. 运行提示词

1. 在本站选择你想要执行的任务。
2. 点击 **“复制单行”**。
3. 在你的 AutoGLM 执行终端中粘贴并回车。

---
> [!TIP]
> 如果在安装过程中遇到问题，可以前往 GitHub 提交 Issue 或查看官方文档。
