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
    const location = error.item.entity.location
    let rownumber = location.row
    let columnnumber = location.column
    if (!rownumber) {
      rownumber = null
    }
    if (!columnnumber) {
      columnnumber = null
    }

    let row = group.rows[error[rownumber]]

    // Create row
    if (!row) {
      let values = table.headers
      if (error.context && error.context.length > 0) {
        values = error.context[0].entity.definition
      }
      row = {
        values,
        badcols: new Set(),
      }
    }

    // Ensure missing value
    if (error.code === 'missing-value') {
      row.values[columnnumber - 1] = ''
    }

    // Add row badcols
    if (columnnumber) {
      row.badcols.add(columnnumber)
    } else if (row.values) {
      row.badcols = new Set(row.values.map((value, index) => index + 1))
    }

    // Save group
    group.count += 1
    group.messages.push(error.message)
    group.rows[rownumber] = row
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
