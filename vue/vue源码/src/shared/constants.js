/**
 * 用来标注服务端渲染的
 */
export const SSR_ATTR = 'data-server-rendered'
/**
 * 每个vue组件都会挂在的成员  深入时要了解
 */
export const ASSET_TYPES = [
  'component',
  'directive',
  'filter'
]
/**
 * 生命周期函数 hook
 */
export const LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch'
]
