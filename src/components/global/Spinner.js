import React, { Component } from 'react'
import styled from 'styled-components'

class Spinner extends Component {
    constructor(props) {
        super(props)
    }

    layoutSize = () => {
        return {
            height: this.props.spinnerHeight,
            width: this.props.spinnerWidth,
            border: `${this.props.border}px solid #f3f3f3`,
            borderTop: `${this.props.border}px solid #3892e9`
        }
    }

    render() {
        return (
            <Wrapper>
                <div className="spinner-layout">
                    <div className="loader" style={this.layoutSize()}></div>
                </div>
            </Wrapper>
        )
    }
}

export default Spinner

const Wrapper = styled.div`
.spinner-layout{
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;

  .loader {
    border-radius: 50%;
    animation: spin 2s linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
}
`