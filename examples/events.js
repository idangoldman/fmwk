import { component, route } from 'blah.ink/fmwk.js'

component('nav#top_menu', ({ events }) => {
  events.on('click:preventDefault', 'a', (event) => {
    route.go(event.element.href)
  })
})

component('form#login', ({ events, inputs }) => {
  events.on('submit:preventDefault', async () => {
    if (inputs.areValid) {
      await fetch(inputs.action, {
        method: inputs.method,
        body: inputs.toJSON
      })
    }
  })

  element.on('before:create', (hook) => {
    console.log(hook.data)
  })

  element.on('around:create', (event) => {
    console.log(event.callback)
  })
})

component('form#login', ({ events }) => {
  events.wait('300ms').trigger('focus', '.username').wait(1, 'second').trigger('focus', '.password')
})

component('.posts', ({ element, locals, events }) => {
  events.on('click:preventDefault', '.load-more', () => {
    const posts = locals.posts.where('id > ?', element.count('.posts-list')).limit(10)

    if (posts.empty()) {
      element.update('.load-more', {
        disabled: true,
        'aria-hidden': true
      })
    }

    element.append('.posts-list', posts)
  })

  element.update([
    {
      selector: '.main-article',
      type: 'attribute',
      key: 'data-id',
      value: '4'
    }
  ])

  element.update('.main-article', {
    style: {
      'font-size': '16px'
    }
  })

  element.where('input').remove('disabled')
})
