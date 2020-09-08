import request from '@/utils/request'

export function getInvoiceList(params) {
  return request({
    url: '/api/invoiceDocument/page',
    method: 'get',
    params
  })
}

export function getInvoiceDocument(id) {
  return request({
    url: '/api/invoiceDocument/' + id,
    method: 'get'
  })
}

export function getInvoiceListColumnConfig() {
  return request({
    url: '/api/invoiceDocument/invoiceConfig',
    method: 'get'
  })
}

export function updateInvoiceListColumnConfig(data) {
  return request({
    url: '/api/invoiceDocument/invoiceConfig',
    method: 'post',
    data
  })
}
