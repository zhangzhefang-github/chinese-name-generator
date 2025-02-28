import { defineComponent, h } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'
import { RouterView, RouterLink } from 'https://unpkg.com/vue-router@4/dist/vue-router.esm-browser.js'

export default defineComponent({
  name: 'App',
  setup() {
    return () => h('div', { class: 'app' }, [
      h('header', { class: 'header' }, [
        h('div', { class: 'container' }, [
          h('h1', { class: 'logo' }, '好名好运 AI'),
          h('nav', { class: 'nav' }, [
            h(RouterLink, { to: '/' }, { default: () => '首页' }),
            h(RouterLink, { to: '/generate' }, { default: () => '取名' }),
            h(RouterLink, { to: '/history' }, { default: () => '历史记录' }),
            h(RouterLink, { to: '/feedback' }, { default: () => '反馈' })
          ])
        ])
      ]),
      h('main', { class: 'main container' }, [
        h(RouterView)
      ]),
      h('footer', { class: 'footer' }, [
        h('div', { class: 'container' }, [
          h('p', '© 2023 好名好运 AI 取名应用 - 为您的孩子取一个吉祥如意的好名字')
        ])
      ])
    ])
  }
}) 