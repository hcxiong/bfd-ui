import './index.less'
import React, { Component } from 'react'
import { render } from 'react-dom'

class Tooltip extends Component {
  
  constructor() {
    super()
    this.state = {
      show: false
    }
  }

  componentDidMount() {
    this.setPosition()
  }

  componentDidUpdate() {
    this.setPosition()
  }

  setPosition() {
    if (this.state.show) {
      const tooltip = this.refs.tooltip

      const tooltipRect = tooltip.getBoundingClientRect()
      const triggerRect = this.state.trigger.getBoundingClientRect()

      tooltip.style.left = triggerRect.left - tooltipRect.width / 2 + triggerRect.width / 2 + 'px'
      tooltip.style.top = triggerRect.top - tooltipRect.height - 8 + document.body.scrollTop + 'px'
    }
  }

  render() {
    const { show, content } = this.state
    return show && <div ref="tooltip" className="bfd-tooltip">{content}</div>
  }
}

let instance

function tooltip(content, trigger) {

  if (!instance) {
    const container = document.createElement('div')
    document.body.appendChild(container)
    instance = render(<Tooltip />, container)
  }

  instance.setState({
    show: true,
    trigger,
    content
  })
}

tooltip.close = () => {
  instance && instance.state && instance.state.show && instance.setState({show: false})
}

export default tooltip