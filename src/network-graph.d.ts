export interface NodeObject {
  id: number
  name?: string
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
  name?: string
  tid: number
  sid: number
  _color?: string
}
