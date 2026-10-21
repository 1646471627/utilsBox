import { ElMessage, ElMessageBox } from 'element-plus'

/**
 * 成功弹窗
 * @param {string} title - 提示内容
 * @example
 * sAlert('操作成功')
 */
export const sAlert = (title: string) => {
  ElMessage.success(title)
}

/**
 * 警告弹窗
 * @param {string} title - 提示内容
 */
const wAlert = (title: string) => {
  ElMessage.warning(title)
}

/**
 * 错误弹窗
 * @param {string} title - 提示内容
 */
const eAlert = (title: string) => {
  ElMessage.error(title)
}

/** 确认框类型 */
type ConfirmType = 'success' | 'warning' | 'info' | 'error'
/** 输入框校验函数类型：返回 true 通过，返回字符串作为错误提示 */
type InputValidator = (value: string) => boolean | string

/** elconfirm 可选配置 */
interface ConfirmOptions {
  /** 确定按钮文本，默认“确定” */
  confirmButtonText?: string
  /** 取消按钮文本，默认“取消” */
  cancelButtonText?: string
  /** 消息类型 */
  type?: ConfirmType
  /** 是否区分“取消”和“关闭”，为 true 时关闭的 reject 值为 'close' */
  distinguishCancelAndClose?: boolean
  /** 是否允许点击遮罩关闭，默认 true */
  closeOnClickModal?: boolean
  /** 是否允许按 ESC 关闭，默认 true */
  closeOnPressEscape?: boolean
}
/** elprompt 可选配置 */
interface PromptOptions {
  /** 输入框占位文本 */
  placeholder?: string
  /** 输入框默认值 */
  defaultValue?: string
  /** 确定按钮文本，默认“确定” */
  confirmButtonText?: string
  /** 取消按钮文本，默认“取消” */
  cancelButtonText?: string
  /** 消息类型 */
  type?: 'success' | 'warning' | 'info' | 'error'
  /** 输入校验函数，返回 false 或字符串时阻止提交并提示 */
  validator?: InputValidator
  /** 是否允许点击遮罩关闭，默认 true */
  closeOnClickModal?: boolean
  /** 是否允许按 ESC 关闭，默认 true */
  closeOnPressEscape?: boolean
}


/**
 * 确认弹窗
 * @param {string} message - 提示内容
 * @param {string} [title='提示'] - 标题
 * @param {ConfirmOptions} [options={}] - 可选配置
 * @returns {Promise<boolean>} 点击确定为 true；取消或关闭为 false
 * @example
 * // 基础用法
 * const ok = await elconfirm('确定删除吗？')
 * if (ok) { ... }
 *
 * @example
 * // 自定义按钮与类型
 * const ok = await elconfirm('此操作不可撤销', '警告', {
 *   type: 'warning',
 *   confirmButtonText: '删除',
 *   cancelButtonText: '再想想',
 * })
 */
async function elconfirm(
  message: string,
  title: string = '提示',
  options: ConfirmOptions = {}
): Promise<boolean> {
  try {
    await ElMessageBox.confirm(message, title, {
      type: options.type ?? 'warning',
      confirmButtonText: options.confirmButtonText ?? '确定',
      cancelButtonText: options.cancelButtonText ?? '取消',
      distinguishCancelAndClose: options.distinguishCancelAndClose,
      closeOnClickModal: options.closeOnClickModal,
      closeOnPressEscape: options.closeOnPressEscape,
    })
    return true
  } catch {
    // 取消或关闭都视为 false，避免调用方产生 unhandled rejection
    return false
  }
}
/**
 * 输入框弹窗
 * @param {string} message - 提示内容
 * @param {string} [title='提示'] - 标题
 * @param {PromptOptions} [options={}] - 可选配置
 * @returns {Promise<string | null>} 点击确定返回输入值；取消或关闭返回 null
 * @example
 * // 基础用法
 * const name = await elprompt('请输入项目名称')
 * if (name !== null) {
 *   console.log('用户输入：', name)
 * }
 *
 * @example
 * // 带校验：非空且长度不超过 20
 * const name = await elprompt('请输入项目名称', '新建项目', {
 *   placeholder: '1-20 个字符',
 *   validator: (val) => {
 *     if (!val.trim()) return '名称不能为空'
 *     if (val.length > 20) return '名称不能超过 20 个字符'
 *     return true
 *   },
 * })
 */
async function elprompt(
  message: string,
  title: string = '提示',
  options: PromptOptions = {}
): Promise<string | null> {
  try {
    const { value } = await ElMessageBox.prompt(message, title, {
      type: options.type ?? 'info',
      confirmButtonText: options.confirmButtonText ?? '确定',
      cancelButtonText: options.cancelButtonText ?? '取消',
      inputPlaceholder: options.placeholder,
      inputValue: options.defaultValue,
      inputValidator: options.validator,
      closeOnClickModal: options.closeOnClickModal,
      closeOnPressEscape: options.closeOnPressEscape,
    })
    return value
  } catch {
    // 取消或关闭都返回 null
    return null
  }
}

export default { sAlert:ElMessage.success, wAlert:ElMessage.warning, eAlert:ElMessage.error, elconfirm,elprompt }
