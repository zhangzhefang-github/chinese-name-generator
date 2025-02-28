import { defineComponent, h, computed, onMounted } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'
import { useUserStore } from '../store/index.js'

export default defineComponent({
  name: 'History',
  setup() {
    // 获取用户存储
    const userStore = useUserStore()
    
    // 历史记录
    const history = computed(() => userStore.history)
    
    // 保存的名字
    const savedNames = computed(() => userStore.savedNames)
    
    // 格式化日期
    const formatDate = (dateString) => {
      const date = new Date(dateString)
      return date.toLocaleString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      })
    }
    
    // 删除历史记录
    const removeHistoryItem = (id) => {
      if (confirm('确定要删除这条历史记录吗？')) {
        userStore.removeHistoryItem(id)
      }
    }
    
    // 删除保存的名字
    const removeSavedName = (id) => {
      if (confirm('确定要删除这个保存的名字吗？')) {
        userStore.removeSavedName(id)
      }
    }
    
    // 组件挂载时从本地存储加载数据
    onMounted(() => {
      userStore.loadFromLocalStorage()
    })
    
    return () => h('div', { class: 'history-page' }, [
      h('h1', { class: 'page-title' }, '历史记录'),
      
      // 保存的名字
      h('div', { class: 'saved-names-section' }, [
        h('h2', { class: 'section-title' }, '保存的名字'),
        
        savedNames.value.length > 0 
          ? h('div', { class: 'saved-names' }, [
              ...savedNames.value.map(name => 
                h('div', { class: 'name-card', key: name.id }, [
                  h('h3', { class: 'name-card-title' }, name.name),
                  h('p', { class: 'name-card-meaning' }, `寓意: ${name.meaning}`),
                  h('div', { class: 'name-card-analysis' }, [
                    h('p', {}, `五行分析: ${name.wuxing}`),
                    h('p', {}, `生肖分析: ${name.zodiac}`)
                  ]),
                  h('div', { class: 'name-card-actions' }, [
                    h('button', {
                      class: 'btn btn-secondary',
                      onClick: () => removeSavedName(name.id)
                    }, '删除')
                  ])
                ])
              )
            ])
          : h('p', { class: 'empty-message' }, '暂无保存的名字')
      ]),
      
      // 历史记录
      h('div', { class: 'history-section' }, [
        h('h2', { class: 'section-title' }, '生成历史'),
        
        history.value.length > 0
          ? h('div', { class: 'history-list' }, [
              ...history.value.map(item => 
                h('div', { class: 'history-card', key: item.id }, [
                  h('div', { class: 'history-card-header' }, [
                    h('h3', { class: 'history-card-title' }, `${item.lastName}氏${item.gender}孩取名`),
                    h('span', { class: 'history-card-date' }, formatDate(item.date))
                  ]),
                  h('div', { class: 'history-card-details' }, [
                    h('p', {}, `出生日期: ${item.birthDate}`),
                    item.birthTime ? h('p', {}, `出生时辰: ${item.birthTime}`) : null
                  ]),
                  h('div', { class: 'history-card-names' }, [
                    h('h4', {}, '生成的名字:'),
                    h('ul', {}, [
                      ...item.names.map(name => 
                        h('li', { key: name.id }, name.name)
                      )
                    ])
                  ]),
                  h('div', { class: 'history-card-actions' }, [
                    h('button', {
                      class: 'btn btn-secondary',
                      onClick: () => removeHistoryItem(item.id)
                    }, '删除')
                  ])
                ])
              )
            ])
          : h('p', { class: 'empty-message' }, '暂无历史记录')
      ])
    ])
  }
}) 