import { defineComponent, h, ref, computed, onMounted } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'
import { useUserStore } from '../store/index.js'
import { useNameGeneratorStore } from '../store/index.js'

export default defineComponent({
  name: 'NameGenerator',
  setup() {
    // 获取存储
    const userStore = useUserStore()
    const nameGeneratorStore = useNameGeneratorStore()
    
    // 表单数据
    const birthDate = ref('')
    const birthTime = ref('')
    const gender = ref('')
    const lastName = ref('')
    
    // 生成的名字
    const generatedNames = computed(() => userStore.generatedNames)
    
    // 加载状态
    const isLoading = computed(() => nameGeneratorStore.isLoading)
    const error = computed(() => nameGeneratorStore.error)
    
    // 表单验证
    const isFormValid = computed(() => {
      return birthDate.value && gender.value && lastName.value
    })
    
    // 生成名字
    const generateNames = async () => {
      if (!isFormValid.value) return
      
      // 保存用户输入
      userStore.setBirthInfo(birthDate.value, birthTime.value)
      userStore.setGender(gender.value)
      userStore.setLastName(lastName.value)
      
      // 生成名字
      await nameGeneratorStore.generateNames(
        birthDate.value,
        birthTime.value,
        gender.value,
        lastName.value
      )
    }
    
    // 保存名字
    const saveName = (name) => {
      userStore.saveName(name)
      alert(`已保存名字: ${name.name}`)
    }
    
    // 重新生成
    const regenerate = () => {
      generateNames()
    }
    
    // 分享名字
    const shareName = (name) => {
      // 在实际应用中，这里应该实现社交媒体分享功能
      alert(`分享名字: ${name.name}`)
    }
    
    // 组件挂载时从本地存储加载数据
    onMounted(() => {
      userStore.loadFromLocalStorage()
    })
    
    return () => h('div', { class: 'name-generator' }, [
      h('h1', { class: 'page-title' }, '为您的孩子取名'),
      
      // 表单部分
      h('div', { class: 'card' }, [
        h('h2', { class: 'card-title' }, '输入基本信息'),
        
        h('div', { class: 'form-group' }, [
          h('label', { class: 'form-label' }, '出生日期'),
          h('input', {
            type: 'date',
            class: 'form-input',
            value: birthDate.value,
            onInput: (e) => birthDate.value = e.target.value,
            required: true
          })
        ]),
        
        h('div', { class: 'form-group' }, [
          h('label', { class: 'form-label' }, '出生时辰 (可选)'),
          h('select', {
            class: 'form-input',
            value: birthTime.value,
            onInput: (e) => birthTime.value = e.target.value
          }, [
            h('option', { value: '' }, '-- 请选择 --'),
            h('option', { value: '子时' }, '子时 (23:00-01:00)'),
            h('option', { value: '丑时' }, '丑时 (01:00-03:00)'),
            h('option', { value: '寅时' }, '寅时 (03:00-05:00)'),
            h('option', { value: '卯时' }, '卯时 (05:00-07:00)'),
            h('option', { value: '辰时' }, '辰时 (07:00-09:00)'),
            h('option', { value: '巳时' }, '巳时 (09:00-11:00)'),
            h('option', { value: '午时' }, '午时 (11:00-13:00)'),
            h('option', { value: '未时' }, '未时 (13:00-15:00)'),
            h('option', { value: '申时' }, '申时 (15:00-17:00)'),
            h('option', { value: '酉时' }, '酉时 (17:00-19:00)'),
            h('option', { value: '戌时' }, '戌时 (19:00-21:00)'),
            h('option', { value: '亥时' }, '亥时 (21:00-23:00)')
          ])
        ]),
        
        h('div', { class: 'form-group' }, [
          h('label', { class: 'form-label' }, '性别'),
          h('div', { class: 'radio-group' }, [
            h('label', { class: 'radio-label' }, [
              h('input', {
                type: 'radio',
                name: 'gender',
                value: '男',
                checked: gender.value === '男',
                onInput: () => gender.value = '男'
              }),
              ' 男孩'
            ]),
            h('label', { class: 'radio-label' }, [
              h('input', {
                type: 'radio',
                name: 'gender',
                value: '女',
                checked: gender.value === '女',
                onInput: () => gender.value = '女'
              }),
              ' 女孩'
            ])
          ])
        ]),
        
        h('div', { class: 'form-group' }, [
          h('label', { class: 'form-label' }, '姓氏'),
          h('input', {
            type: 'text',
            class: 'form-input',
            value: lastName.value,
            onInput: (e) => lastName.value = e.target.value,
            placeholder: '请输入姓氏',
            required: true
          })
        ]),
        
        h('button', {
          class: 'btn',
          disabled: !isFormValid.value || isLoading.value,
          onClick: generateNames
        }, isLoading.value ? '生成中...' : '生成名字')
      ]),
      
      // 错误信息
      error.value ? h('div', { class: 'error-message' }, error.value) : null,
      
      // 生成的名字列表
      generatedNames.value.length > 0 ? h('div', { class: 'generated-names' }, [
        h('h2', { class: 'section-title' }, '推荐名字'),
        
        ...generatedNames.value.map(name => 
          h('div', { class: 'name-card', key: name.id }, [
            h('h3', { class: 'name-card-title' }, name.name),
            h('p', { class: 'name-card-meaning' }, `寓意: ${name.meaning}`),
            h('div', { class: 'name-card-analysis' }, [
              h('p', {}, `五行分析: ${name.wuxing}`),
              h('p', {}, `生肖分析: ${name.zodiac}`)
            ]),
            h('div', { class: 'name-card-actions' }, [
              h('button', {
                class: 'btn',
                onClick: () => saveName(name)
              }, '保存'),
              h('button', {
                class: 'btn btn-secondary',
                onClick: () => shareName(name)
              }, '分享')
            ])
          ])
        ),
        
        h('button', {
          class: 'btn btn-secondary regenerate-btn',
          onClick: regenerate,
          disabled: isLoading.value
        }, isLoading.value ? '生成中...' : '重新生成')
      ]) : null
    ])
  }
}) 