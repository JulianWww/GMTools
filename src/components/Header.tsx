import * as React from 'react';
import {
  Container,
  Header,
  Icon,
  Menu,
  Responsive,
  Segment,
  Sidebar,
  Grid,
  List,
  Visibility,
} from 'semantic-ui-react';
import {urlBase} from "../const";

interface HomepageHeadingProps {
  mobile: boolean;
}

const REPO_LINK = 'https://github.com/JulianWww/GMTools';

/* eslint-disable react/no-multi-comp */
/* Heads up! HomepageHeading uses inline styling, however it's not the best practice. Use CSS or styled components for
 * such things.
 */
const HomepageHeading = ({ mobile }: HomepageHeadingProps) => (
  <Container text>
    <Header
      as="h1"
      content="GM Tools"
      inverted
      style={{
        fontSize: mobile ? '2em' : '4em',
        fontWeight: 'normal',
        marginBottom: 0,
        marginTop: mobile ? '1.5em' : '3em',
      }}
    />
    <Header
      as="h2"
      content="Help tools for RPG GMs"
      inverted
      style={{
        fontSize: mobile ? '1.5em' : '1.7em',
        fontWeight: 'normal',
        marginTop: mobile ? '0.5em' : '1.5em',
      }}
    />
  </Container>
);

interface DesktopContainerProps {
  children?: React.ReactNode;
}

interface DesktopContainerState {
  fixed: boolean;
}

/* Heads up!
 * Neither Semantic UI nor Semantic UI React offer a responsive navbar, however, it can be implemented easily.
 * It can be more complicated, but you can create really flexible markup.
 */

class DesktopContainer extends React.Component<DesktopContainerProps, DesktopContainerState> {
  constructor(props: DesktopContainerProps) {
    super(props);

    this.state = {
      fixed: false
    };
  }

  hideFixedMenu = () => {
    this.setState({ fixed: false });
  }

  showFixedMenu = () => {
    this.setState({ fixed: true });
  }

  render() {
    const { children } = this.props;
    const { fixed } = this.state;
    console.log(window.location.pathname)

    // Semantic-UI-React/src/addons/Responsive/Responsive.js
    return (
      // @ts-ignore
      <Responsive {...{ minWidth: Responsive.onlyMobile.maxWidth + 1 }}>
        <Visibility once={false} onBottomPassed={this.showFixedMenu} onBottomPassedReverse={this.hideFixedMenu}>
          <Segment inverted textAlign="center" style={{ minHeight: 700, padding: '1em 0em' }} vertical>
            <Menu
              fixed={fixed ? 'top' : undefined}
              inverted={!fixed}
              pointing={!fixed}
              secondary={!fixed}
              size="large"
            >
              <Container>
                <Menu.Item as="a" active={window.location.pathname==urlBase+"/"} href={urlBase+"/"}>
                  Initiative
                </Menu.Item>
                <Menu.Item as="a" active={window.location.pathname==urlBase+"/Bartering"} href={urlBase+"/Bartering"}>
                  Bartering
                </Menu.Item>
              </Container>
            </Menu>
            <HomepageHeading mobile={false} />
          </Segment>
        </Visibility>

        {children}
      </Responsive>
    );
  }
}

interface MobileContainerProps {
  children?: React.ReactNode;
}

interface MobileContainerState {
  sidebarOpened: boolean;
}

class MobileContainer extends React.Component<MobileContainerProps, MobileContainerState> {
  constructor(props: MobileContainerProps) {
    super(props);

    this.state = {
      sidebarOpened: false
    };
  }

  handlePusherClick = () => {
    const { sidebarOpened } = this.state;

    if (sidebarOpened) {
      this.setState({ sidebarOpened: false });
    }
  }

  handleToggle = () => {
    this.setState({ sidebarOpened: !this.state.sidebarOpened });
  }

  render() {
    const { children } = this.props;
    const { sidebarOpened } = this.state;

    return (
      <Responsive {...Responsive.onlyMobile}>
        <Sidebar.Pushable>
          <Sidebar as={Menu} animation="uncover" inverted vertical visible={sidebarOpened}>
            <Menu.Item as="a" active>Initiative</Menu.Item>
          </Sidebar>

          <Sidebar.Pusher dimmed={sidebarOpened} onClick={this.handlePusherClick} style={{ minHeight: '100vh' }}>
            <Segment inverted textAlign="center" style={{ minHeight: 350, padding: '1em 0em' }} vertical>
              <Container>
                <Menu inverted pointing secondary size="large">
                  <Menu.Item onClick={this.handleToggle}>
                    <Icon name="sidebar" />
                  </Menu.Item>
                </Menu>
              </Container>
              <HomepageHeading mobile={true} />
            </Segment>

            {children}
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </Responsive>
    );
  }
}

interface ResponsiveContainerProps {
  children?: React.ReactNode;
}

const Tail = ({children}: ResponsiveContainerProps) => (
  <Segment inverted vertical style={{ padding: '5em 0em' }}>
    <Container className={"fullwidth"}>
      <Grid divided inverted stackable className={"fullwidth"}>
        <Grid.Row className={"fullwidth"}>
          <Grid.Column className={"thirdwidth"}>
            <Header inverted as="h4" content="About" />
            <List link inverted>
              <List.Item as="a" href={REPO_LINK}>Source</List.Item>
              <List.Item
                as="a"
                href={REPO_LINK + "/blob/master/LICENSE"}
              >
                License
              </List.Item>
              {/* <List.Item as="a">Contact Us</List.Item> TODO */}
            </List>
          </Grid.Column>
          <Grid.Column className={"thirdwidth"}>
            <Header inverted as="h4" content="Services" />
            <List link inverted>
              <List.Item as="a" href={REPO_LINK + "/discussions"}>Forum</List.Item>
              <List.Item as="a" href={REPO_LINK + "/issues"}>Support</List.Item>
              {/* <List.Item as="a">FAQ</List.Item> TODO*/}
            </List>
          </Grid.Column>
          <Grid.Column className={"thirdwidth"}>
            <Header as="h4" inverted>Info</Header>
            <p>Made by <a href="https://github.com/JulianWww">Julian Wandhoven</a></p>
            <p>Copyleft © 2022</p>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  </Segment>
);

export const ResponsiveContainer = ({ children }: ResponsiveContainerProps) => (
  <div>
    <React.Fragment>
      <DesktopContainer>{children}</DesktopContainer>
      <MobileContainer>{children}</MobileContainer>
    </React.Fragment>
    <Tail/>
  </div>
);