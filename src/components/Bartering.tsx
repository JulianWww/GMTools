//import { ppid } from 'process';
import * as React from 'react';
import {
  Container,
  Input,
  Header,
  Grid,
  InputOnChangeData,
} from 'semantic-ui-react';
import {ResponsiveContainer} from "./Header";

interface Props {
}

class Role {
  constructor() {
    this.roll = 0;
    this.mod = 0;
  }
  roll: number;
  mod: number;

  constrainRoll() {
    if (this.roll > 20) {this.roll = 20}
    if (this.roll < 0) {this.roll = 1}
  }
  getMod() {
    if (this.roll === 20) {
      return 2*(this.roll + this.mod)
    }
    //if (person.roll == 1) {
    //  return -229
    //}
    return this.roll + this.mod
  }
}

class Price {
  constructor() {
    this.cp = 0;
    this.sp = 0;
    this.ep = 0;
    this.gp = 0;
    this.pp = 0;
  }
  cp: number;
  sp: number;
  ep: number;
  gp: number;
  pp: number;

  getPrice () {
    return this.cp + 10*this.sp + 50*this.ep + 100*this.gp + 1000*this.pp;
  };
  setPrice (val: number) {
    let rest = val % 1000
    this.pp = (val - rest) / 1000;
    val = rest

    rest = val % 100
    this.gp = (val - rest) / 100;
    val = rest

    rest = val % 50
    this.ep = (val - rest) / 50;
    val = rest

    rest = val % 10
    this.sp = (val - rest) / 10;
    this.cp = rest
  }
}

interface State {
  givenPrice: Price;
  calculatedPrice: Price;
  sellRole: Role
  buyRole: Role
}

export default class Bartering extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      givenPrice: new Price(),
      calculatedPrice: new Price(),
      sellRole: new Role(),
      buyRole: new Role()
    };
  }

  update = () => {
    console.log(this.getTotalMod())
    this.state.calculatedPrice.setPrice(
      Math.ceil(this.state.givenPrice.getPrice() * this.getTotalMod())
    )
    this.setState({calculatedPrice: this.state.calculatedPrice})
  }

  update_cp = (event: React.ChangeEvent<HTMLInputElement>, data: InputOnChangeData) => {
    this.state.givenPrice.cp = Number(data.value);
    this.update()
  }
  update_sp = (event: React.ChangeEvent<HTMLInputElement>, data: InputOnChangeData) => {
    this.state.givenPrice.sp = Number(data.value);
    this.update()
  }
  update_ep = (event: React.ChangeEvent<HTMLInputElement>, data: InputOnChangeData) => {
    this.state.givenPrice.ep = Number(data.value);
    this.update()
  }
  update_gp = (event: React.ChangeEvent<HTMLInputElement>, data: InputOnChangeData) => {
    this.state.givenPrice.gp = Number(data.value);
    this.update()
  }
  update_pp = (event: React.ChangeEvent<HTMLInputElement>, data: InputOnChangeData) => {
    this.state.givenPrice.pp = Number(data.value);
    this.update()
  }

  update_sell_roll = (event: React.ChangeEvent<HTMLInputElement>, data: InputOnChangeData) => {
    this.state.sellRole.roll = Number(data.value)
    this.state.sellRole.constrainRoll()
    this.update()
    this.setState({sellRole: this.state.sellRole})
  }
  update_sell_mod = (event: React.ChangeEvent<HTMLInputElement>, data: InputOnChangeData) => {
    this.state.sellRole.mod = Number(data.value);
    this.update()
    this.setState({sellRole: this.state.sellRole})
  }
  update_buy_roll = (event: React.ChangeEvent<HTMLInputElement>, data: InputOnChangeData) => {
    this.state.buyRole.roll = Number(data.value)
    this.state.buyRole.constrainRoll()
    this.update()
    this.setState({buyRole: this.state.buyRole})
  }
  update_buy_mod = (event: React.ChangeEvent<HTMLInputElement>, data: InputOnChangeData) => {
    this.state.buyRole.mod = Number(data.value);
    this.update()
    this.setState({buyRole: this.state.buyRole})
  }

  getTotalMod() {
    return 1+(this.state.sellRole.getMod() - this.state.buyRole.getMod())/100;
  }

  render() {
    return (
      <ResponsiveContainer>
        <Container text style={{ padding: '1em 0em' }}>
          <Header>Calculate Bartering Price</Header>
          <Grid>
            <Grid.Row>
              <Grid.Column width={8}>
                <Input
                  fluid
                  label="Seller roll"
                  type="number"
                  onChange={this.update_sell_roll}
                  value={this.state.sellRole.roll !== 0 ? this.state.sellRole.roll : undefined}
                />
              </Grid.Column>
              <Grid.Column width={8}>
                <Input
                  fluid
                  label="Seller Mod"
                  type="number"
                  onChange={this.update_sell_mod}
                  value={this.state.sellRole.mod}
                />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column width={8}>
                <Input
                  fluid
                  label="Buyer roll"
                  type="number"
                  onChange={this.update_buy_roll}
                  value={this.state.buyRole.roll !== 0 ? this.state.buyRole.roll : undefined}
                />
              </Grid.Column>
              <Grid.Column width={8}>
                <Input
                  fluid
                  label="Buyer Mod"
                  type="number"
                  onChange={this.update_buy_mod}
                  value={this.state.buyRole.mod}
                />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column width={8}>
                <h2>Listed Price</h2>
              </Grid.Column>
              <Grid.Column width={8}>
                <h2>To Pay</h2>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column class="fifthwidth" width={8}>
                <Input
                  fluid
                  label="CP"
                  type="number"
                  onChange={this.update_cp}
                />
              </Grid.Column>
              <Grid.Column class="fifthwidth" width={8}>
                <Input
                  fluid
                  type="number"
                  value={this.state.calculatedPrice.cp}
                />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column class="fifthwidth" width={8}>
                <Input
                  fluid
                  label="SP"
                  type="number"
                  onChange={this.update_sp}
                />
              </Grid.Column>
              <Grid.Column class="fifthwidth" width={8}>
                <Input
                  fluid
                  type="number"
                  value={this.state.calculatedPrice.sp}
                />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column class="fifthwidth" width={8}>
                <Input
                  fluid
                  label="EP"
                  type="number"
                  onChange={this.update_ep}
                />
              </Grid.Column>
              <Grid.Column class="fifthwidth" width={8}>
                <Input
                  fluid
                  type="number"
                  value={this.state.calculatedPrice.ep}
                />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column class="fifthwidth" width={8}>
                <Input
                  fluid
                  label="GP"
                  type="number"
                  onChange={this.update_gp}
                />
              </Grid.Column>
              <Grid.Column class="fifthwidth" width={8}>
                <Input
                  fluid
                  type="number"
                  value={this.state.calculatedPrice.gp}
                />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column class="fifthwidth" width={8}>
                <Input
                  fluid
                  label="PP"
                  type="number"
                  onChange={this.update_pp}
                />
              </Grid.Column>
              <Grid.Column class="fifthwidth" width={8}>
                <Input
                  fluid
                  type="number"
                  value={this.state.calculatedPrice.pp}
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </ResponsiveContainer>
    );
  }
}