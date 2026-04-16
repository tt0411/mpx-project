# Mini Redbook Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement a WeChat Mini Program MVP of a Xiaohongshu-style community product on top of the current MPX template.

**Architecture:** Keep the existing MPX main-package plus subpackage structure and replace template demo flows with business-specific feeds, publishing, detail, messaging, and profile flows. Use `api/modules/*` plus Pinia stores as the stable data layer, and keep note interaction synchronization centralized in `noteStore`.

**Tech Stack:** MPX, Vue 2.7, `@mpxjs/pinia`, `@mpxjs/fetch`, `mpx-cube-ui`, Sass

---

## File Map

### Modify

- `src/app.config.js`: five-tab app config and package registration
- `src/custom-tab-bar/index.mpx`: raised publish button and message badge layout
- `src/store/common.js`: five-tab state and badge state
- `src/store/index.js`: export new stores
- `src/api/index.js`: export new business API modules
- `src/utils/router.js`: freeze formal route names
- `src/utils/nav.js`: tab route whitelist and named navigation
- `src/pages/tabs/home/index.mpx`: home feed page
- `src/pages/tabs/discover/index.mpx`: discover page
- `src/pages/tabs/message/index.mpx`: notification page
- `src/pages/tabs/profile/index.mpx`: profile summary page
- `src/pagesFeature/app.mpx`: register feature package pages
- `src/pagesCommon/app.mpx`: register common package pages

### Create

- `src/pages/tabs/publish/index.mpx`
- `src/components/note-card/index.mpx`
- `src/store/feed.js`
- `src/store/note.js`
- `src/store/publish.js`
- `src/store/message.js`
- `src/store/profile.js`
- `src/store/search.js`
- `src/api/modules/feed.js`
- `src/api/modules/search.js`
- `src/api/modules/note.js`
- `src/api/modules/draft.js`
- `src/api/modules/comment.js`
- `src/api/modules/interaction.js`
- `src/api/modules/message.js`
- `src/api/modules/topic.js`
- `src/api/modules/upload.js`
- `src/pagesFeature/note-detail/index.mpx`
- `src/pagesFeature/publish-editor/index.mpx`
- `src/pagesFeature/draft-list/index.mpx`
- `src/pagesFeature/my-notes/index.mpx`
- `src/pagesFeature/search-result/index.mpx`
- `src/pagesFeature/user-profile/index.mpx`
- `src/pagesFeature/topic-detail/index.mpx`
- `src/pagesFeature/comment-list/index.mpx`
- `src/pagesCommon/edit-profile/index.mpx`
- `src/pagesCommon/settings/index.mpx`

### Remove Late

- `src/api/modules/demo.js`
- `src/store/demo.js`
- `src/pagesFeature/demo-detail/index.mpx`
- `src/pagesCommon/list-demo/index.mpx`
- `src/pagesCommon/demo-navbar/index.mpx`

## Phase 0: Five-Tab Skeleton

- [ ] Update `src/app.config.js` to use `home`, `discover`, `publish`, `message`, `profile`
- [ ] Create `src/pages/tabs/publish/index.mpx` as a publish hub skeleton with four static entry cards
- [ ] Update `src/store/common.js` so `tabBarList` has five items and the publish item is flagged with `isCenter: true`
- [ ] Update `src/utils/router.js` with the named `publish` route
- [ ] Update `src/utils/nav.js` so `publish` is treated as a tab page
- [ ] Update `src/custom-tab-bar/index.mpx` to render a `2 + 1 + 2` layout with a raised center publish button
- [ ] Run `npm run build:test:wx`

## Phase 1: Business Data Baseline

- [ ] Create business API modules under `src/api/modules/*` using the frozen contracts
- [ ] Create `feed`, `note`, `publish`, `message`, `profile`, and `search` stores under `src/store/*`
- [ ] Update `src/api/index.js` to export the new API modules while keeping `auth` and `demo` until migration is done
- [ ] Update `src/store/index.js` to export the new stores while keeping `demo` until migration is done
- [ ] Keep all mock payloads aligned with the documented entity shapes
- [ ] Run `npm run build:test:wx`

## Phase 2: Consumption Entry Pages

- [ ] Create `src/components/note-card/index.mpx`
- [ ] Replace the current home demo page with a recommend/follow feed page in `src/pages/tabs/home/index.mpx`
- [ ] Replace the current discover demo page with a search, hot keyword, category, and topic page in `src/pages/tabs/discover/index.mpx`
- [ ] Create `src/pagesFeature/search-result/index.mpx`
- [ ] Register `search-result` in `src/pagesFeature/app.mpx` and `src/utils/router.js`
- [ ] Wire home and discover to `feedStore` and `searchStore`
- [ ] Keep card taps as placeholder feedback until detail is implemented
- [ ] Run `npm run build:test:wx`

## Phase 3: Publish Flow

- [ ] Turn `src/pages/tabs/publish/index.mpx` into a real creation hub
- [ ] Create `src/pagesFeature/publish-editor/index.mpx`
- [ ] Create `src/pagesFeature/draft-list/index.mpx`
- [ ] Create `src/pagesFeature/my-notes/index.mpx`
- [ ] Register these routes in `src/pagesFeature/app.mpx` and `src/utils/router.js`
- [ ] Wire the editor to `publishStore`, `draft.js`, `note.js`, and `upload.js`
- [ ] Refresh `profileStore.myNotes` after successful publish
- [ ] Run `npm run build:test:wx`

## Phase 4: Detail And Engagement

- [ ] Create `src/pagesFeature/note-detail/index.mpx`
- [ ] Create `src/pagesFeature/comment-list/index.mpx`
- [ ] Register both routes
- [ ] Extend `noteStore` with detail fetch, preview fetch, and centralized note patching
- [ ] Add note, comment, and interaction API calls needed by detail and comments
- [ ] Update home, discover, search-result, and my-notes to navigate into `note-detail`
- [ ] Run `npm run build:test:wx`

## Phase 5: Message And Profile Systems

- [ ] Implement notifications in `src/pages/tabs/message/index.mpx`
- [ ] Implement profile summary in `src/pages/tabs/profile/index.mpx`
- [ ] Create `src/pagesFeature/user-profile/index.mpx`
- [ ] Create `src/pagesCommon/edit-profile/index.mpx`
- [ ] Create `src/pagesCommon/settings/index.mpx`
- [ ] Add message unread syncing from `messageStore` to `commonStore`
- [ ] Add author-profile navigation from list cards and note detail
- [ ] Run `npm run build:test:wx`

## Phase 6: Topic Closure And Cleanup

- [ ] Create `src/pagesFeature/topic-detail/index.mpx`
- [ ] Complete search result navigation for notes, users, and topics
- [ ] Add topic navigation from discover and note detail
- [ ] Remove template demo pages, demo API, demo store, and demo routes after all real pages are live
- [ ] Run `npm run build:test:wx`

## Verification

- Build command: `npm run build:test:wx`
- Dev command: `npm run serve:test`
- Smoke path 1: home feed -> search result -> note detail -> comments
- Smoke path 2: publish hub -> editor -> draft save -> my notes
- Smoke path 3: message tab -> target detail or comment page
- Smoke path 4: profile tab -> edit profile -> settings -> logout
