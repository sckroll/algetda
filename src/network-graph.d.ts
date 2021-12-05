export interface NewNode {
  id: number
  name: string
  _color?: string
  _cssClass?: string
  _labelClass?: string
  svgSym?: SVGElement
  _size?: number
  _width?: number
  _height?: number
  fx?: number
  fy?: number
  pinned?: boolean
}

export interface NewLink {
  id?: string
  name?: string
  index?: number
  sid: number
  tid: number
  _color?: string
}

export interface NodeObject {
  id: number
  name: string
  index: number
  pinned: boolean
  x: number
  y: number
  fx: number
  fy: number
  vx: number
  vy: number
}

export interface LinkObject {
  id: string
  index: number
  sid: number
  tid: number
  source: NodeObject
  target: NodeObject
}
