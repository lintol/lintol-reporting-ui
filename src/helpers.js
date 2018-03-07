// Module API

export function getTableErrorGroups(table) {
  const groups = {}
  for (const error of table.errors) {

    // Get group
    let group = groups[error.code]

    // Create group
    if (!group) {
      group = {
        code: error.code,
        rows: {},
        count: 0,
        headers: table.headers,
        messages: [],
      }
    }

    // Get row
    let location = error['item']['entity']['location']
    let row = group.rows[error[location.row]]

    // Create row
    if (!row) {
      let values = error.context[0].entity.definition
      if (!location.row) {
        values = table.headers
      }
      row = {
        values,
        badcols: new Set(),
      }
    }

    // Ensure missing value
    if (error.code === 'missing-value') {
      row.values[location.column - 1] = ''
    }

    // Add row badcols
    if (location.column) {
      row.badcols.add(location.column)
    } else if (row.values) {
      row.badcols = new Set(row.values.map((value, index) => index + 1))
    }

    // Save group
    group.count += 1
    group.messages.push(error.message)
    group.rows[location.row] = row
    groups[error.code] = group

  }
  return groups
}


export function removeBaseUrl(text) {
  return text.replace(/https:\/\/raw\.githubusercontent\.com\/\S*?\/\S*?\/\S*?\//g, '')
}


export function splitFilePath(path) {
  const parts = path.split('/')
  return {
    name: parts.pop(),
    base: parts.join('/'),
    sep: parts.length ? '/' : '',
  }
}


export function merge(...args) {
  return Object.assign({}, ...args)
}
