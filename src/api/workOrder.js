import { get, post, postForm } from '@/api/request'

// 工单数量
export const getWorkOrderCount = (params) =>  { 
  return get(`/cbs-worker/work-order/my-work-order`, params)
}

// 待预约列表
export const getWaitAppointmentList = (params) =>  { 
  return get(`/cbs-core-web/work-order-appointment/backlog/page`, params)
}

// 待上门列表
export const getWaitVisitList = (params) =>  { 
  return get(`/cbs-core-web/work-order-clock-in/page`, params)
}

// 服务中列表
export const getServiceList = (params) =>  { 
  return get(`/cbs-core-web/work-order-service/page`, params)
}

// 待支付列表
export const getWaitPayList = (params) =>  { 
  return get(`/cbs-core-web/work-order/customer/online-pay/page`, params)
}

// 未交款列表
export const getNotPayList = (params) =>  { 
  return get(`/cbs-core-web/work-order-service/public-tran/bad-crop/page`, params)
}

// 驳回待处理列表
export const getRejectList = (params) =>  { 
  return get(`/cbs-core-web/work-order-reject/page`, params)
}

// 完工待确认列表
export const getWaitConfirmList = (params) =>  { 
  return get(`/cbs-core-web/work-order/customer/to-be-confirmed/page`, params)
}

// 挂起单-挂起中列表
export const getSuspendList = (params) =>  { 
  return get(`/cbs-core-web/work-order-suspend/page`, params)
}

// 挂起单-挂起待审核列表
export const getSuspendAuditList = (params) =>  { 
  return get(`/cbs-core-web/work-order-suspend/backlog/page`, params)
}

// 挂起单-挂起待恢复列表
export const getSuspendRecoverList = (params) =>  { 
  return get(`/cbs-core-web/work-order-suspend/page`, params)
}

// 催单列表
export const getRemindList = (params) =>  { 
  return get(`/cbs-core-web/work-order/reminder/page`, params)
}

// 将超期列表
export const getWillOverdueList = (params) =>  { 
  return get(`/cbs-core-web/work-order/about-to-expire/page`, params)
}

// 已超期列表
export const getOverdueList = (params) =>  { 
  return get(`/cbs-core-web/work-order/overdue/page`, params)
}

// 补录TDS列表
export const getTdsList = (params) =>  { 
  return get(`/cbs-core-web/work-order-service/tds-not-replenished/page`, params)
}