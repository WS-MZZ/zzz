import request from '@/utils/request'

export function getInvoiceList(params) {
  return request({
    url: '/api/invoiceDocument/page',
    method: 'get',
    params
  })
}

