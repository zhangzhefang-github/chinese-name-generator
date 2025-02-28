import { defineComponent, h, ref } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'

export default defineComponent({
  name: 'Feedback',
  setup() {
    // 表单数据
    const name = ref('')
    const email = ref('')
    const rating = ref(5)
    const feedback = ref('')
    const submitted = ref(false)
    
    // 提交反馈
    const submitFeedback = () => {
      // 在实际应用中，这里应该发送数据到服务器
      console.log('提交反馈:', {
        name: name.value,
        email: email.value,
        rating: rating.value,
        feedback: feedback.value
      })
      
      // 显示成功消息
      submitted.value = true
      
      // 重置表单
      name.value = ''
      email.value = ''
      rating.value = 5
      feedback.value = ''
      
      // 3秒后隐藏成功消息
      setTimeout(() => {
        submitted.value = false
      }, 3000)
    }
    
    return () => h('div', { class: 'feedback-page' }, [
      h('h1', { class: 'page-title' }, '用户反馈'),
      
      h('div', { class: 'card' }, [
        h('h2', { class: 'card-title' }, '您的意见对我们很重要'),
        h('p', { class: 'card-desc' }, '请告诉我们您对好名好运AI取名应用的体验和建议，帮助我们不断改进。'),
        
        // 成功提交消息
        submitted.value 
          ? h('div', { class: 'success-message' }, '感谢您的反馈！我们会认真考虑您的建议。')
          : null,
        
        // 反馈表单
        h('form', {
          class: 'feedback-form',
          onSubmit: (e) => {
            e.preventDefault()
            submitFeedback()
          }
        }, [
          h('div', { class: 'form-group' }, [
            h('label', { class: 'form-label' }, '您的姓名'),
            h('input', {
              type: 'text',
              class: 'form-input',
              value: name.value,
              onInput: (e) => name.value = e.target.value,
              placeholder: '请输入您的姓名'
            })
          ]),
          
          h('div', { class: 'form-group' }, [
            h('label', { class: 'form-label' }, '电子邮箱'),
            h('input', {
              type: 'email',
              class: 'form-input',
              value: email.value,
              onInput: (e) => email.value = e.target.value,
              placeholder: '请输入您的电子邮箱'
            })
          ]),
          
          h('div', { class: 'form-group' }, [
            h('label', { class: 'form-label' }, '应用评分'),
            h('div', { class: 'rating-input' }, [
              ...[1, 2, 3, 4, 5].map(value => 
                h('label', { class: 'rating-label' }, [
                  h('input', {
                    type: 'radio',
                    name: 'rating',
                    value: value,
                    checked: rating.value === value,
                    onChange: () => rating.value = value
                  }),
                  ` ${value}星`
                ])
              )
            ])
          ]),
          
          h('div', { class: 'form-group' }, [
            h('label', { class: 'form-label' }, '您的反馈'),
            h('textarea', {
              class: 'form-input form-textarea',
              value: feedback.value,
              onInput: (e) => feedback.value = e.target.value,
              placeholder: '请输入您的反馈和建议',
              rows: 5
            })
          ]),
          
          h('button', {
            type: 'submit',
            class: 'btn'
          }, '提交反馈')
        ])
      ]),
      
      h('div', { class: 'contact-info' }, [
        h('h3', {}, '联系我们'),
        h('p', {}, '如果您有任何问题或建议，也可以通过以下方式联系我们：'),
        h('p', {}, '电子邮箱: contact@haohaoyun.com'),
        h('p', {}, '微信公众号: 好名好运AI')
      ])
    ])
  }
}) 