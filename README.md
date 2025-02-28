# 好名好运 AI 取名应用

一个基于Vue.js开发的AI取名应用，通过分析五行、生肖等文化因素，为用户提供个性化的名字推荐。

## 功能特点

- **五行分析**：根据出生日期分析五行（金、木、水、火、土）的缺失或平衡，选择合适的名字字形。
- **生肖分析**：根据孩子的出生年份，分析生肖，推荐与生肖相配的吉祥名字元素。
- **音韵与字形**：生成的名字会确保音韵和谐、字形美观，符合音律的美感。
- **性别匹配**：根据性别调整名字风格，以确保名字的性别特征（例如，男孩名字偏阳刚，女孩名字偏柔美）。
- **历史记录**：保存用户生成的历史名字记录，便于用户查看和比较。
- **用户反馈**：用户可以对每个名字进行评分，并提交反馈。

## 技术栈

- **前端框架**：Vue.js 3 (使用Composition API)
- **路由管理**：Vue Router 4
- **状态管理**：Pinia
- **AI集成**：OpenAI API (GPT-3.5-turbo)

## 项目结构

```
好名好运AI/
├── index.html            # 入口HTML文件
├── src/                  # 源代码目录
│   ├── assets/           # 静态资源
│   │   └── styles.css    # 全局样式
│   ├── components/       # 组件目录
│   ├── views/            # 页面组件
│   │   ├── Home.js       # 首页
│   │   ├── NameGenerator.js # 名字生成器页面
│   │   ├── History.js    # 历史记录页面
│   │   └── Feedback.js   # 反馈页面
│   ├── store/            # Pinia状态管理
│   │   └── index.js      # 存储定义
│   ├── utils/            # 工具函数
│   │   └── openai.js     # OpenAI API工具
│   ├── App.js            # 根组件
│   └── main.js           # 应用入口
└── README.md             # 项目说明
```

## 使用方法

### 本地开发

1. 克隆项目到本地
   ```bash
   git clone https://github.com/yourusername/haohaoyun-ai.git
   cd haohaoyun-ai
   ```

2. 安装依赖
   ```bash
   npm install
   ```

3. 配置OpenAI API密钥
   在`src/utils/openai.js`文件中，将`OPENAI_API_KEY`替换为你的OpenAI API密钥。

4. 启动开发服务器
   ```bash
   npm run dev
   ```

5. 在浏览器中访问 `http://localhost:5173`

### 生产部署

1. 构建生产版本
   ```bash
   npm run build
   ```

2. 部署`dist`目录到你的Web服务器

## 使用流程

1. 在首页点击"开始取名"按钮
2. 输入孩子的出生日期、时辰（可选）、性别和姓氏
3. 点击"生成名字"按钮
4. 查看生成的名字推荐，每个名字都附带寓意说明及五行、生肖相关的解释
5. 可以保存喜欢的名字，或者重新生成

## 注意事项

- 本应用使用OpenAI API，需要有效的API密钥才能使用真实的AI生成功能
- 默认情况下，应用使用模拟数据，如需使用真实API，请在`src/store/index.js`中将`useRealAPI`设置为`true`
- 所有用户数据都存储在本地，不会上传到服务器

## 许可证

MIT

## 联系方式

如有任何问题或建议，请联系：contact@haohaoyun.com 