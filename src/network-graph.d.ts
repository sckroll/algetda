export interface NodeObject {
  id: number
  name: number | string
  _color?: string
  _cssClass?: string
  _labelClass?: string
  svgSym?: SVGElement
  _size?: number
  _width?: number
  _height?: number
}

export interface LinkObject {
  id?: number
  name?: number | string
  sid: number
  tid: number
  _color?: string
}
