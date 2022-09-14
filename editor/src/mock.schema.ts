const cardSchema = [
  {
    type: 'number',
    label: '顶部外边距',
    key: 'style.marginTop',
  },
  {
    type: 'number',
    label: '底部外边距',
    key: 'style.marginBottom',
  },
  {
    type: 'number',
    label: '边框圆角',
    key: 'style.borderRadius',
  },
  {
    type: 'number',
    label: '宽度',
    key: 'style.width',
  },
  {
    type: 'number',
    label: '高度',
    key: 'style.height',
  },
  {
    type: 'checkbox',
    label: '可见性',
    key: 'isShow',
  },
  {
    type: 'image',
    label: '背景图片',
    key: 'defaultImg',
  }
]

const explain = [
  {
    type: 'number',
    label: '顶部外边距',
    key: 'style.marginTop',
  },
  {
    type: 'number',
    label: '底部外边距',
    key: 'style.marginBottom',
  },
  {
    type: 'number',
    label: '边框圆角',
    key: 'style.borderRadius',
  },
  {
    type: 'number',
    label: '宽度',
    key: 'style.width',
  },
  {
    type: 'number',
    label: '高度',
    key: 'style.height',
  },
  {
    type: 'checkbox',
    label: '可见性',
    key: 'isShow',
  },
  {
    type: 'image',
    label: '背景图片',
    key: 'defaultImg',
  }
]

const shop = [
  {
    type: 'number',
    label: '顶部外边距',
    key: 'style.marginTop',
  },
  {
    type: 'number',
    label: '底部外边距',
    key: 'style.marginBottom',
  },
  {
    type: 'number',
    label: '宽度',
    key: 'style.width',
  },
  {
    type: 'number',
    label: '高度',
    key: 'style.height',
  },
  {
    type: 'checkbox',
    label: '可见性',
    key: 'isShow',
  },
  {
    type: 'input',
    label: '跳转地址',
    key: 'url',
  },
  {
    type: 'image',
    label: '背景图片',
    key: 'defaultImg',
  }
]

const reserve = [
  {
    type: 'number',
    label: '顶部外边距',
    key: 'style.marginTop',
  },
  {
    type: 'number',
    label: '底部外边距',
    key: 'style.marginBottom',
  },
  {
    type: 'number',
    label: '宽度',
    key: 'style.width',
  },
  {
    type: 'number',
    label: '高度',
    key: 'style.height',
  },
  {
    type: 'checkbox',
    label: '可见性',
    key: 'isShow',
  },
  {
    type: 'image',
    label: '背景图片',
    key: 'defaultImg',
  },
  {
    type: 'input',
    label: '菜品预定名称',
    key: 'title.content',
  },
  {
    type: 'input',
    label: '菜品预定描述',
    key: 'desc.content'
  }
]

const mine = [
  ...cardSchema,
  {
    type: 'checkbox',
    label: '解绑',
    key: 'unbound',
    trueLabel: 1,
    falseLabel: 0,
  },
  {
    type: 'checkbox',
    label: '充值',
    key: 'recharge',
    trueLabel: 1,
    falseLabel: 0,
  }
]

const container = [
  {
    type: 'number',
    label: '列',
    key: 'grid',
  }
]

const menuItem = [
  {
    type: 'input',
    label: '标题',
    key: 'title',
  }
]

const desc = [
  {
    type: 'editor',
    label: '说明内容',
    key: 'content',
  }
]

export const schema = {
  card: cardSchema,
  explain,
  shop,
  mine,
  reserve,
  container,
  menuItem,
  desc,
}
