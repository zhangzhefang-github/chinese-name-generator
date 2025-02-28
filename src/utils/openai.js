/**
 * OpenAI API工具类
 * 用于调用OpenAI API生成名字
 */

// OpenAI API密钥（实际应用中应该从环境变量获取或通过后端服务调用）

const OPENAI_API_KEY = process.env.OPENAI_API_KEY; // 从环境变量中获取API密钥
const API_URL = 'https://api.openai.com/v1/chat/completions'

/**
 * 调用OpenAI API生成名字
 * @param {Object} params - 生成名字所需的参数
 * @param {string} params.birthDate - 出生日期
 * @param {string} params.birthTime - 出生时辰（可选）
 * @param {string} params.gender - 性别
 * @param {string} params.lastName - 姓氏
 * @returns {Promise<Array>} - 生成的名字列表
 */
export async function generateNames(params) {
  try {
    const { birthDate, birthTime, gender, lastName } = params
    
    // 构建提示词
    const prompt = buildPrompt(birthDate, birthTime, gender, lastName)
    
    // 调用API
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: '你是一个专业的中国传统文化专家，精通五行、生肖、八字与取名。你需要根据用户提供的出生信息，为他们的孩子提供合适的名字建议。'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 1000
      })
    })
    
    if (!response.ok) {
      throw new Error(`API请求失败: ${response.status}`)
    }
    
    const data = await response.json()
    
    // 解析API返回的结果
    return parseResponse(data, lastName)
  } catch (error) {
    console.error('OpenAI API调用失败:', error)
    throw error
  }
}

/**
 * 构建提示词
 * @param {string} birthDate - 出生日期
 * @param {string} birthTime - 出生时辰（可选）
 * @param {string} gender - 性别
 * @param {string} lastName - 姓氏
 * @returns {string} - 构建的提示词
 */
function buildPrompt(birthDate, birthTime, gender, lastName) {
  return `
    请根据以下信息，为一个${gender}孩设计3个合适的名字：
    
    姓氏：${lastName}
    出生日期：${birthDate}
    ${birthTime ? `出生时辰：${birthTime}` : ''}
    性别：${gender}
    
    请考虑以下因素：
    1. 根据出生日期分析五行（金、木、水、火、土）的缺失或平衡
    2. 根据出生年份分析生肖，推荐与生肖相配的吉祥名字元素
    3. 确保名字音韵和谐、字形美观
    4. 根据性别调整名字风格（男孩名字偏阳刚，女孩名字偏柔美）
    
    对于每个名字，请提供以下信息：
    - 完整名字（姓+名）
    - 名字的寓意
    - 五行分析
    - 与生肖的关系
    
    请以JSON格式返回结果，格式如下：
    {
      "names": [
        {
          "name": "完整名字",
          "meaning": "名字寓意",
          "wuxing": "五行分析",
          "zodiac": "与生肖的关系"
        },
        // 其他名字...
      ]
    }
  `
}

/**
 * 解析API返回的结果
 * @param {Object} data - API返回的数据
 * @param {string} lastName - 姓氏
 * @returns {Array} - 解析后的名字列表
 */
function parseResponse(data, lastName) {
  try {
    const content = data.choices[0].message.content
    
    // 尝试从返回内容中提取JSON
    const jsonMatch = content.match(/\{[\s\S]*\}/)
    if (jsonMatch) {
      const jsonStr = jsonMatch[0]
      const result = JSON.parse(jsonStr)
      
      // 为每个名字添加ID
      return result.names.map((name, index) => ({
        id: Date.now() + index,
        ...name
      }))
    }
    
    // 如果无法解析JSON，返回默认名字
    return [
      {
        id: Date.now(),
        name: `${lastName}浩然`,
        meaning: '胸怀宽广，气宇轩昂',
        wuxing: '水木组合，生生不息',
        zodiac: '与生肖相合，寓意勇往直前'
      },
      {
        id: Date.now() + 1,
        name: `${lastName}雅琪`,
        meaning: '优雅高贵，琪是美玉',
        wuxing: '土金组合，厚德载物',
        zodiac: '与生肖相合，寓意温婉贤淑'
      },
      {
        id: Date.now() + 2,
        name: `${lastName}志远`,
        meaning: '志向远大，前程似锦',
        wuxing: '火土组合，稳固发展',
        zodiac: '与生肖相合，寓意坚定不移'
      }
    ]
  } catch (error) {
    console.error('解析API响应失败:', error)
    
    // 返回默认名字
    return [
      {
        id: Date.now(),
        name: `${lastName}浩然`,
        meaning: '胸怀宽广，气宇轩昂',
        wuxing: '水木组合，生生不息',
        zodiac: '与生肖相合，寓意勇往直前'
      },
      {
        id: Date.now() + 1,
        name: `${lastName}雅琪`,
        meaning: '优雅高贵，琪是美玉',
        wuxing: '土金组合，厚德载物',
        zodiac: '与生肖相合，寓意温婉贤淑'
      },
      {
        id: Date.now() + 2,
        name: `${lastName}志远`,
        meaning: '志向远大，前程似锦',
        wuxing: '火土组合，稳固发展',
        zodiac: '与生肖相合，寓意坚定不移'
      }
    ]
  }
} 