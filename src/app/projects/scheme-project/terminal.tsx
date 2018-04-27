import * as React from 'react';
import * as ReactDOM from 'react-dom';
import TextareaAutosize from 'react-autosize-textarea';

interface TerminalProp {
  interpreter: (input: string) => Promise<string>;
  prompt: string;
}

interface TerminalState {
  history: string[];
  command: string;
}

export class Terminal extends React.Component<TerminalProp, TerminalState> {
  term;

  constructor(props) {
    super(props);
    this.state = {
      history: ['Shift + Enter to execute the scheme code'],
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
    const container = document.getElementById('terminal');
    const el = ReactDOM.findDOMNode(this);
    container.scrollTop = el.scrollHeight;
  }

  handleChange(e) {
    this.setState({
      command: e.target.value.trimLeft()
    });
  }

  handleInput(e) {
    if (e.key === 'Enter' && e.shiftKey) {
      const command = this.state.command;
      this.setState((prevState, props) => {
        return {
          history: prevState.history.concat([props.prompt + prevState.command]),
          command: ''
        };
      }, () => {
        this.props.interpreter(command)
          .then((output) => {
            this.setState((prevState, props) => {
              return {
                history: prevState.history.concat([output.toString()]),
                command: ''
              };
            });
          });
      });
    }
  }

  handleClick(e) {
    this.term.focus();
  }

  render() {
    const output = this.state.history.map(function (op, i) {
      return <p key={i}>{op}</p>;
    });
    return (
      <div className='terminal' onClick={this.handleClick}>
        {output}
        <p>
          <span className='prompt'>{this.props.prompt} </span>
          <TextareaAutosize
            value={this.state.command}
            onChange={this.handleChange}
            onKeyPress={this.handleInput}
            innerRef={(el) => this.term = el}
          />
        </p>
      </div>
    );
  }
}
