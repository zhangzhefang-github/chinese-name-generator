import { defineStore } from 'https://unpkg.com/pinia@2/dist/pinia.esm-browser.js'
import { generateNames as callOpenAI } from '../utils/openai.js'

// 用户信息存储
export const useUserStore = defineStore('user', {
  state: () => ({
    birthDate: '',
    birthTime: '',
    gender: '',
    lastName: '',
    savedNames: [],
    generatedNames: [],
    history: []
  }),
  
  actions: {
    setBirthInfo(date, time) {
      this.birthDate = date
      this.birthTime = time
    },
    
    setGender(gender) {
      this.gender = gender
    },
    
    setLastName(lastName) {
      this.lastName = lastName
    },
    
    setGeneratedNames(names) {
      this.generatedNames = names
      
      // 添加到历史记录
      this.history.push({
        id: Date.now(),
        date: new Date().toISOString(),
        birthDate: this.birthDate,
        birthTime: this.birthTime,
        gender: this.gender,
        lastName: this.lastName,
        names: [...names]
      })
      
      // 只保留最近的20条历史记录
      if (this.history.length > 20) {
        this.history = this.history.slice(-20)
      }
      
      // 保存到本地存储
      this.saveToLocalStorage()
    },
    
    saveName(name) {
      if (!this.savedNames.some(item => item.name === name.name)) {
        this.savedNames.push(name)
        this.saveToLocalStorage()
      }
    },
    
    removeSavedName(nameId) {
      this.savedNames = this.savedNames.filter(item => item.id !== nameId)
      this.saveToLocalStorage()
    },
    
    removeHistoryItem(historyId) {
      this.history = this.history.filter(item => item.id !== historyId)
      this.saveToLocalStorage()
    },
    
    saveToLocalStorage() {
      localStorage.setItem('user-data', JSON.stringify({
        savedNames: this.savedNames,
        history: this.history
      }))
    },
    
    loadFromLocalStorage() {
      const data = localStorage.getItem('user-data')
      if (data) {
        const parsed = JSON.parse(data)
        this.savedNames = parsed.savedNames || []
        this.history = parsed.history || []
      }
    }
  }
})

// 名字生成器存储
export const useNameGeneratorStore = defineStore('nameGenerator', {
  state: () => ({
    isLoading: false,
    error: null
  }),
  
  actions: {
    async generateNames(birthDate, birthTime, gender, lastName) {
      this.isLoading = true
      this.error = null
      
      try {
        // 使用环境变量判断是否使用真实API
        const useRealAPI = false // 设置为true时使用真实API，false时使用模拟数据
        
        let response
        if (useRealAPI) {
          // 调用真实的OpenAI API
          response = await callOpenAI({
            birthDate,
            birthTime,
            gender,
            lastName
          })
        } else {
          // 使用模拟数据
          response = await this.mockOpenAICall(birthDate, birthTime, gender, lastName)
        }
        
        // 获取用户存储并设置生成的名字
        const userStore = useUserStore()
        userStore.setGeneratedNames(response)
        
        return response
      } catch (error) {
        this.error = error.message || '生成名字时出错'
        console.error('生成名字错误:', error)
        return []
      } finally {
        this.isLoading = false
      }
    },
    
    // 模拟OpenAI API调用
    async mockOpenAICall(birthDate, birthTime, gender, lastName) {
      // 在实际应用中，这里应该是真实的API调用
      // 现在我们只是返回一些模拟数据
      
      return new Promise((resolve) => {
        setTimeout(() => {
          // 解析出生日期，获取年份
          const year = new Date(birthDate).getFullYear()
          
          // 根据年份确定生肖
          const zodiac = this.getChineseZodiac(year)
          
          // 根据出生日期确定五行
          const wuxing = this.getWuXing(birthDate)
          
          // 根据性别选择不同的名字风格
          const names = this.generateMockNames(lastName, gender, zodiac, wuxing)
          
          resolve(names)
        }, 1500) // 模拟网络延迟
      })
    },
    
    // 获取中国生肖
    getChineseZodiac(year) {
      const zodiacSigns = ['鼠', '牛', '虎', '兔', '龙', '蛇', '马', '羊', '猴', '鸡', '狗', '猪']
      return zodiacSigns[(year - 4) % 12]
    },
    
    // 简化的五行计算（实际应用中应该更复杂）
    getWuXing(birthDate) {
      const date = new Date(birthDate)
      const month = date.getMonth() + 1
      
      // 简化的五行分配
      if (month >= 3 && month <= 4) return '木'
      if (month >= 5 && month <= 6) return '火'
      if (month >= 7 && month <= 8) return '土'
      if (month >= 9 && month <= 10) return '金'
      return '水' // 11, 12, 1, 2月
    },
    
    // 生成模拟名字
    generateMockNames(lastName, gender, zodiac, wuxing) {
      // 这里应该是基于五行、生肖等因素的复杂逻辑
      // 现在我们只是返回一些固定的示例
      
      const maleNames = [
        {
          id: 1,
          name: `${lastName}浩然`,
          meaning: '胸怀宽广，气宇轩昂',
          wuxing: '水木组合，生生不息',
          zodiac: `与${zodiac}相合，寓意勇往直前`
        },
        {
          id: 2,
          name: `${lastName}俊杰`,
          meaning: '才智过人，卓尔不凡',
          wuxing: '金木组合，相辅相成',
          zodiac: `与${zodiac}相合，寓意聪明才智`
        },
        {
          id: 3,
          name: `${lastName}志远`,
          meaning: '志向远大，前程似锦',
          wuxing: '火土组合，稳固发展',
          zodiac: `与${zodiac}相合，寓意坚定不移`
        }
      ]
      
      const femaleNames = [
        {
          id: 1,
          name: `${lastName}雅琪`,
          meaning: '优雅高贵，琪是美玉',
          wuxing: '土金组合，厚德载物',
          zodiac: `与${zodiac}相合，寓意温婉贤淑`
        },
        {
          id: 2,
          name: `${lastName}诗颖`,
          meaning: '如诗如画，聪颖过人',
          wuxing: '水火组合，相生相克',
          zodiac: `与${zodiac}相合，寓意灵秀聪慧`
        },
        {
          id: 3,
          name: `${lastName}梦瑶`,
          meaning: '梦幻美好，瑶是美玉',
          wuxing: '木水组合，生机盎然',
          zodiac: `与${zodiac}相合，寓意纯洁美好`
        }
      ]
      
      return gender === '男' ? maleNames : femaleNames
    }
  }
}) 