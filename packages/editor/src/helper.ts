import type { IWidget } from '@sepveneto/mpd-core'
import { useApp } from './store'
import Validator from 'async-validator'

async function validate() {
  const app = useApp()
  const pages = Object.keys(app.config.body)
  for (const page of pages) {
    const pageData = formatData(app.config.body[page])

    for (const uid of Object.keys(pageData)) {
      const data = pageData[uid]
      const rules = app.schemaRule.get(data._schema)
      if (!rules) continue

      const validator = new Validator(rules)
      const res = await validator.validate(data).catch(() => {
        return false
      })
      if (res === false) {
        return data
      }
    }
  }
  return true
}

function formatData(
  list: IWidget<any>[],
  pageData: Record<string, any> = {},
) {
  list.forEach(widget => {
    if (widget._schema === 'tabbar') return

    if (widget._schema === 'container') {
      formatData(widget.list, pageData)
    } else {
      pageData[widget._uuid] = widget
    }
  })
  return pageData
}

function selectWidget(data: any) {
  const app = useApp()
  app.selected = data
}

export function register() {
  window.microApp?.dispatch({
    validate,
    selectWidget,
  })
}
