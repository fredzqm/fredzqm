import {Component} from '@angular/core';
import {Project} from "../project";

@Component({
  selector: 'app-chess-project',
  templateUrl: './chess-project.component.html',
  styleUrls: ['./chess-project.component.css']
})
export class ChessProjectComponent {
}

export const chessProject: Project = {
  name: 'Chess',
  information: `This Chess app built in Java with an Angular web interface. It supports all rules in Chess, including regular moves and captures plus those special moves like En Passant, Castling, and Pawn Promotion. It also keeps track of the records and allows undoing. I built this App with MVC in mind, so recently I was able to add a new web view easily. We built an Angular App, which talks to Firebase for each user action and board status. The Java server runs in Google App engine listens and handles these events. If you love Chess, invite your friend and let play!`,
  overview: `
<p>
  I love playing Chess. After I learned Java in my first quarter at Rose, I started my first personal project -- Chess because I wanted to use my new Java skills to do something fun. This Chess app supports all rules in Chess, including regular moves and captures plus those special moves like En Passant, Castling, and Pawn Promotion. It also keeps track of the records and allows undoing. I built this App with MVC in mind, so recently I was able to add a new web view easily. We built an Angular App, which talks to Firebase for each user action and board status. The Java server runs in Google App engine listens and handles these events. 
<p/>
<p>
 If you also love Chess, invite your friend and let play!
</p>
`,
  image: 'img/moveGUI3.png',
  repos: 'Chess',
  technologies: ["Java", "Firebase", "Angular"],
  detailComponent: ChessProjectComponent,
};
