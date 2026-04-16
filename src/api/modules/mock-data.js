import mpx from '@mpxjs/core'

const CURRENT_USER_ID = 'user_001'
const SESSION_STORAGE_KEY = 'template_session'

let hotKeywords = [
  { id: 'hot_001', keyword: '上海探店', heat: 98 },
  { id: 'hot_002', keyword: '春季穿搭', heat: 93 },
  { id: 'hot_003', keyword: '减脂餐', heat: 89 },
  { id: 'hot_004', keyword: '租房改造', heat: 86 },
  { id: 'hot_005', keyword: '通勤包', heat: 81 }
]

let topics = [
  {
    id: 'topic_001',
    name: '#上海探店',
    desc: '发现上海值得去的好地方',
    coverUrl: '/src/static/images/mock/topic-shanghai.jpg',
    noteCount: 126000
  },
  {
    id: 'topic_002',
    name: '#周末去哪玩',
    desc: '周末短途和城市漫游灵感',
    coverUrl: '/src/static/images/mock/topic-weekend.jpg',
    noteCount: 98300
  },
  {
    id: 'topic_003',
    name: '#平价好物推荐',
    desc: '高性价比日常好物持续更新',
    coverUrl: '/src/static/images/mock/topic-goodthings.jpg',
    noteCount: 83200
  }
]

let users = [
  {
    id: 'user_001',
    avatar: '/src/static/images/mock/avatar-1.jpg',
    nickname: 'Momo',
    name: 'Momo',
    bio: '认真记录城市灵感',
    gender: 'female',
    location: '上海',
    isFollowed: false,
    followCount: 32,
    fansCount: 1280,
    likedReceivedCount: 2300
  },
  {
    id: 'user_002',
    avatar: '/src/static/images/mock/avatar-2.jpg',
    nickname: '阿橘',
    name: '阿橘',
    bio: '探店和生活方式分享',
    gender: 'female',
    location: '杭州',
    isFollowed: true,
    followCount: 86,
    fansCount: 5600,
    likedReceivedCount: 12000
  },
  {
    id: 'user_003',
    avatar: '/src/static/images/mock/avatar-3.jpg',
    nickname: '周末研究所',
    name: '周末研究所',
    bio: '只发周末出游攻略',
    gender: 'unknown',
    location: '苏州',
    isFollowed: false,
    followCount: 18,
    fansCount: 920,
    likedReceivedCount: 4100
  },
  {
    id: 'user_004',
    avatar: '/src/static/images/mock/avatar-4.jpg',
    nickname: 'Yuki',
    name: 'Yuki',
    bio: '偏爱家居和生活小物',
    gender: 'female',
    location: '南京',
    isFollowed: false,
    followCount: 54,
    fansCount: 2100,
    likedReceivedCount: 5300
  }
]

let noteCards = [
  {
    id: 'note_1001',
    coverUrl: '/src/static/images/mock/note-1.jpg',
    coverRatio: 0.75,
    title: '周末上海 3 个很出片的散步路线',
    author: { id: 'user_001', avatar: '/src/static/images/mock/avatar-1.jpg', nickname: 'Momo' },
    likeCount: 1280,
    liked: false
  },
  {
    id: 'note_1002',
    coverUrl: '/src/static/images/mock/note-2.jpg',
    coverRatio: 1.25,
    title: '百元内也能买到质感很好的通勤包',
    author: { id: 'user_002', avatar: '/src/static/images/mock/avatar-2.jpg', nickname: '阿橘' },
    likeCount: 856,
    liked: true
  },
  {
    id: 'note_1003',
    coverUrl: '/src/static/images/mock/note-3.jpg',
    coverRatio: 0.8,
    title: '租房客也能做的奶油风角落改造',
    author: { id: 'user_001', avatar: '/src/static/images/mock/avatar-1.jpg', nickname: 'Momo' },
    likeCount: 2301,
    liked: false
  },
  {
    id: 'note_1004',
    coverUrl: '/src/static/images/mock/note-4.jpg',
    coverRatio: 1.1,
    title: '工作日 15 分钟减脂午餐备菜思路',
    author: { id: 'user_003', avatar: '/src/static/images/mock/avatar-3.jpg', nickname: '周末研究所' },
    likeCount: 642,
    liked: false
  },
  {
    id: 'note_1005',
    coverUrl: '/src/static/images/mock/note-5.jpg',
    coverRatio: 0.74,
    title: '春季通勤穿搭 5 套不出错公式',
    author: { id: 'user_002', avatar: '/src/static/images/mock/avatar-2.jpg', nickname: '阿橘' },
    likeCount: 1762,
    liked: true
  },
  {
    id: 'note_1006',
    coverUrl: '/src/static/images/mock/note-6.jpg',
    coverRatio: 1.2,
    title: '第一次去苏州，两天一夜怎么走最顺',
    author: { id: 'user_003', avatar: '/src/static/images/mock/avatar-3.jpg', nickname: '周末研究所' },
    likeCount: 934,
    liked: false
  }
]

let noteDetails = {
  note_1001: {
    id: 'note_1001',
    images: [
      '/src/static/images/mock/note-detail-1.jpg',
      '/src/static/images/mock/note-detail-2.jpg',
      '/src/static/images/mock/note-detail-3.jpg'
    ],
    title: '周末上海 3 个很出片的散步路线',
    content: '整理了 3 条我最近反复走的散步路线，适合拍照，也适合慢慢逛。第一条适合上午，第二条适合傍晚，第三条适合阴天。',
    author: { id: 'user_001', avatar: '/src/static/images/mock/avatar-1.jpg', nickname: 'Momo' },
    topics: [{ id: 'topic_001', name: '#上海探店' }, { id: 'topic_002', name: '#周末去哪玩' }],
    categoryId: 'travel',
    locationText: '上海市静安区',
    publishTime: '2026-04-15 10:20:00',
    liked: false,
    collected: false,
    likeCount: 1280,
    collectCount: 362,
    commentCount: 12,
    shareCount: 48,
    status: 'published'
  },
  note_1002: {
    id: 'note_1002',
    images: ['/src/static/images/mock/note-2.jpg'],
    title: '百元内也能买到质感很好的通勤包',
    content: '最近把通勤包换成了更轻量的款式，这几只都是百元内但质感不错的选择。',
    author: { id: 'user_002', avatar: '/src/static/images/mock/avatar-2.jpg', nickname: '阿橘' },
    topics: [{ id: 'topic_003', name: '#平价好物推荐' }],
    categoryId: 'outfit',
    locationText: '杭州市西湖区',
    publishTime: '2026-04-14 21:00:00',
    liked: true,
    collected: true,
    likeCount: 856,
    collectCount: 210,
    commentCount: 9,
    shareCount: 25,
    status: 'published'
  },
  note_1003: {
    id: 'note_1003',
    images: ['/src/static/images/mock/note-3.jpg'],
    title: '租房客也能做的奶油风角落改造',
    content: '不大动硬装也能让租房角落更有氛围，这几个低成本细节特别有效。',
    author: { id: 'user_001', avatar: '/src/static/images/mock/avatar-1.jpg', nickname: 'Momo' },
    topics: [{ id: 'topic_003', name: '#平价好物推荐' }],
    categoryId: 'home',
    locationText: '上海市长宁区',
    publishTime: '2026-04-13 09:20:00',
    liked: false,
    collected: false,
    likeCount: 2301,
    collectCount: 460,
    commentCount: 18,
    shareCount: 60,
    status: 'published'
  },
  note_1004: {
    id: 'note_1004',
    images: ['/src/static/images/mock/note-4.jpg'],
    title: '工作日 15 分钟减脂午餐备菜思路',
    content: '用最少的时间把一周午餐备好，重点是组合和调味。',
    author: { id: 'user_003', avatar: '/src/static/images/mock/avatar-3.jpg', nickname: '周末研究所' },
    topics: [{ id: 'topic_003', name: '#平价好物推荐' }],
    categoryId: 'food',
    locationText: '苏州市工业园区',
    publishTime: '2026-04-12 12:00:00',
    liked: false,
    collected: false,
    likeCount: 642,
    collectCount: 141,
    commentCount: 4,
    shareCount: 12,
    status: 'published'
  },
  note_1005: {
    id: 'note_1005',
    images: ['/src/static/images/mock/note-5.jpg'],
    title: '春季通勤穿搭 5 套不出错公式',
    content: '挑了 5 套最容易复用的通勤搭配，颜色和层次会更重要。',
    author: { id: 'user_002', avatar: '/src/static/images/mock/avatar-2.jpg', nickname: '阿橘' },
    topics: [{ id: 'topic_003', name: '#平价好物推荐' }],
    categoryId: 'outfit',
    locationText: '杭州市滨江区',
    publishTime: '2026-04-11 08:30:00',
    liked: true,
    collected: true,
    likeCount: 1762,
    collectCount: 520,
    commentCount: 16,
    shareCount: 31,
    status: 'published'
  },
  note_1006: {
    id: 'note_1006',
    images: ['/src/static/images/mock/note-6.jpg'],
    title: '第一次去苏州，两天一夜怎么走最顺',
    content: '第一次去苏州不用贪多，围绕几个核心区域走最舒服。',
    author: { id: 'user_003', avatar: '/src/static/images/mock/avatar-3.jpg', nickname: '周末研究所' },
    topics: [{ id: 'topic_002', name: '#周末去哪玩' }],
    categoryId: 'travel',
    locationText: '苏州市姑苏区',
    publishTime: '2026-04-10 15:40:00',
    liked: false,
    collected: false,
    likeCount: 934,
    collectCount: 244,
    commentCount: 8,
    shareCount: 20,
    status: 'published'
  }
}

let drafts = [
  {
    draftId: 'draft_001',
    title: '静安寺附近散步路线整理',
    content: '先记一下路线和店名，回头补图。',
    images: ['/src/static/images/mock/draft-1.jpg', '/src/static/images/mock/draft-2.jpg'],
    topics: [{ id: 'topic_001', name: '#上海探店' }],
    categoryId: 'travel',
    locationText: '上海市静安区',
    updatedAt: '2026-04-15 18:30:00'
  },
  {
    draftId: 'draft_002',
    title: '',
    content: '通勤穿搭备忘',
    images: ['/src/static/images/mock/draft-3.jpg'],
    topics: [],
    categoryId: 'outfit',
    locationText: '',
    updatedAt: '2026-04-14 21:10:00'
  }
]

let commentsByNoteId = {
  note_1001: [
    {
      id: 'comment_001',
      noteId: 'note_1001',
      user: { id: 'user_002', avatar: '/src/static/images/mock/avatar-2.jpg', nickname: '阿橘' },
      content: '这个路线太适合周末了！',
      parentId: '',
      replyUser: null,
      likeCount: 12,
      liked: false,
      createdAt: '2026-04-15 11:30:00',
      canDelete: false,
      replies: [
        {
          id: 'comment_002',
          noteId: 'note_1001',
          user: { id: 'user_001', avatar: '/src/static/images/mock/avatar-1.jpg', nickname: 'Momo' },
          content: '建议傍晚去，光线会更好。',
          parentId: 'comment_001',
          replyUser: { id: 'user_002', nickname: '阿橘' },
          likeCount: 2,
          liked: false,
          createdAt: '2026-04-15 11:36:00',
          canDelete: true
        }
      ]
    },
    {
      id: 'comment_003',
      noteId: 'note_1001',
      user: { id: 'user_003', avatar: '/src/static/images/mock/avatar-3.jpg', nickname: '周末研究所' },
      content: '收藏了，下周去走走看。',
      parentId: '',
      replyUser: null,
      likeCount: 5,
      liked: false,
      createdAt: '2026-04-15 12:10:00',
      canDelete: false,
      replies: []
    }
  ]
}

let messages = [
  {
    id: 'msg_001',
    type: 'like',
    actorUser: { id: 'user_002', avatar: '/src/static/images/mock/avatar-2.jpg', nickname: '阿橘' },
    targetType: 'note',
    targetId: 'note_1001',
    targetTitle: '周末上海 3 个很出片的散步路线',
    targetCover: '/src/static/images/mock/note-1.jpg',
    summary: '赞了你的笔记',
    isRead: false,
    createdAt: '2026-04-15 18:20:00'
  },
  {
    id: 'msg_002',
    type: 'comment',
    actorUser: { id: 'user_003', avatar: '/src/static/images/mock/avatar-3.jpg', nickname: '周末研究所' },
    targetType: 'comment',
    targetId: 'comment_003',
    noteId: 'note_1001',
    targetTitle: '收藏了，下周去走走看。',
    targetCover: '/src/static/images/mock/note-1.jpg',
    summary: '评论了你的笔记',
    isRead: false,
    createdAt: '2026-04-15 18:30:00'
  },
  {
    id: 'msg_003',
    type: 'follow',
    actorUser: { id: 'user_004', avatar: '/src/static/images/mock/avatar-4.jpg', nickname: 'Yuki' },
    targetType: 'user',
    targetId: 'user_001',
    targetTitle: '',
    targetCover: '',
    summary: '关注了你',
    isRead: true,
    createdAt: '2026-04-15 09:10:00'
  },
  {
    id: 'msg_004',
    type: 'system',
    actorUser: null,
    targetType: 'system',
    targetId: 'sys_001',
    targetTitle: '社区规范更新提醒',
    targetCover: '',
    summary: '系统通知',
    isRead: true,
    createdAt: '2026-04-15 08:10:00'
  }
]

function clone(data) {
  return JSON.parse(JSON.stringify(data))
}

function getPaging(parameter = {}) {
  const params = getPayload(parameter)
  const pageNo = Number(params.pageNo) || 1
  const pageSize = Number(params.pageSize) || 10

  return { pageNo, pageSize }
}

function syncEmbeddedUser(userId) {
  const user = users.find((item) => item.id === userId)
  if (!user) return

  noteCards = noteCards.map((item) => {
    if (item.author.id !== userId) return item
    return {
      ...item,
      author: {
        ...item.author,
        avatar: user.avatar,
        nickname: user.nickname
      }
    }
  })

  Object.keys(noteDetails).forEach((key) => {
    if (noteDetails[key].author.id === userId) {
      noteDetails[key] = {
        ...noteDetails[key],
        author: {
          ...noteDetails[key].author,
          avatar: user.avatar,
          nickname: user.nickname
        }
      }
    }
  })

  Object.keys(commentsByNoteId).forEach((noteId) => {
    commentsByNoteId[noteId] = commentsByNoteId[noteId].map((item) => {
      const nextItem = { ...item }

      if (nextItem.user.id === userId) {
        nextItem.user = { ...nextItem.user, avatar: user.avatar, nickname: user.nickname }
      }

      nextItem.replies = (nextItem.replies || []).map((reply) => {
        if (reply.user.id !== userId) return reply
        return {
          ...reply,
          user: { ...reply.user, avatar: user.avatar, nickname: user.nickname }
        }
      })

      return nextItem
    })
  })
}

export function getPayload(parameter = {}) {
  return parameter.params || parameter.data || parameter
}

export function createDataResponse(data) {
  return Promise.resolve({
    code: 0,
    message: 'success',
    data: clone(data)
  })
}

export function createListResponse(list, parameter = {}) {
  const { pageNo, pageSize } = getPaging(parameter)
  const start = (pageNo - 1) * pageSize
  const end = start + pageSize

  return Promise.resolve({
    code: 0,
    message: 'success',
    data: {
      list: clone(list.slice(start, end)),
      pageNo,
      pageSize,
      hasMore: end < list.length
    }
  })
}

export function getCurrentUserProfile() {
  const session = mpx.getStorageSync(SESSION_STORAGE_KEY) || {}
  const sessionUserId = session.userInfo && session.userInfo.id
  const targetUserId = sessionUserId || CURRENT_USER_ID
  return clone(users.find((item) => item.id === targetUserId))
}

export function resolveLoginUser(username = '') {
  const normalized = String(username || '').trim()

  if (!normalized) {
    return getCurrentUserProfile()
  }

  const existingUser = users.find((item) => {
    return [item.id, item.nickname, item.name].filter(Boolean).includes(normalized)
  })

  if (existingUser) {
    return clone(existingUser)
  }

  const nextUser = {
    id: `user_${Date.now()}`,
    avatar: '/src/static/images/mock/avatar-1.jpg',
    nickname: normalized,
    name: normalized,
    bio: '刚加入社区，准备记录新的生活灵感。',
    gender: 'unknown',
    location: '未设置',
    isFollowed: false,
    followCount: 0,
    fansCount: 0,
    likedReceivedCount: 0
  }

  users.unshift(nextUser)
  return clone(nextUser)
}

export function getHotKeywordsMock() {
  return hotKeywords
}

export function getRecommendNotesMock() {
  return noteCards
}

export function getFollowingNotesMock() {
  return noteCards.filter((item) => {
    const user = users.find((entry) => entry.id === item.author.id)
    return user && user.isFollowed
  })
}

export function getDiscoverNotesMock() {
  return ['note_1004', 'note_1006', 'note_1003', 'note_1001']
    .map((id) => noteCards.find((item) => item.id === id))
    .filter(Boolean)
}

export function searchNoteCardsMock(keyword = '') {
  const normalized = String(keyword || '').trim().toLowerCase()
  if (!normalized) return noteCards

  return noteCards.filter((item) => {
    const detail = noteDetails[item.id] || {}
    return [item.title, detail.content]
      .filter(Boolean)
      .some((entry) => entry.toLowerCase().includes(normalized))
  })
}

export function searchUsersMock(keyword = '') {
  const normalized = String(keyword || '').trim().toLowerCase()
  if (!normalized) return users

  return users.filter((item) => {
    return [item.nickname, item.bio]
      .filter(Boolean)
      .some((entry) => entry.toLowerCase().includes(normalized))
  })
}

export function searchTopicsMock(keyword = '') {
  const normalized = String(keyword || '').trim().toLowerCase()
  if (!normalized) return topics

  return topics.filter((item) => {
    return [item.name, item.desc]
      .filter(Boolean)
      .some((entry) => entry.toLowerCase().includes(normalized))
  })
}

export function getNoteDetailMock(noteId) {
  return noteDetails[noteId] ? clone(noteDetails[noteId]) : null
}

export function getMyNotesMock() {
  return noteCards.filter((item) => item.author.id === CURRENT_USER_ID)
}

export function getUserNotesMock(userId) {
  return noteCards.filter((item) => item.author.id === userId)
}

export function getDraftListMock() {
  return drafts.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
}

export function getDraftDetailMock(draftId) {
  return drafts.find((item) => item.draftId === draftId) || null
}

export function saveDraftMock(payload = {}) {
  const now = new Date().toISOString().slice(0, 19).replace('T', ' ')

  if (payload.draftId) {
    drafts = drafts.map((item) => {
      if (item.draftId !== payload.draftId) return item
      return {
        ...item,
        ...clone(payload),
        updatedAt: now
      }
    })

    return { draftId: payload.draftId, updatedAt: now }
  }

  const draftId = `draft_${Date.now()}`
  drafts.unshift({
    draftId,
    title: payload.title || '',
    content: payload.content || '',
    images: clone(payload.images || []),
    topics: clone(payload.topics || []),
    categoryId: payload.categoryId || '',
    locationText: payload.locationText || '',
    updatedAt: now
  })

  return { draftId, updatedAt: now }
}

export function deleteDraftMock(draftId) {
  drafts = drafts.filter((item) => item.draftId !== draftId)
  return true
}

export function createNoteMock(payload = {}) {
  const currentUser = getCurrentUserProfile()
  const id = `note_${Date.now()}`
  const publishTime = new Date().toISOString().slice(0, 19).replace('T', ' ')
  const images = clone(payload.images || [])
  const author = {
    id: currentUser.id,
    avatar: currentUser.avatar,
    nickname: currentUser.nickname
  }

  const card = {
    id,
    coverUrl: images[0] || '/src/static/images/mock/note-1.jpg',
    coverRatio: 0.75,
    title: payload.title || '未命名笔记',
    author,
    likeCount: 0,
    liked: false
  }

  noteCards.unshift(card)
  noteDetails[id] = {
    id,
    images,
    title: payload.title || '未命名笔记',
    content: payload.content || '',
    author,
    topics: clone(payload.topics || []),
    categoryId: payload.categoryId || '',
    locationText: payload.locationText || '',
    publishTime,
    liked: false,
    collected: false,
    likeCount: 0,
    collectCount: 0,
    commentCount: 0,
    shareCount: 0,
    status: 'published'
  }

  if (payload.draftId) {
    deleteDraftMock(payload.draftId)
  }

  return {
    id,
    status: 'published',
    publishTime
  }
}

export function updateNoteMock(payload = {}) {
  if (!payload.id || !noteDetails[payload.id]) {
    return createNoteMock(payload)
  }

  const detail = noteDetails[payload.id]
  noteDetails[payload.id] = {
    ...detail,
    title: payload.title || detail.title,
    content: payload.content || detail.content,
    images: clone(payload.images || detail.images),
    topics: clone(payload.topics || detail.topics),
    categoryId: payload.categoryId || detail.categoryId,
    locationText: payload.locationText || detail.locationText
  }

  noteCards = noteCards.map((item) => {
    if (item.id !== payload.id) return item
    return {
      ...item,
      title: noteDetails[payload.id].title,
      coverUrl: noteDetails[payload.id].images[0] || item.coverUrl
    }
  })

  return {
    id: payload.id,
    status: 'published',
    publishTime: noteDetails[payload.id].publishTime
  }
}

export function deleteNoteMock(noteId) {
  noteCards = noteCards.filter((item) => item.id !== noteId)
  delete noteDetails[noteId]
  delete commentsByNoteId[noteId]
  return true
}

export function getCommentListMock(noteId) {
  return commentsByNoteId[noteId] || []
}

export function createCommentMock(noteId, content) {
  const currentUser = getCurrentUserProfile()
  const comment = {
    id: `comment_${Date.now()}`,
    noteId,
    user: { id: currentUser.id, avatar: currentUser.avatar, nickname: currentUser.nickname },
    content,
    parentId: '',
    replyUser: null,
    likeCount: 0,
    liked: false,
    createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
    canDelete: true,
    replies: []
  }

  commentsByNoteId[noteId] = commentsByNoteId[noteId] || []
  commentsByNoteId[noteId].unshift(comment)

  return comment
}

export function replyCommentMock(noteId, parentId, content) {
  const currentUser = getCurrentUserProfile()
  const commentList = commentsByNoteId[noteId] || []
  let created = null

  commentsByNoteId[noteId] = commentList.map((item) => {
    if (item.id !== parentId) return item

    created = {
      id: `comment_${Date.now()}`,
      noteId,
      user: { id: currentUser.id, avatar: currentUser.avatar, nickname: currentUser.nickname },
      content,
      parentId,
      replyUser: { id: item.user.id, nickname: item.user.nickname },
      likeCount: 0,
      liked: false,
      createdAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
      canDelete: true
    }

    return {
      ...item,
      replies: [...(item.replies || []), created]
    }
  })

  return created
}

export function deleteCommentMock(commentId) {
  Object.keys(commentsByNoteId).forEach((noteId) => {
    let removed = false
    commentsByNoteId[noteId] = (commentsByNoteId[noteId] || [])
      .filter((item) => {
        if (item.id === commentId) {
          removed = true
          return false
        }
        return true
      })
      .map((item) => {
        const nextReplies = (item.replies || []).filter((reply) => {
          const match = reply.id === commentId
          removed = removed || match
          return !match
        })
        return { ...item, replies: nextReplies }
    })
  })

  return true
}

export function toggleNoteLikeMock(noteId) {
  const detail = noteDetails[noteId]
  if (!detail) return null

  detail.liked = !detail.liked
  detail.likeCount += detail.liked ? 1 : -1

  noteCards = noteCards.map((item) => {
    if (item.id !== noteId) return item
    return {
      ...item,
      liked: detail.liked,
      likeCount: detail.likeCount
    }
  })

  return {
    id: noteId,
    liked: detail.liked,
    likeCount: detail.likeCount
  }
}

export function toggleNoteCollectMock(noteId) {
  const detail = noteDetails[noteId]
  if (!detail) return null

  detail.collected = !detail.collected
  detail.collectCount += detail.collected ? 1 : -1

  return {
    id: noteId,
    collected: detail.collected,
    collectCount: detail.collectCount
  }
}

export function toggleUserFollowMock(userId) {
  users = users.map((item) => {
    if (item.id !== userId) return item
    return {
      ...item,
      isFollowed: !item.isFollowed,
      followCount: item.followCount + (item.isFollowed ? -1 : 1)
    }
  })

  const user = users.find((item) => item.id === userId)
  return user ? { id: user.id, isFollowed: user.isFollowed, followCount: user.followCount } : null
}

export function getMessagesMock(type = 'all') {
  if (!type || type === 'all') return messages
  return messages.filter((item) => item.type === type)
}

export function getUserProfileMock(userId) {
  return users.find((item) => item.id === userId) || null
}

export function markMessagesReadMock(ids = []) {
  messages = messages.map((item) => {
    if (!ids.includes(item.id)) return item
    return { ...item, isRead: true }
  })
  return true
}

export function getUnreadCountMock() {
  return messages.filter((item) => !item.isRead).length
}

export function getTopicDetailMock(topicId) {
  return topics.find((item) => item.id === topicId) || null
}

export function getTopicNotesMock(topicId) {
  return noteCards.filter((item) => {
    const detail = noteDetails[item.id]
    return detail && (detail.topics || []).some((topic) => topic.id === topicId)
  })
}

export function updateCurrentUserMock(payload = {}) {
  users = users.map((item) => {
    if (item.id !== CURRENT_USER_ID) return item
    return {
      ...item,
      ...payload,
      name: payload.nickname || item.nickname
    }
  })
  syncEmbeddedUser(CURRENT_USER_ID)
  return getCurrentUserProfile()
}

export function createUploadImageMock() {
  return {
    url: `/src/static/images/mock/upload-result-${Date.now()}.jpg`,
    width: 1080,
    height: 1440
  }
}
