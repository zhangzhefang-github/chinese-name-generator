import { defineComponent, h } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'
import { RouterLink } from 'https://unpkg.com/vue-router@4/dist/vue-router.esm-browser.js'

export default defineComponent({
  name: 'Home',
  setup() {
    return () => h('div', { class: 'home' }, [
      h('div', { class: 'hero' }, [
        h('h1', { class: 'hero-title' }, '为您的孩子取一个吉祥如意的好名字'),
        h('p', { class: 'hero-subtitle' }, '基于五行、生肖和音韵学，为您的孩子定制一个独特而有意义的名字'),
        h(RouterLink, 
          { to: '/generate', class: 'btn btn-primary hero-btn' }, 
          { default: () => '开始取名' }
        )
      ]),
      
      h('div', { class: 'features' }, [
        h('h2', { class: 'section-title' }, '我们的特色'),
        h('div', { class: 'feature-grid' }, [
          h('div', { class: 'feature-card' }, [
            h('h3', { class: 'feature-title' }, '五行分析'),
            h('p', { class: 'feature-desc' }, '根据出生日期分析五行（金、木、水、火、土）的缺失或平衡，选择合适的名字字形。')
          ]),
          h('div', { class: 'feature-card' }, [
            h('h3', { class: 'feature-title' }, '生肖分析'),
            h('p', { class: 'feature-desc' }, '根据孩子的出生年份，分析生肖，推荐与生肖相配的吉祥名字元素。')
          ]),
          h('div', { class: 'feature-card' }, [
            h('h3', { class: 'feature-title' }, '音韵与字形'),
            h('p', { class: 'feature-desc' }, '生成的名字会确保音韵和谐、字形美观，符合音律的美感。')
          ]),
          h('div', { class: 'feature-card' }, [
            h('h3', { class: 'feature-title' }, '性别匹配'),
            h('p', { class: 'feature-desc' }, '根据性别调整名字风格，以确保名字的性别特征（例如，男孩名字偏阳刚，女孩名字偏柔美）。')
          ])
        ])
      ]),
      
      h('div', { class: 'how-it-works' }, [
        h('h2', { class: 'section-title' }, '如何使用'),
        h('div', { class: 'steps' }, [
          h('div', { class: 'step' }, [
            h('div', { class: 'step-number' }, '1'),
            h('div', { class: 'step-content' }, [
              h('h3', { class: 'step-title' }, '输入基本信息'),
              h('p', { class: 'step-desc' }, '提供孩子的出生日期、时辰（可选）、性别和姓氏。')
            ])
          ]),
          h('div', { class: 'step' }, [
            h('div', { class: 'step-number' }, '2'),
            h('div', { class: 'step-content' }, [
              h('h3', { class: 'step-title' }, '生成名字推荐'),
              h('p', { class: 'step-desc' }, '系统会根据您提供的信息，分析五行和生肖，生成最适合的名字推荐。')
            ])
          ]),
          h('div', { class: 'step' }, [
            h('div', { class: 'step-number' }, '3'),
            h('div', { class: 'step-content' }, [
              h('h3', { class: 'step-title' }, '查看名字解析'),
              h('p', { class: 'step-desc' }, '每个推荐的名字都会附带详细的解析，包括五行分析、生肖相合度和名字寓意。')
            ])
          ]),
          h('div', { class: 'step' }, [
            h('div', { class: 'step-number' }, '4'),
            h('div', { class: 'step-content' }, [
              h('h3', { class: 'step-title' }, '保存喜欢的名字'),
              h('p', { class: 'step-desc' }, '您可以保存喜欢的名字，以便日后查看或与家人分享。')
            ])
          ])
        ])
      ]),
      
      h('div', { class: 'cta' }, [
        h('h2', { class: 'cta-title' }, '立即为您的孩子取一个好名字'),
        h('p', { class: 'cta-desc' }, '一个好名字将伴随孩子一生，给予他们好运和祝福。'),
        h(RouterLink, 
          { to: '/generate', class: 'btn btn-primary cta-btn' }, 
          { default: () => '开始取名' }
        )
      ])
    ])
  }
}) 