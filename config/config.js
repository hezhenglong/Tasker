
export const apiBaseUrl = 'https://tasker.jiehai.tech/api/'
// #ifdef H5
export const baseUrl = apiBaseUrl
// export const baseUrl=process.env.NODE_ENV === 'development'?window.location.origin+'/':apiBaseUrl
// #endif
export const paymentType = {
  //支付单类型
  order: 1, //订单
  recharge: 2, //充值
  form_order: 5, //表单付款码
  form_pay: 6 //表单订单
}