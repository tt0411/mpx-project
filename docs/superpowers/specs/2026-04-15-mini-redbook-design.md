# Mini Redbook Design

**Goal:** Build a WeChat Mini Program MVP inspired by Xiaohongshu on top of the existing MPX template, with a complete browse, search, publish, interact, and profile loop.

## Scope

- Platform: WeChat Mini Program only
- Content type: image-first notes
- Release target: demo-quality MVP
- Top-level tabs: `home`, `discover`, `publish`, `message`, `profile`
- Explicitly out of scope: private chat, video publishing, live streaming, e-commerce, Alipay-specific polish

## Information Architecture

### Main Tabs

- `首页`: recommended feed, following feed, entry point for content consumption
- `发现`: search, hot keywords, categories, hot topics, trending content
- `发布`: creation hub for publishing, drafts, and my notes
- `消息`: likes, comments, follows, and system notifications
- `我的`: profile summary, stats, my notes, drafts, settings

### Feature Pages

- `note-detail`: note detail, comment preview, engagement actions
- `publish-editor`: image note editor
- `draft-list`: draft management
- `my-notes`: published note management
- `search-result`: note, user, and topic search results
- `user-profile`: author profile and author notes
- `topic-detail`: topic header and topic note list
- `comment-list`: full comment and reply page

### Common Pages

- `login`
- `edit-profile`
- `settings`
- `web-view`

## UX Direction

- Visual tone: content-first, light social, clean, restrained
- Primary color: `#FF2442`
- Accent color: `#FF6B4A`
- Page background: `#F7F8FA`
- Card background: `#FFFFFF`
- Major radius: `24rpx`
- Navigation pattern: fixed bottom tab bar with a raised center publish button

## Routing And Packaging

### Main Package

- `/pages/tabs/home/index`
- `/pages/tabs/discover/index`
- `/pages/tabs/publish/index`
- `/pages/tabs/message/index`
- `/pages/tabs/profile/index`

### `pagesFeature`

- `/pagesFeature/note-detail/index`
- `/pagesFeature/publish-editor/index`
- `/pagesFeature/draft-list/index`
- `/pagesFeature/my-notes/index`
- `/pagesFeature/search-result/index`
- `/pagesFeature/user-profile/index`
- `/pagesFeature/topic-detail/index`
- `/pagesFeature/comment-list/index`

### `pagesCommon`

- `/pagesCommon/login/index`
- `/pagesCommon/edit-profile/index`
- `/pagesCommon/settings/index`
- `/pagesCommon/web-view/index`

## Data Model

### User

- `id`
- `avatar`
- `nickname`
- `bio`
- `gender`
- `location`
- `isFollowed`
- `followCount`
- `fansCount`
- `likedReceivedCount`

### NoteCard

- `id`
- `coverUrl`
- `coverRatio`
- `title`
- `author`
- `likeCount`
- `liked`

### NoteDetail

- `id`
- `images`
- `title`
- `content`
- `author`
- `topics`
- `categoryId`
- `locationText`
- `publishTime`
- `liked`
- `collected`
- `likeCount`
- `collectCount`
- `commentCount`
- `shareCount`
- `status`

### Draft

- `draftId`
- `title`
- `content`
- `images`
- `topics`
- `categoryId`
- `locationText`
- `updatedAt`

### Comment

- `id`
- `noteId`
- `user`
- `content`
- `parentId`
- `replyUser`
- `likeCount`
- `liked`
- `createdAt`
- `canDelete`

### Message

- `id`
- `type`
- `actorUser`
- `targetType`
- `targetId`
- `targetTitle`
- `targetCover`
- `summary`
- `isRead`
- `createdAt`

### Topic

- `id`
- `name`
- `desc`
- `coverUrl`
- `noteCount`

## API Contracts

### Return Shapes

- list: `{ code, message, data: { list, pageNo, pageSize, hasMore } }`
- detail: `{ code, message, data }`
- toggle action: `{ code, message, data: { ...latestState } }`
- upload: `{ code, message, data: { url, width, height } }`

### Modules

- `auth.js`: `login`, `logout`, `getCurrentUser`, `updateProfile`
- `feed.js`: `getRecommendFeed`, `getFollowingFeed`, `getDiscoverFeed`
- `search.js`: `getHotSearchList`, `searchNotes`, `searchUsers`, `searchTopics`
- `note.js`: `getNoteDetail`, `createNote`, `updateNote`, `deleteNote`, `getMyNotes`, `getUserNotes`
- `draft.js`: `getDraftList`, `getDraftDetail`, `saveDraft`, `deleteDraft`
- `comment.js`: `getCommentList`, `createComment`, `replyComment`, `deleteComment`
- `interaction.js`: `toggleNoteLike`, `toggleNoteCollect`, `toggleUserFollow`
- `message.js`: `getMessageList`, `markMessageRead`, `getUnreadCount`
- `topic.js`: `getTopicDetail`, `getTopicNotes`
- `upload.js`: `uploadImage`

## Store Boundaries

- `authStore`: session and minimum user identity
- `commonStore`: tab bar state and message badge
- `feedStore`: recommended, following, and discover feed lists
- `noteStore`: note detail, interaction actions, cross-page note patching
- `publishStore`: editor form, draft lifecycle, publish lifecycle
- `messageStore`: message categories, unread count, pagination
- `profileStore`: profile summary, my notes, draft summary, visited profile data
- `searchStore`: hot keywords, search history, note/user/topic search results

## Cross-Page State Rules

- All note engagement sync is keyed by `note.id`
- `noteStore` is the single entry point for like, collect, and comment count patching
- Publish success refreshes `profileStore.myNotes` and `profileStore.draftSummary`
- Message unread count is synced from `messageStore` to `commonStore`
- Drafts and published notes must stay separate
- Comments are limited to two levels in the MVP

## Implementation Phases

1. Five-tab app skeleton
2. Business API and store baseline
3. Home, discover, and search result pages
4. Publish hub, editor, drafts, and my notes
5. Note detail, comments, like, and collect
6. Message, profile, user profile, edit profile, and settings
7. Topic detail, search closure, and demo cleanup

## Risks

- Raised center tab bar button needs custom layout and safe-area handling
- Existing template demo code must be removed late, not early
- `mpx-uploader` is reusable but broader than MVP needs
- Note interaction state can drift without centralized patching
- Message unread count can drift without a single sync path

## Verification Baseline

- Every phase must pass `npm run build:test:wx` in the worktree
- Every phase must keep a working WeChat Mini Program navigation path without dead links
