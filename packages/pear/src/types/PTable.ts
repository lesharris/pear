export type PTableCellValue = string | number | boolean | null | undefined

export type PTableRow = Record<string, unknown>

export type PTableColumn = {
  key: string
  label: string
  rowHeader?: boolean
  align?: 'left' | 'center' | 'right'
  theme?: 'light' | 'dark'
}

