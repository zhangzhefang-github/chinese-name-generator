# Chinese Name Generator (好名好运 AI 取名应用)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-14.x-green.svg)](https://nodejs.org/)
[![Vue.js](https://img.shields.io/badge/Vue.js-3.x-blue.svg)](https://vuejs.org/)

[English](#english) | [中文](#chinese)

<a id="english"></a>
## 🌟 Overview

A Vue.js-based AI application that generates personalized Chinese names by analyzing cultural factors such as the Five Elements (Wu Xing) and Chinese Zodiac signs.

### Key Features

- **Five Elements Analysis**: Analyzes the balance of the Five Elements (Metal, Wood, Water, Fire, Earth) based on birth date to select appropriate characters.
- **Zodiac Compatibility**: Recommends auspicious name elements based on the child's birth year zodiac sign.
- **Phonetic & Visual Harmony**: Ensures names have harmonious pronunciation and aesthetically pleasing written forms.
- **Gender-Appropriate**: Adjusts name styles based on gender (masculine for boys, elegant for girls).
- **History Tracking**: Saves previously generated names for comparison and reference.
- **User Feedback**: Allows users to rate and provide feedback on generated names.

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/zhangzhefang-github/chinese-name-generator.git

# Navigate to project directory
cd chinese-name-generator

# Start the server
node server.js
```

### Usage

1. Open your browser and navigate to `http://localhost:3000`
2. Click "Start Naming" on the homepage
3. Enter the child's birth date, time (optional), gender, and surname
4. Click "Generate Names"
5. View the recommended names with meanings and explanations related to Five Elements and Zodiac
6. Save favorite names or generate new ones

## 🛠️ Technology Stack

- **Frontend**: Vue.js 3 (Composition API)
- **Backend**: Node.js
- **AI Integration**: OpenAI API (GPT-3.5-turbo)

## 📁 Project Structure

```
chinese-name-generator/
├── index.html            # Entry HTML file
├── server.js             # Node.js server
├── src/                  # Source code
│   └── assets/           # Static assets
│       └── styles.css    # Global styles
└── README.md             # Project documentation
```

## ⚠️ Important Notes

- This application requires a valid OpenAI API key for real AI-generated content
- By default, the application uses simulated data; to use the real API, configure your API key
- All user data is stored locally and not uploaded to any server

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📧 Contact

For questions or suggestions, please contact: zhangzhefang@msn.cn

---

<a id="chinese"></a>
## 🌟 概述

一个基于Vue.js开发的AI取名应用，通过分析五行、生肖等文化因素，为用户提供个性化的名字推荐。

### 功能特点

- **五行分析**：根据出生日期分析五行（金、木、水、火、土）的缺失或平衡，选择合适的名字字形。
- **生肖分析**：根据孩子的出生年份，分析生肖，推荐与生肖相配的吉祥名字元素。
- **音韵与字形**：生成的名字会确保音韵和谐、字形美观，符合音律的美感。
- **性别匹配**：根据性别调整名字风格，以确保名字的性别特征（例如，男孩名字偏阳刚，女孩名字偏柔美）。
- **历史记录**：保存用户生成的历史名字记录，便于用户查看和比较。
- **用户反馈**：用户可以对每个名字进行评分，并提交反馈。

## 🚀 开始使用

### 前提条件

- Node.js (v14 或更高版本)
- npm 或 yarn

### 安装

```bash
# 克隆仓库
git clone https://github.com/zhangzhefang-github/chinese-name-generator.git

# 进入项目目录
cd chinese-name-generator

# 启动服务器
node server.js
```

### 使用方法

1. 在浏览器中访问 `http://localhost:3000`
2. 在首页点击"开始取名"按钮
3. 输入孩子的出生日期、时辰（可选）、性别和姓氏
4. 点击"生成名字"按钮
5. 查看生成的名字推荐，每个名字都附带寓意说明及五行、生肖相关的解释
6. 可以保存喜欢的名字，或者重新生成

## 🛠️ 技术栈

- **前端框架**：Vue.js 3 (使用Composition API)
- **后端**：Node.js
- **AI集成**：OpenAI API (GPT-3.5-turbo)

## 📁 项目结构

```
chinese-name-generator/
├── index.html            # 入口HTML文件
├── server.js             # Node.js服务器
├── src/                  # 源代码目录
│   └── assets/           # 静态资源
│       └── styles.css    # 全局样式
└── README.md             # 项目说明
```

## ⚠️ 注意事项

- 本应用使用OpenAI API，需要有效的API密钥才能使用真实的AI生成功能
- 默认情况下，应用使用模拟数据，如需使用真实API，请配置您的API密钥
- 所有用户数据都存储在本地，不会上传到服务器

## 📄 许可证

本项目采用MIT许可证 - 详情请参阅LICENSE文件。

## 📧 联系方式

如有任何问题或建议，请联系：zhangzhefang@msn.cn

