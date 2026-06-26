/* global API_DEFS, API_SCHEMA_DEFS */

// State
const collapsedGroups = new Set()
const API_TESTER_PARAMS_STORAGE_KEY = 'apiTesterSavedParamsRoutineInspection'
const API_TESTER_LOGIN_TOKEN_STORAGE_KEY = 'apiTesterLoginToken'
const API_TESTER_BASE_URL_STORAGE_KEY = 'apiTesterBaseUrl'
const API_TESTER_ENV = window.API_TESTER_ENV || {}
const DEFAULT_DEV_BASE_URL = API_TESTER_ENV.devBaseUrl || window.API_TESTER_BASE_URL || 'http://192.168.22.16:8080'
const DEFAULT_PROD_BASE_URL = API_TESTER_ENV.prodBaseUrl || 'https://fjgs.ppps.cn/admin-api'
const savedApiParams = loadSavedApiParams()
let currentApi = null
let useMock = false
let baseUrl = loadSavedBaseUrl() || DEFAULT_DEV_BASE_URL
let currentBodyType = 'json'
let currentTab = 'params'

const ENV_URLS = {
    dev: DEFAULT_DEV_BASE_URL,
    prod: DEFAULT_PROD_BASE_URL,
    custom: '',
}

// Init
function init() {
    API_DEFS.forEach(api => collapsedGroups.add(api.group))
    renderApiList(API_DEFS)
    initDefaultHeaders()
    document.getElementById('baseUrlInput').value = baseUrl
    bindLoginTokenModalEvents()
}

function initDefaultHeaders(headers = null) {
    const tbody = document.getElementById('headersBody')
    tbody.innerHTML = ''

    const headerRows =
        Array.isArray(headers) && headers.length
            ? headers
            : [
                  { key: 'Authorization', value: 'Bearer ', desc: '认证令牌' },
                  { key: 'tenant-id', value: '1', desc: '租户ID' },
              ]

    headerRows.forEach(header => {
        addParamRowData('headersBody', header.key || '', header.value || '', header.desc || '')
    })
}

// Sidebar
function toggleGroup(group) {
    if (collapsedGroups.has(group)) {
        collapsedGroups.delete(group)
    } else {
        collapsedGroups.add(group)
    }
    renderApiList(currentFilteredApis || API_DEFS)
}

let currentFilteredApis = null

function renderApiList(apis) {
    currentFilteredApis = apis
    const container = document.getElementById('apiList')
    const groups = {}
    apis.forEach(api => {
        if (!groups[api.group]) groups[api.group] = []
        groups[api.group].push(api)
    })
    container.innerHTML = Object.entries(groups)
        .map(([group, items]) => {
            const collapsed = collapsedGroups.has(group)
            const count = items.length
            return `
    <div class="api-group">
      <div class="api-group-title" onclick="toggleGroup('${group}')">
        <span class="group-arrow${collapsed ? ' collapsed' : ''}">▾</span>
        <span class="group-name">${group}</span>
        <span class="group-count">${count}</span>
      </div>
      <div class="api-group-items${collapsed ? ' hidden' : ''}">
        ${items
            .map(
                api => `
          <div class="api-item" id="item-${api.id}" onclick="selectApi('${api.id}')">
            <span class="method-badge method-${api.method}">${api.method}</span>
            <span class="api-name" title="${api.name}">${api.name}</span>
          </div>
        `
            )
            .join('')}
      </div>
    </div>
  `
        })
        .join('')
}

function filterApis(q) {
    const filtered = q
        ? API_DEFS.filter(a => {
              const keyword = q.toLowerCase()
              return (
                  (a.name || '').toLowerCase().includes(keyword) ||
                  (a.path || '').toLowerCase().includes(keyword) ||
                  (a.group || '').toLowerCase().includes(keyword) ||
                  ((a.method || '') + ' ' + (a.path || '')).toLowerCase().includes(keyword)
              )
          })
        : API_DEFS
    currentFilteredApis = filtered
    renderApiList(filtered)
    if (currentApi) {
        const el = document.getElementById('item-' + currentApi.id)
        if (el) el.classList.add('active')
    }
}

function selectApi(id) {
    const api = API_DEFS.find(a => a.id === id)
    if (!api) return
    currentApi = api
    document.querySelectorAll('.api-item').forEach(el => el.classList.remove('active'))
    const el = document.getElementById('item-' + id)
    if (el) el.classList.add('active')

    document.getElementById('requestTitle').textContent = api.name
    document.getElementById('methodSelect').value = api.method
    document.getElementById('urlInput').value = baseUrl + api.path

    const tbody = document.getElementById('paramsBody')
    tbody.innerHTML = ''
    getDisplayParams(api).forEach(p => addParamRowData('paramsBody', p.key, p.value, p.desc, p.required, p.in))
    updateParamsBadge()
    updateSaveParamsButtonState()
    initDefaultHeaders(api.headers)

    if (api.body && api.body !== 'multipart') {
        document.getElementById('bodyTextarea').value = api.body
    } else if (api.body === 'multipart') {
        document.getElementById('bodyTextarea').value = '// multipart/form-data — 文件上传'
    } else {
        document.getElementById('bodyTextarea').value = ''
    }

    renderBodySchema(api)
    renderResponseSchema(api)
    showDefaultResponse(api)
}

function showDefaultResponse(api) {
    if (!api || !api.mock) return
    const mock = api.mock
    const json = JSON.stringify(mock, null, 2)
    const badge = document.getElementById('statusBadge')
    badge.textContent = 'MOCK 200'
    badge.className = 'status-badge status-2xx'
    document.getElementById('responseTime').textContent = ''
    document.getElementById('responseSize').textContent = (json.length / 1024).toFixed(1) + ' KB'
    document.getElementById('responseBody').innerHTML = `<pre>${syntaxHighlight(json)}</pre>`
}

function renderBodySchema(api) {
    const tab = document.getElementById('requestSchemaTab')
    const content = document.getElementById('bodySchemaContent')
    if (!tab || !content) return

    const schemaRef = api?.bodySchemaRef
    const schemaDef = schemaRef ? API_SCHEMA_DEFS?.[schemaRef]?.schema : null
    if (!schemaDef) {
        tab.style.display = 'none'
        content.innerHTML = ''
        // Switch back to params tab if currently viewing request schema
        if (currentTab === 'requestSchema') {
            currentTab = 'params'
            document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'))
            const tabs = document.querySelector('.tabs')
            if (tabs) {
                const paramsTab = tabs.querySelector('.tab')
                if (paramsTab) paramsTab.classList.add('active')
            }
            document.getElementById('tab-params').style.display = 'block'
            document.getElementById('tab-requestSchema').style.display = 'none'
        }
        return
    }

    tab.style.display = ''
    content.innerHTML = renderSchemaBlock(schemaDef, schemaRef)
}

function renderResponseSchema(api) {
    const tab = document.getElementById('responseSchemaTab')
    const content = document.getElementById('responseSchemaContent')
    if (!tab || !content) return

    const schemaRef = api?.responseSchemaRef
    const schemaDef = schemaRef ? API_SCHEMA_DEFS?.[schemaRef]?.schema : null
    if (!schemaDef) {
        tab.style.display = 'none'
        content.innerHTML = ''
        // Switch back to params tab if currently viewing response schema
        if (currentTab === 'responseSchema') {
            currentTab = 'params'
            document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'))
            const tabs = document.querySelector('.tabs')
            if (tabs) {
                const paramsTab = tabs.querySelector('.tab')
                if (paramsTab) paramsTab.classList.add('active')
            }
            document.getElementById('tab-params').style.display = 'block'
            document.getElementById('tab-responseSchema').style.display = 'none'
        }
        return
    }

    tab.style.display = ''
    content.innerHTML = renderSchemaBlock(schemaDef, schemaRef)
}

function renderSchemaBlock(schema, title = '') {
    const rows = renderSchemaRows(schema)
    if (!rows.length) {
        return `<div class="schema-empty">暂无 Schema 信息</div>`
    }

    return `
    ${title ? `<div class="schema-block-title">${escHtml(title)}</div>` : ''}
    <table class="schema-table">
      <thead>
        <tr>
          <th style="width:20%">字段</th>
          <th style="width:15%">类型</th>
          <th style="width:10%">必填</th>
          <th style="width:30%">说明</th>
          <th style="width:25%">示例</th>
        </tr>
      </thead>
      <tbody>${rows.join('')}</tbody>
    </table>
  `
}

function renderSchemaRows(schema) {
    if (!schema || schema.type !== 'object' || !schema.properties) return []
    const requiredSet = new Set(schema.required || [])

    return Object.entries(schema.properties).map(([key, field]) => {
        const type = getSchemaTypeLabel(field)
        const required = requiredSet.has(key)
        const desc = field.description || ''
        const example = formatSchemaExample(field.example)
        const childHtml = renderNestedSchema(field)

        return `
      <tr>
        <td class="schema-key">${escHtml(key)}</td>
        <td class="schema-type">${escHtml(type)}</td>
        <td class="${required ? 'schema-required' : 'schema-optional'}">${required ? '必填' : '可选'}</td>
        <td>
          <div>${escHtml(desc)}</div>
          ${childHtml ? `<div class="schema-children">${childHtml}</div>` : ''}
        </td>
        <td class="schema-example">${escHtml(example)}</td>
      </tr>
    `
    })
}

function renderNestedSchema(field) {
    if (field?.type === 'array' && field.items) {
        if (field.items.$ref) {
            const refName = field.items.$ref.split('/').pop()
            const refSchema = API_SCHEMA_DEFS?.[refName]?.schema
            return refSchema ? renderSchemaBlock(refSchema, `数组项：${refName}`) : `<div class="schema-empty">数组项：${escHtml(refName)}</div>`
        }
        return `<div>数组项类型：<span class="schema-type">${escHtml(getSchemaTypeLabel(field.items))}</span></div>`
    }

    if (field?.$ref) {
        const refName = field.$ref.split('/').pop()
        const refSchema = API_SCHEMA_DEFS?.[refName]?.schema
        return refSchema ? renderSchemaBlock(refSchema, refName) : `<div class="schema-empty">引用：${escHtml(refName)}</div>`
    }

    return ''
}

function getSchemaTypeLabel(field) {
    if (!field) return ''
    if (field.$ref) return field.$ref.split('/').pop()
    if (field.type === 'array') {
        if (field.items?.$ref) return `array<${field.items.$ref.split('/').pop()}>`
        if (field.items?.type) return `array<${field.items.type}>`
        return 'array'
    }
    return field.type || ''
}

function formatSchemaExample(example) {
    if (example === undefined || example === null || example === '') return ''
    return typeof example === 'string' ? example : JSON.stringify(example, null, 2)
}

function getCurrentApiSchemaInfo() {
    const schemaRef = currentApi?.bodySchemaRef
    const schemaDef = schemaRef ? API_SCHEMA_DEFS?.[schemaRef]?.schema : null
    if (!schemaRef || !schemaDef) return null

    return {
        schemaRef,
        schema: schemaDef,
    }
}

function getCurrentResponseSchemaInfo() {
    const schemaRef = currentApi?.responseSchemaRef
    const schemaDef = schemaRef ? API_SCHEMA_DEFS?.[schemaRef]?.schema : null
    if (!schemaRef || !schemaDef) return null

    return {
        schemaRef,
        schema: schemaDef,
    }
}

function expandSchemaForCopy(schema) {
    return expandSchemaNodeForCopy(schema, new Set())
}

function expandSchemaNodeForCopy(node, visitedRefs) {
    if (Array.isArray(node)) {
        return node.map(item => expandSchemaNodeForCopy(item, visitedRefs))
    }

    if (!node || typeof node !== 'object') {
        return node
    }

    if (node.$ref) {
        const refName = node.$ref.split('/').pop()
        const nextVisitedRefs = new Set(visitedRefs)
        const result = {
            ...node,
            schemaRef: refName,
        }

        if (nextVisitedRefs.has(refName)) {
            return result
        }

        const refSchema = API_SCHEMA_DEFS?.[refName]?.schema
        if (!refSchema) {
            return result
        }

        nextVisitedRefs.add(refName)
        result.schema = expandSchemaNodeForCopy(refSchema, nextVisitedRefs)
        return result
    }

    const expanded = {}
    Object.entries(node).forEach(([key, value]) => {
        expanded[key] = expandSchemaNodeForCopy(value, visitedRefs)
    })
    return expanded
}

function getDisplayParams(api) {
    const savedParams = savedApiParams[api.id]
    if (!Array.isArray(savedParams) || !savedParams.length) {
        return api.params || []
    }

    return savedParams.map(param => ({
        key: param.key || '',
        value: param.value || '',
        desc: param.desc || '',
        required: !!param.required,
        in: param.in || 'query',
    }))
}

function getParamRowsData() {
    return Array.from(document.querySelectorAll('#paramsBody tr')).map(r => ({
        enabled: !!r.querySelector('.param-check')?.checked,
        key: r.querySelector('.param-key')?.value.trim() || '',
        value: r.querySelector('.param-value')?.value || r.dataset.fileName || '',
        desc: r.querySelector('.param-desc')?.value || '',
        required: r.querySelector('td.param-required')?.textContent === '必填',
        in: r.dataset.paramIn || 'query',
    }))
}

function loadSavedApiParams() {
    try {
        const raw = localStorage.getItem(API_TESTER_PARAMS_STORAGE_KEY)
        if (!raw) return {}
        const parsed = JSON.parse(raw)
        return parsed && typeof parsed === 'object' ? parsed : {}
    } catch (e) {
        return {}
    }
}

function loadSavedBaseUrl() {
    try {
        return localStorage.getItem(API_TESTER_BASE_URL_STORAGE_KEY) || ''
    } catch (e) {
        return ''
    }
}

function saveBaseUrl() {
    const input = document.getElementById('baseUrlInput')
    const btn = document.getElementById('saveBaseUrlBtn')
    if (!input || !btn) return

    const value = input.value.trim()
    baseUrl = value
    localStorage.setItem(API_TESTER_BASE_URL_STORAGE_KEY, value)
    document.getElementById('envSelect').value = 'custom'
    if (currentApi) {
        document.getElementById('urlInput').value = baseUrl + currentApi.path
    }

    const originalText = btn.textContent
    btn.textContent = '已保存 ✓'
    btn.style.color = '#a6e3a1'
    btn.style.borderColor = '#a6e3a1'
    setTimeout(() => {
        btn.textContent = originalText
        btn.style.color = '#cdd6f4'
        btn.style.borderColor = '#45475a'
    }, 1500)
}

function persistSavedApiParams() {
    localStorage.setItem(API_TESTER_PARAMS_STORAGE_KEY, JSON.stringify(savedApiParams))
}

function saveCurrentApiParams() {
    if (!currentApi) {
        alert('请先选择一个接口')
        return
    }

    const params = getParamRowsData()
    savedApiParams[currentApi.id] = params
    persistSavedApiParams()
    updateSaveParamsButtonState(true)
}

function updateSaveParamsButtonState(saved = false) {
    const btn = document.getElementById('saveParamsBtn')
    if (!btn) return

    btn.disabled = !currentApi
    if (!currentApi) {
        btn.textContent = '保存当前接口 Params'
        btn.style.color = '#6c7086'
        btn.style.borderColor = '#45475a'
        return
    }

    if (saved) {
        const orig = '保存当前接口 Params'
        btn.textContent = '已保存 ✓'
        btn.style.color = '#a6e3a1'
        btn.style.borderColor = '#a6e3a1'
        setTimeout(() => {
            btn.textContent = orig
            btn.style.color = '#6c7086'
            btn.style.borderColor = '#45475a'
        }, 1500)
        return
    }

    btn.textContent = '保存当前接口 Params'
    btn.style.color = savedApiParams[currentApi.id] ? '#cba6f7' : '#6c7086'
    btn.style.borderColor = savedApiParams[currentApi.id] ? '#cba6f7' : '#45475a'
}

function addParamRowData(tbodyId, key = '', value = '', desc = '', required = false, paramIn = 'query') {
    const tbody = document.getElementById(tbodyId)
    const tr = document.createElement('tr')
    tr.dataset.paramIn = paramIn
    const isMultipartFile = tbodyId === 'paramsBody' && currentApi?.body === 'multipart' && paramIn === 'formData' && key === 'file'
    const valueCell = isMultipartFile
        ? `<input type="file" class="param-file" style="width:100%;background:#313244;border:1px solid transparent;border-radius:4px;padding:5px 8px;color:#cdd6f4;font-size:12px" onchange="updateFileParamValue(this)">`
        : `<input type="text" class="param-value" value="${escHtml(value)}" placeholder="value">`

    tr.innerHTML = `
    <td><input type="checkbox" class="param-check" checked></td>
    <td><input type="text" class="param-key" value="${escHtml(key)}" placeholder="key" oninput="updateParamsBadge()"></td>
    <td>${valueCell}</td>
    <td><input type="text" class="param-desc" value="${escHtml(desc)}" placeholder="描述"></td>
    ${tbodyId === 'paramsBody' ? `<td class="${required ? 'param-required' : 'param-optional'}">${required ? '必填' : '可选'}</td>` : ''}
  `
    tbody.appendChild(tr)
}

function updateFileParamValue(input) {
    const row = input.closest('tr')
    if (!row) return
    row.dataset.fileName = input.files?.[0]?.name || ''
}

function addParamRow(tbodyId) {
    addParamRowData(tbodyId, '', '', '')
    updateParamsBadge()
}

function updateParamsBadge() {
    const rows = document.querySelectorAll('#paramsBody tr')
    const count = Array.from(rows).filter(r => {
        const cb = r.querySelector('.param-check')
        const key = r.querySelector('.param-key')
        return cb && cb.checked && key && key.value.trim()
    }).length
    document.getElementById('paramsBadge').textContent = count
}

function getEnabledParamRows() {
    return Array.from(document.querySelectorAll('#paramsBody tr')).reduce((list, r) => {
        const cb = r.querySelector('.param-check')
        const key = r.querySelector('.param-key')
        const val = r.querySelector('.param-value')
        const file = r.querySelector('.param-file')
        if (!cb || !cb.checked || !key || !key.value.trim()) {
            return list
        }

        list.push({
            key: key.value.trim(),
            value: file ? file.files?.[0] || null : val ? val.value : '',
            in: r.dataset.paramIn || 'query',
        })
        return list
    }, [])
}

function getParams() {
    return getEnabledParamRows().reduce((params, item) => {
        params[item.key] = item.value
        return params
    }, {})
}

function buildMultipartBody() {
    const formData = new FormData()
    getEnabledParamRows()
        .filter(item => item.in === 'formData')
        .forEach(({ key, value }) => {
            if (value instanceof File) {
                formData.append(key, value)
                return
            }
            if (value !== null && value !== undefined) {
                formData.append(key, value)
            }
        })
    return formData
}

function getHeaders() {
    const rows = document.querySelectorAll('#headersBody tr')
    const headers = {}
    rows.forEach(r => {
        const cb = r.querySelector('.param-check')
        const key = r.querySelector('.param-key')
        const val = r.querySelector('.param-value')
        if (cb && cb.checked && key && key.value.trim()) {
            headers[key.value.trim()] = val ? val.value : ''
        }
    })
    return headers
}

function findHeaderRow(headerKey) {
    return Array.from(document.querySelectorAll('#headersBody tr')).find(r => {
        const keyInput = r.querySelector('.param-key')
        return keyInput && keyInput.value.trim().toLowerCase() === headerKey.toLowerCase()
    })
}

function upsertHeaderRow(headerKey, headerValue, desc = '') {
    const existingRow = findHeaderRow(headerKey)
    if (!existingRow) {
        addParamRowData('headersBody', headerKey, headerValue, desc)
        return
    }

    const check = existingRow.querySelector('.param-check')
    const valueInput = existingRow.querySelector('.param-value')
    const descInput = existingRow.querySelector('.param-desc')

    if (check) check.checked = true
    if (valueInput) valueInput.value = headerValue
    if (desc && descInput && !descInput.value.trim()) {
        descInput.value = desc
    }
}

function onLoginTokenHeaderChange(headerKey) {
    const input = document.getElementById('loginTokenInput')
    if (!input) return
    input.placeholder =
        headerKey === 'Cookie'
            ? '请粘贴完整的 Cookie 字符串'
            : '请输入 Token（自动补 Bearer）'
}

function promptLoginToken() {
    const modal = document.getElementById('loginTokenModal')
    const input = document.getElementById('loginTokenInput')
    const headerSelect = document.getElementById('loginTokenHeaderSelect')
    const error = document.getElementById('loginTokenError')
    if (!modal || !input || !headerSelect || !error) return

    const storedLoginToken = getStoredLoginToken()
    const currentAuthorizationValue = findHeaderRow('Authorization')?.querySelector('.param-value')?.value || ''
    const currentCookieValue = findHeaderRow('Cookie')?.querySelector('.param-value')?.value || ''
    const selectedHeader =
        storedLoginToken.headerKey ||
        (currentCookieValue.trim() ? 'Cookie' : 'Authorization')
    const currentValue =
        selectedHeader === 'Cookie'
            ? currentCookieValue
            : currentAuthorizationValue.replace(/^Bearer\s+/i, '').trim()
    const defaultValue = currentValue || storedLoginToken.value

    headerSelect.value = selectedHeader
    onLoginTokenHeaderChange(selectedHeader)
    input.value = defaultValue
    error.textContent = ''
    modal.classList.add('visible')
    document.body.style.overflow = 'hidden'
    window.setTimeout(() => {
        input.focus()
        input.select()
    }, 0)
}

function closeLoginTokenModal() {
    const modal = document.getElementById('loginTokenModal')
    const error = document.getElementById('loginTokenError')
    if (modal) {
        modal.classList.remove('visible')
    }
    if (error) {
        error.textContent = ''
    }
    document.body.style.overflow = ''
}

function handleLoginTokenModalMaskClick(event) {
    if (event.target?.id === 'loginTokenModal') {
        closeLoginTokenModal()
    }
}

function confirmLoginToken() {
    const input = document.getElementById('loginTokenInput')
    const headerSelect = document.getElementById('loginTokenHeaderSelect')
    const error = document.getElementById('loginTokenError')
    if (!input || !headerSelect || !error) return

    const headerKey = headerSelect.value || 'Authorization'
    const rawValue = input.value.trim()
    if (!rawValue) {
        error.textContent = 'Header 值不能为空'
        input.focus()
        return
    }

    const headerValue = headerKey === 'Authorization' && !/^Bearer\s+/i.test(rawValue) ? `Bearer ${rawValue}` : rawValue
    const headerDesc = headerKey === 'Authorization' ? '认证令牌' : '登录 Cookie'
    upsertHeaderRow(headerKey, headerValue, headerDesc)
    localStorage.setItem(
        API_TESTER_LOGIN_TOKEN_STORAGE_KEY,
        JSON.stringify({
            headerKey,
            value: rawValue,
        })
    )

    const authTokenInput = document.getElementById('authToken')
    if (authTokenInput && headerKey === 'Authorization') {
        authTokenInput.value = headerValue
    }

    closeLoginTokenModal()
}

function getStoredLoginToken() {
    const raw = localStorage.getItem(API_TESTER_LOGIN_TOKEN_STORAGE_KEY)
    if (!raw) {
        return { headerKey: 'Authorization', value: '' }
    }

    try {
        const parsed = JSON.parse(raw)
        if (parsed && typeof parsed === 'object') {
            return {
                headerKey: parsed.headerKey || 'Authorization',
                value: parsed.value || '',
            }
        }
    } catch (e) {
        return { headerKey: 'Authorization', value: raw }
    }

    return { headerKey: 'Authorization', value: '' }
}

function bindLoginTokenModalEvents() {
    const input = document.getElementById('loginTokenInput')
    const headerSelect = document.getElementById('loginTokenHeaderSelect')
    if (!input) return

    if (headerSelect) {
        headerSelect.addEventListener('change', () => onLoginTokenHeaderChange(headerSelect.value))
    }

    input.addEventListener('input', () => {
        const error = document.getElementById('loginTokenError')
        if (error) {
            error.textContent = ''
        }
    })

    input.addEventListener('keydown', event => {
        if (event.key === 'Enter') {
            event.preventDefault()
            confirmLoginToken()
            return
        }
        if (event.key === 'Escape') {
            event.preventDefault()
            closeLoginTokenModal()
        }
    })

    document.addEventListener('keydown', event => {
        if (event.key !== 'Escape') return
        const modal = document.getElementById('loginTokenModal')
        if (modal?.classList.contains('visible')) {
            closeLoginTokenModal()
        }
    })
}

function switchTab(name, el) {
    currentTab = name
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'))
    el.classList.add('active')
    ;['params', 'headers', 'body', 'auth', 'requestSchema', 'responseSchema'].forEach(t => {
        document.getElementById('tab-' + t).style.display = t === name ? 'block' : 'none'
    })
}

function copyCurrentTab() {
    let text = ''
    if (currentTab === 'params') {
        const params = getParams()
        text = Object.keys(params).length ? JSON.stringify(params, null, 2) : '(无参数)'
    } else if (currentTab === 'headers') {
        const rows = document.querySelectorAll('#headersBody tr')
        const headers = {}
        rows.forEach(r => {
            const cb = r.querySelector('.param-check')
            const key = r.querySelector('.param-key')
            const val = r.querySelector('.param-value')
            if (cb && cb.checked && key && key.value.trim()) {
                headers[key.value.trim()] = val ? val.value : ''
            }
        })
        text = Object.keys(headers).length ? JSON.stringify(headers, null, 2) : '(无 Headers)'
    } else if (currentTab === 'body') {
        text = document.getElementById('bodyTextarea').value.trim() || '(无 Body)'
    } else if (currentTab === 'auth') {
        const token = document.getElementById('authToken').value
        const tenantId = document.getElementById('tenantId').value
        text = JSON.stringify({ Authorization: token, 'tenant-id': tenantId }, null, 2)
    } else if (currentTab === 'responseSchema') {
        const el = document.getElementById('responseSchemaContent')
        text = el ? el.innerText.trim() || '(无 Schema 信息)' : '(无 Schema 信息)'
    } else if (currentTab === 'requestSchema') {
        const el = document.getElementById('bodySchemaContent')
        text = el ? el.innerText.trim() || '(无 Schema 信息)' : '(无 Schema 信息)'
    }
    navigator.clipboard.writeText(text).then(() => {
        const btn = document.querySelector('.tabs button')
        const orig = btn.textContent
        btn.textContent = '已复制 ✓'
        btn.style.color = '#a6e3a1'
        btn.style.borderColor = '#a6e3a1'
        setTimeout(() => {
            btn.textContent = orig
            btn.style.color = '#cdd6f4'
            btn.style.borderColor = '#45475a'
        }, 1500)
    })
}

function copyApiInfo() {
    const name = currentApi ? currentApi.name : '未选择接口'
    const method = document.getElementById('methodSelect').value
    const url = document.getElementById('urlInput').value
    const params = getParams()
    const schemaInfo = getCurrentApiSchemaInfo()
    const responseSchemaInfo = getCurrentResponseSchemaInfo()
    const pre = document.querySelector('#responseBody pre')
    let responseData = ''
    if (pre) {
        try {
            responseData = JSON.parse(pre.innerText)
        } catch {
            responseData = pre.innerText
        }
    }

    const info = {
        接口名称: name,
        方法: method,
        URL: url,
        ...(Object.keys(params).length ? { Params: params } : {}),
        ...(schemaInfo ? { RequestSchema: { schemaRef: schemaInfo.schemaRef, schema: expandSchemaForCopy(schemaInfo.schema) } } : {}),
        ...(responseSchemaInfo ? { ResponseSchema: { schemaRef: responseSchemaInfo.schemaRef, schema: expandSchemaForCopy(responseSchemaInfo.schema) } } : {}),
        ...(responseData !== '' ? { 响应数据: responseData } : { 响应数据: '(尚未发送请求)' }),
    }

    const text = JSON.stringify(info, null, 2)
    navigator.clipboard.writeText(text).then(() => {
        const btn = document.querySelector('.request-panel button')
        const orig = btn.textContent
        btn.textContent = '已复制 ✓'
        btn.style.color = '#a6e3a1'
        btn.style.borderColor = '#a6e3a1'
        setTimeout(() => {
            btn.textContent = orig
            btn.style.color = '#cdd6f4'
            btn.style.borderColor = '#45475a'
        }, 1500)
    })
}

function setBodyType(type, el) {
    currentBodyType = type
    document.querySelectorAll('.body-type-btn').forEach(b => b.classList.remove('active'))
    el.classList.add('active')
}

function updateAuthHeader() {
    const token = document.getElementById('authToken').value
    const tenantId = document.getElementById('tenantId').value
    const rows = document.querySelectorAll('#headersBody tr')
    rows.forEach(r => {
        const key = r.querySelector('.param-key')
        const val = r.querySelector('.param-value')
        if (!key || !val) return
        if (key.value === 'Authorization') val.value = token
        if (key.value === 'tenant-id') val.value = tenantId
    })
}

function onEnvChange() {
    const env = document.getElementById('envSelect').value
    if (env !== 'custom') {
        baseUrl = ENV_URLS[env]
        document.getElementById('baseUrlInput').value = baseUrl
        if (currentApi) document.getElementById('urlInput').value = baseUrl + currentApi.path
    }
}

function updateBaseUrl(val) {
    baseUrl = val
    if (currentApi) document.getElementById('urlInput').value = baseUrl + currentApi.path
    document.getElementById('envSelect').value = 'custom'
}

function onMockToggle() {
    useMock = document.getElementById('mockToggle').checked
    document.getElementById('mockBadge').style.display = useMock ? 'inline' : 'none'
    document.getElementById('mockIndicator').classList.toggle('visible', useMock)
}

async function sendRequest() {
    if (!currentApi) {
        alert('请先选择一个接口')
        return
    }
    const btn = document.getElementById('sendBtn')
    btn.disabled = true
    btn.textContent = '发送中...'
    const start = Date.now()

    try {
        if (useMock) {
            await new Promise(r => setTimeout(r, 120 + Math.random() * 80))
            const mockData = currentApi.mock
            showResponse(200, mockData, Date.now() - start, true)
        } else {
            const method = document.getElementById('methodSelect').value
            const url = buildUrl()
            const headers = getHeaders()
            const opts = { method, headers }

            if (['POST', 'PUT'].includes(method)) {
                if (currentApi?.body === 'multipart') {
                    opts.body = buildMultipartBody()
                    delete headers['Content-Type']
                } else {
                    const bodyText = document.getElementById('bodyTextarea').value.trim()
                    if (bodyText && currentBodyType === 'json') {
                        opts.body = bodyText
                        if (!headers['Content-Type']) headers['Content-Type'] = 'application/json'
                    }
                }
            }

            // Browsers forbid setting the Cookie header directly via fetch.
            // When a manual Cookie is present, route through the local proxy
            // and pass the cookie via the custom X-Proxy-Cookie header.
            let requestUrl = url
            const cookieHeaderKey = Object.keys(headers).find(k => k.toLowerCase() === 'cookie')
            if (cookieHeaderKey) {
                headers['X-Proxy-Cookie'] = headers[cookieHeaderKey]
                delete headers[cookieHeaderKey]
                requestUrl = `${window.location.origin}/proxy?target=${encodeURIComponent(url)}`
                opts.credentials = 'omit'
            }

            const resp = await fetch(requestUrl, opts)
            let data
            const ct = resp.headers.get('content-type') || ''
            if (ct.includes('application/json')) {
                data = await resp.json()
            } else {
                data = await resp.text()
            }
            showResponse(resp.status, data, Date.now() - start, false)
        }
    } catch (e) {
        showError(e.message, Date.now() - start)
    } finally {
        btn.disabled = false
        btn.textContent = '发送'
    }
}

function buildUrl() {
    let url = document.getElementById('urlInput').value
    const queryParams = []

    getEnabledParamRows().forEach(({ key, value, in: paramIn }) => {
        if (paramIn === 'path') {
            url = url.replace(`{${key}}`, encodeURIComponent(value ?? ''))
            return
        }
        if (paramIn === 'query' && value !== undefined && value !== null && value !== '') {
            queryParams.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
        }
    })

    if (!queryParams.length) {
        return url
    }

    return url + (url.includes('?') ? '&' : '?') + queryParams.join('&')
}

function showResponse(status, data, ms, isMock) {
    const badge = document.getElementById('statusBadge')
    badge.textContent = isMock ? 'MOCK 200' : status
    badge.className = 'status-badge ' + (status >= 200 && status < 300 ? 'status-2xx' : status >= 400 && status < 500 ? 'status-4xx' : 'status-5xx')
    document.getElementById('responseTime').textContent = ms + ' ms'

    const json = typeof data === 'string' ? data : JSON.stringify(data, null, 2)
    document.getElementById('responseSize').textContent = (new Blob([json]).size / 1024).toFixed(1) + ' KB'
    document.getElementById('responseBody').innerHTML = `<pre>${syntaxHighlight(json)}</pre>`
}

function showError(msg, ms) {
    const badge = document.getElementById('statusBadge')
    badge.textContent = 'ERR'
    badge.className = 'status-badge status-5xx'
    document.getElementById('responseTime').textContent = ms + ' ms'
    document.getElementById('responseBody').innerHTML = `<pre style="color:#f38ba8">${escHtml(msg)}</pre>`
}

function clearResponse() {
    document.getElementById('statusBadge').textContent = '—'
    document.getElementById('statusBadge').className = 'status-badge status-0'
    document.getElementById('responseTime').textContent = ''
    document.getElementById('responseSize').textContent = ''
    document.getElementById(
        'responseBody'
    ).innerHTML = `<div class="empty-state"><svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 8v4m0 4h.01"/></svg><p>发送请求后，响应将显示在这里</p></div>`
}

function copyResponse() {
    const pre = document.querySelector('#responseBody pre')
    if (pre) navigator.clipboard.writeText(pre.innerText).then(() => alert('已复制'))
}

function syntaxHighlight(json) {
    return escHtml(json).replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+-]?\d+)?)/g, match => {
        if (/^"/.test(match)) {
            if (/:$/.test(match)) return `<span class="json-key">${match}</span>`
            return `<span class="json-string">${match}</span>`
        }
        if (/true|false/.test(match)) return `<span class="json-bool">${match}</span>`
        if (/null/.test(match)) return `<span class="json-null">${match}</span>`
        return `<span class="json-number">${match}</span>`
    })
}

function escHtml(s) {
    if (s === undefined || s === null) return ''
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

function initSidebarResizer() {
    const sidebar = document.getElementById('sidebar')
    const sidebarResizer = document.getElementById('sidebarResizer')
    let resizingSidebar = false
    let sidebarStartX = 0
    let sidebarStartW = 0

    if (sidebar && sidebarResizer) {
        sidebarResizer.addEventListener('mousedown', e => {
            resizingSidebar = true
            sidebarStartX = e.clientX
            sidebarStartW = sidebar.offsetWidth
            document.body.style.userSelect = 'none'
            document.body.style.cursor = 'ew-resize'
        })

        document.addEventListener('mousemove', e => {
            if (!resizingSidebar) return
            const delta = e.clientX - sidebarStartX
            const nextWidth = Math.max(160, Math.min(520, sidebarStartW + delta))
            sidebar.style.width = nextWidth + 'px'
        })

        document.addEventListener('mouseup', () => {
            if (!resizingSidebar) return
            resizingSidebar = false
            document.body.style.userSelect = ''
            document.body.style.cursor = ''
        })
    }
}
function initResponsePanelResizer() {
    const resizer = document.getElementById('resizer')
    const panel = document.getElementById('responsePanel')
    const container = panel ? panel.parentElement : null
    let dragging = false,
        startY = 0,
        startH = 0
    resizer.addEventListener('mousedown', e => {
        dragging = true
        startY = e.clientY
        startH = panel.offsetHeight
        document.body.style.userSelect = 'none'
    })
    document.addEventListener('mousemove', e => {
        if (!dragging) return
        const delta = startY - e.clientY
        const parentHeight = container ? container.clientHeight : window.innerHeight
        const nextHeight = Math.max(120, Math.min(parentHeight - 120, startH + delta))
        panel.style.height = nextHeight + 'px'
    })
    document.addEventListener('mouseup', () => {
        dragging = false
        document.body.style.userSelect = ''
    })
}

Object.assign(window, {
    addParamRow,
    clearResponse,
    closeLoginTokenModal,
    confirmLoginToken,
    copyApiInfo,
    copyCurrentTab,
    copyResponse,
    filterApis,
    handleLoginTokenModalMaskClick,
    onEnvChange,
    onMockToggle,
    promptLoginToken,
    saveCurrentApiParams,
    selectApi,
    sendRequest,
    saveBaseUrl,
    setBodyType,
    switchTab,
    toggleGroup,
    updateAuthHeader,
    updateBaseUrl,
    updateFileParamValue,
})

initSidebarResizer()
initResponsePanelResizer()
init()
