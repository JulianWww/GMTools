import * as React from 'react';
import {
  Container,
  Input,
  Header,
  Grid,
  Button,
  Segment,
  Divider,
  InputOnChangeData,
} from 'semantic-ui-react';
import {ResponsiveContainer} from "./Header";

interface Props {
}

interface PersonData {
  name: string;
  initiative: number;
}

interface State {
  newInitativeString: string;
  indexModifier: number;
  add: PersonData;
  elements: Array<PersonData>;
}

export default class InitativeQueue extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    const defaultValue : PersonData = {
      name: "", 
      initiative: 1
    };

    this.state = {
      newInitativeString: "",
      add: defaultValue,
      indexModifier: 0,
      elements: [],
    };
  }

  updateIndexModifier = () => {
    let {indexModifier, elements} = this.state;
    this.setState({indexModifier: (indexModifier + 1) % elements.length})
  }

  renderElement(data: PersonData) {
    return <Segment>
      <Grid>
        <Grid.Row>
          <Grid.Column width={14}>
            <Header>{data.name}</Header>
          </Grid.Column>
          <Grid.Column className="rightAlign" width={2}>
            {data.initiative}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
  }

  renderQueue() {
    return <Segment>
      <Button
        fluid
        primary
        onClick={this.updateIndexModifier}
      >
        next
      </Button>
      {this.state.elements.map((currElement, index) => {
        let idx = (index + this.state.indexModifier) % this.state.elements.length
        return this.renderElement(this.state.elements[idx])
      })}
    </Segment>
  }

  addElement = () => {
    var {elements, add} = this.state
    let _add: PersonData = {...add}
    for (let index = 0; index < elements.length; index++) {
      if (elements[index].initiative < add.initiative) {
        elements.splice(index, 0, _add)
        return
      }
    }
    elements[elements.length] = _add
  }

  render() {
    return (
      <ResponsiveContainer>
        <Container text style={{ padding: '1em 0em' }}>
          <Header>Add Person</Header>
          <Grid>
            <Grid.Row>
              <Grid.Column width={7}>
                <Input
                  fluid
                  label="name"
                  onChange={(event: React.ChangeEvent<HTMLInputElement>, data: InputOnChangeData) => {
                    this.state.add.name = data.value;
                  }}
                />
              </Grid.Column>
              <Grid.Column width={7}>
                <Input
                  fluid
                  label="initiative"
                  onChange={(event: React.ChangeEvent<HTMLInputElement>, data: InputOnChangeData) => {
                    const value: number = Number(data.value);
                    if (value || data.value === "") {
                      this.state.add.initiative = value;
                      this.setState({newInitativeString: data.value,})
                    }
                  }}
                  value={this.state.newInitativeString}
                />
              </Grid.Column>
              <Grid.Column width={2}>
                <Button
                  fluid
                  primary
                  icon="plus"
                  onClick={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>, data: any) => {
                    this.addElement()
                    this.forceUpdate()
                  }}
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <Divider/>
          {this.renderQueue()}
        </Container>
      </ResponsiveContainer>
    );
  }
}