import * as React from 'react';
import * as ReactDOM from "react-dom";

export class Terminal extends React.Component<any, any> {
  term;

  constructor(props) {
    super(props);
    this.state = {
      history: [],
      command: ''
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.term.focus();
  }

  componentDidUpdate() {
    let container = document.getElementById("terminal");
    let el = ReactDOM.findDOMNode(this);
    container.scrollTop = el.scrollHeight;
  }

  handleChange(e) {
    this.setState({
      'command': e.target.value
    });
  }

  handleInput(e) {
    if (e.key === "Enter") {
      this.setState((prevState) => {
        prevState.history.push("$ " + prevState.command);
        prevState.command = "";
        return prevState;
      });
    }
  }

  handleClick() {
    this.term.focus();
  }

  render() {
    let output = this.state.history.map(function (op, i) {
      return <p key={i}>{op}</p>
    });
    return (
      <div className='input-area' onClick={this.handleClick}>
        {output}
        <p>
          <span className="prompt">{this.state.prompt}</span>
          <input type="text"
                 value={this.state.command}
                 onChange={this.handleChange}
                 onKeyPress={this.handleInput}
                 ref={(el) => this.term = el}/>
        </p>
      </div>
    )
  }
}
