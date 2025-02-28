const http = require('http')
const fs = require('fs')
const path = require('path')
const https = require('https')

const PORT = process.env.PORT || 3000

// MIME类型映射
const MIME_TYPES = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
}

// 在文件开头添加
console.error('======= 服务器脚本开始执行 =======');

// 添加未捕获异常处理
process.on('uncaughtException', (err) => {
  console.error('未捕获的异常:', err);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('未处理的 Promise 拒绝:', reason);
});

// 添加环境变量检查
console.error('环境变量检查:');
console.error('- NODE_ENV:', process.env.NODE_ENV);
console.error('- OPENAI_API_KEY:', process.env.OPENAI_API_KEY ? '已设置' : '未设置');
if (!process.env.OPENAI_API_KEY) {
  console.error('警告: OPENAI_API_KEY 环境变量未设置!');
}

// 在创建服务器之前添加
console.error('服务器脚本开始执行');

// 创建HTTP服务器
const server = http.createServer((req, res) => {
  const requestTime = new Date();
  console.error(`[${requestTime.toISOString()}] 收到请求: ${req.method} ${req.url}`);
  
  // 添加一个新的路由来提供环境变量
  if (req.url === '/api/config') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      OPENAI_API_KEY: process.env.OPENAI_API_KEY || ''
    }));
    return;
  }
  
  // 添加一个路由来验证环境变量
  if (req.url === '/api/check-env') {
    console.error('处理 /api/check-env 请求');
    console.error('OPENAI_API_KEY:', process.env.OPENAI_API_KEY ? '已设置' : '未设置');
    
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      env: {
        OPENAI_API_KEY: process.env.OPENAI_API_KEY ? '已设置' : '未设置'
      }
    }));
    console.error('已发送环境变量检查响应');
    return;
  }
  
  // 添加一个代理路由来调用 OpenAI API
  if (req.method === 'POST' && req.url === '/api/generate-names') {
    console.error('处理 /api/generate-names 请求');
    
    // 读取请求体
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
      console.error(`接收到请求数据块，当前长度: ${body.length}`);
    });
    
    req.on('end', async () => {
      console.error('请求体接收完成');
      try {
        console.error('正在解析请求体...');
        const params = JSON.parse(body);
        console.error('请求参数:', JSON.stringify(params, null, 2));
        
        // 从环境变量获取 API 密钥
        const apiKey = process.env.OPENAI_API_KEY;
        
        if (!apiKey) {
          console.error('错误: 未找到 OPENAI_API_KEY 环境变量');
          res.writeHead(500, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: '服务器配置错误: 未找到 API 密钥' }));
          return;
        }
        
        console.error('OPENAI_API_KEY 环境变量已找到');
        console.error('正在准备调用 OpenAI API...');
        
        // 构建请求选项
        const options = {
          hostname: 'api.openai.com',
          path: '/v1/chat/completions',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
          }
        };
        
        console.error('API 请求选项:', JSON.stringify(options, null, 2).replace(apiKey, '***'));
        
        // 构建提示词
        const prompt = `请根据以下信息，为一个${params.gender}孩设计3个合适的名字：
          姓氏：${params.lastName}
          出生日期：${params.birthDate}
          ${params.birthTime ? `出生时辰：${params.birthTime}` : ''}
          性别：${params.gender}
          
          请考虑以下因素：
          1. 根据出生日期分析五行（金、木、水、火、土）的缺失或平衡
          2. 根据出生年份分析生肖，推荐与生肖相配的吉祥名字元素
          3. 确保名字音韵和谐、字形美观
          4. 根据性别调整名字风格（男孩名字偏阳刚，女孩名字偏柔美）
          
          请以JSON格式返回结果，格式如下：
          {
            "names": [
              {
                "name": "${params.lastName}+名字",  // 请确保包含姓氏
                "meaning": "名字寓意",
                "wuxing": "五行分析",
                "zodiac": "与生肖的关系"
              },
              // 其他名字...
            ]
          }
          
          请确保每个名字都包含姓氏"${params.lastName}"。`;
        
        console.error('生成的提示词:', prompt);
        
        // 构建请求体
        const requestBody = JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: '你是一个专业的中国传统文化专家，精通五行、生肖、八字与取名。你需要根据用户提供的出生信息，为他们的孩子提供合适的名字建议。请确保返回的名字包含姓氏。'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          temperature: 0.7,
          max_tokens: 1000
        });
        
        console.error('请求体已准备好，长度:', requestBody.length);
        console.error('正在发送请求到 OpenAI API...');
        
        // 发送请求
        const request = https.request(options, (response) => {
          console.error('收到 OpenAI API 响应，状态码:', response.statusCode);
          console.error('响应头:', JSON.stringify(response.headers, null, 2));
          
          let data = '';
          
          response.on('data', (chunk) => {
            data += chunk;
            console.error(`接收到响应数据块，当前长度: ${data.length}`);
          });
          
          response.on('end', () => {
            console.error('响应数据接收完成');
            console.error('OpenAI API 响应状态:', response.statusCode);
            
            if (response.statusCode !== 200) {
              console.error('API请求失败:', data);
              res.writeHead(response.statusCode, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ error: `API请求失败: ${response.statusCode}`, details: data }));
              return;
            }
            
            console.error('OpenAI API 调用成功');
            console.error('响应数据 (前200个字符):', data.substring(0, 200) + '...');
            
            try {
              // 解析 OpenAI API 的响应
              const openaiResponse = JSON.parse(data);
              
              // 创建一个新的响应对象，包含明确的标志和原始数据
              const responseWithFlag = {
                fromOpenAI: true,
                openaiData: openaiResponse
              };
              
              console.error('成功解析 OpenAI API 响应，添加标志');
              res.writeHead(200, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify(responseWithFlag));
              console.error('已发送带标志的响应到客户端');
            } catch (error) {
              console.error('解析 OpenAI API 响应时出错:', error);
              res.writeHead(500, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ error: `解析 API 响应时出错: ${error.message}` }));
            }
          });
        });
        
        request.on('error', (error) => {
          console.error('请求错误:', error);
          res.writeHead(500, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: `请求错误: ${error.message}` }));
        });
        
        // 写入请求体并结束请求
        console.error('正在写入请求体...');
        request.write(requestBody);
        request.end();
        console.error('请求已发送');
      } catch (error) {
        console.error('处理请求时出错:', error);
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: `处理请求时出错: ${error.message}` }));
      }
    });
    
    return;
  }
  
  // 解析URL
  let filePath = '.' + req.url
  if (filePath === './') {
    filePath = './index.html'
  }
  
  // 获取文件扩展名
  const extname = path.extname(filePath)
  let contentType = MIME_TYPES[extname] || 'application/octet-stream'
  
  // 读取文件
  fs.readFile(filePath, (error, content) => {
    if (error) {
      if (error.code === 'ENOENT') {
        // 文件不存在，返回index.html（用于SPA路由）
        fs.readFile('./index.html', (err, content) => {
          if (err) {
            res.writeHead(500)
            res.end('Error loading index.html')
          } else {
            res.writeHead(200, { 'Content-Type': 'text/html' })
            res.end(content, 'utf-8')
          }
        })
      } else {
        // 服务器错误
        res.writeHead(500)
        res.end(`Server Error: ${error.code}`)
      }
    } else {
      // 成功响应
      res.writeHead(200, { 'Content-Type': contentType })
      res.end(content, 'utf-8')
    }
  })
})

// 启动服务器
server.listen(PORT, () => {
  console.error(`======= 服务器运行在 http://localhost:${PORT} =======`);
}) 