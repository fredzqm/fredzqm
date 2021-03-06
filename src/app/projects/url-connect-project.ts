import {Project} from "../project";

export const urlConnectProejct: Project = {
  name: 'Url Connect',
  information: `This is a chrome extension chat room app built in React. The main idea is to talk to people who are visiting the same website. Based on the url in your browser, you will be in a different chat room. We use firebase to keep track of users at each url and messages history. Whenever all users left the room, the room is removed to save storage. We also support private room with a token and video chat via WebRTC.`,
  overview: null,
  image: 'assets/projects/url_connect.png',
  repos: 'url_connect',
  technologies: ["Chrome Extension", "React", "Webpack", "Typescript", "Yarn"],
  detailComponent: null,
};
