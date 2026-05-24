export type DocsTocItem = {
  id: string
  label: string
}

export type DocsMeta = {
  title: string
  description: string
  tocItems: DocsTocItem[]
}
