/* @flow */
/* eslint react/no-unused-prop-types: 0 */

import React, { Component, createElement } from 'react'
import { Match } from 'react-router'
import type { MatchCardProps, CardState } from './StackTypeDefinitions'

type Props = MatchCardProps & CardState

type MatchProps = {
  pattern: string,
  pathname: string,
  location: { pathname: string },
  isExact: boolean,
  pararms: Object,
}

type RendererProps = MatchProps & CardState

type State = {
  matchProps: ?MatchProps,
  pathname: ?string,
}

class MatchCard extends Component<void, Props, State> {

  props: Props

  state: State = {
    pathname: null,
    matchProps: null,
  }

  static displayName = 'MatchCard'

  renderMatchView = (matchProps: MatchProps): ?React$Element<RendererProps> => {
    // Set match props
    if (!this.state.pathname) this.state.pathname = matchProps.pathname
    if (
      this.state.pathname === matchProps.pathname ||
      !this.state.matchProps
    ) {
      this.state.matchProps = matchProps
    }
    // Render view with props
    const { render, component } = this.props
    const props = {
      ...this.props,
      ...this.state.matchProps,
    }
    if (render) return render(props)
    else if (Component) return createElement(component, props)
    return null
  }

  shouldComponentUpdate() {
    return false
  }

  render(): React$Element<any> {
    return (
      <Match {...this.props}>
        {this.renderMatchView}
      </Match>
    )
  }

}

export default MatchCard