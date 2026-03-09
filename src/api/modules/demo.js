const DEMO_LIST = [
  { id: 1, title: 'Template Card A', summary: '通用卡片示例 A', content: 'This is demo detail content for card A.' },
  { id: 2, title: 'Template Card B', summary: '通用卡片示例 B', content: 'This is demo detail content for card B.' },
  { id: 3, title: 'Template Card C', summary: '通用卡片示例 C', content: 'This is demo detail content for card C.' }
]

export function getDemoList() {
  return Promise.resolve({
    code: 0,
    message: 'success',
    data: DEMO_LIST.map(({ id, title, summary }) => ({ id, title, summary }))
  })
}

export function getDemoDetail(parameter = {}) {
  const id = Number((parameter.params || {}).id)
  const item = DEMO_LIST.find((entry) => entry.id === id)

  if (!item) {
    return Promise.resolve({
      code: 404,
      message: 'not found',
      data: null
    })
  }

  return Promise.resolve({
    code: 0,
    message: 'success',
    data: item
  })
}
